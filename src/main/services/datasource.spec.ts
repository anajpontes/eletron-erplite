import { describe, it, expect, vi, beforeEach } from 'vitest';

// 1. Dizemos ao Vitest para substituir o módulo real do electron pelo nosso mock
vi.mock('electron', async () => {
  return {
    app: {
      get isPackaged() {
        return false;
      },
    },
  };
});

describe('AppDataSource Configuration', () => {
  beforeEach(() => {
    vi.resetModules(); // Limpa o cache dos imports para cada teste
  });

  it('deve ter synchronize: true quando rodar em DEV (!app.isPackaged)', async () => {
    const { app } = await import('electron');
    vi.spyOn(app, 'isPackaged', 'get').mockReturnValue(false);

    const { AppDataSource } = await import('./datasource');
    expect(AppDataSource.options.synchronize).toBe(true);
  });

  it('deve ter synchronize: false quando rodar em PRODUÇÃO (app.isPackaged)', async () => {
    const { app } = await import('electron');
    vi.spyOn(app, 'isPackaged', 'get').mockReturnValue(true);

    const { AppDataSource } = await import('./datasource');
    expect(AppDataSource.options.synchronize).toBe(false);
  });
});

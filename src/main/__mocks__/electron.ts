import { vi } from 'vitest';

export const app = {
  isPackaged: false,
  getPath: vi.fn().mockReturnValue('/mock/path/appData'),
  whenReady: vi.fn().mockResolvedValue(undefined),
};

export const BrowserWindow = vi.fn().mockImplementation(() => ({
  loadURL: vi.fn(),
  loadFile: vi.fn(),
  webContents: {
    send: vi.fn(),
  },
}));

export const ipcMain = {
  on: vi.fn(),
  handle: vi.fn(),
};

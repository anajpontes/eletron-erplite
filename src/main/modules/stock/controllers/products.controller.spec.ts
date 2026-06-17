import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { ProductsController } from './products.controller';
import { ProductsService } from '../services/products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeAll(() => {
    const mockService = {
      listProducts: vi.fn().mockResolvedValue([{ id: 1, name: 'Teste' }]),
    } as unknown as ProductsService;

    controller = new ProductsController(mockService);
  });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('deve retornar a lista de produtos', async () => {
    const result = await controller.index();
    expect(result).toEqual([{ id: 1, name: 'Teste' }]);
  });
});

import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Product } from '../models/product.model';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeAll(() => {
    const mockRepository = {
      find: vi.fn().mockResolvedValue([{ id: 1, name: 'Teste' }]),
    } as unknown as Repository<Product>;

    service = new ProductsService(mockRepository);
  });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('deve retornar a lista de produtos', async () => {
    const result = await service.listProducts();
    expect(result).toEqual([{ id: 1, name: 'Teste' }]);
  });

});

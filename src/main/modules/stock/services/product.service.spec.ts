import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Product } from '../models/product.model';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockRepo = {
    find: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  } as unknown as  any;

  beforeAll(() => {
    service = new ProductsService(mockRepo);
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

   it('deve retornar a lista de produtos (caminho feliz)', async () => {
    const fakeProducts = ([{ id: '1', name: "Teste"}]);
    
    mockRepo.find.mockResolvedValue(fakeProducts);

    const result = await service.listProducts();

    expect(mockRepo.find).toHaveBeenCalledTimes(1);
    expect(result).toEqual(fakeProducts);
  });

});

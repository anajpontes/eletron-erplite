import { Repository } from 'typeorm';
import { Product } from '../models/product.model';

export class ProductsService {
  constructor(private productRepository: Repository<Product>) {}

  async listProducts() {
    return await this.productRepository.find();
  }

  async findProductById(id: string) {
     const product = await this.productRepository.findOne({
      where: { id },
     });
     if (!product) {
      throw new Error('Produto não encontrado');
     }
     return product;
  }

  async createProduct(data: Partial<Product>) {
    const product = this.productRepository.create(data);
    return  await this.productRepository.save(product);
  }

  async updateProduct(
    id: string,
    data: Partial<Product>
  ) {
    await this.findProductById(id);
    await this.productRepository.update(id, data);
    return await this.findProductById(id);
  }

  async deleteProduct(id: string) {
    await this.findProductById(id);
    await this.productRepository.delete(id);
    return {
      success:true,
    }
  }
}

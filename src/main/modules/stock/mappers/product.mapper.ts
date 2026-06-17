import { Product } from '../models/product.model';

export class ProductMapper {
  static fromSupabase(item: any) {
    const product = new Product();
    product.id = item.id;
    product.name = item.name;
    product.sku = item.sku;
    product.quantity = item.quantity;
    product.price = parseFloat(item.price);
    product.sellPrice = parseFloat(item.sell_price);
    product.createdAt = new Date(item.created_at);
    product.updatedAt = new Date(item.updated_at);
    return product;
  }

  static listFromSupabase(items: any[]) {
    return items.map((item) => this.fromSupabase(item));
  }
}

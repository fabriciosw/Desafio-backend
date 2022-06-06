import { getRepository } from 'typeorm';
import ProductEntity from '../database/entities/Product.Entity';
import { ProductInput } from '../models/product.model';

export async function createProduct(input: ProductInput) {
  const repository = getRepository(ProductEntity);
  const newProduct = repository.create(input);
  await repository.save(newProduct);
  return newProduct;
}

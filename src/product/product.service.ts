import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

type Res = { message: string };

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Res | Product[]> {
    const products = await this.productRepository.find();
    if (products.length === 0) {
      return {
        message: 'No products found',
      };
    }
    return products;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id: id } });
    if (!product) {
      return {
        message: `Product with id ${id} not found`,
      };
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOne({ where: { id: id } });
  }

  async remove(id: number) {
    this.productRepository.delete(id);
    return {
      message: `Product with id ${id} has been deleted`,
    };
  }
}

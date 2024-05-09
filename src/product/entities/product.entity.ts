import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 255,
    nullable: false,
    name: 'handle',
  })
  handle: string;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column('bigint', {
    nullable: false,
    name: 'sku',
  })
  sku: number;

  @Column('float', {
    nullable: false,
    name: 'grams',
  })
  grams: number;

  @Column('int', {
    nullable: false,
    name: 'stock',
  })
  stock: number;

  @Column('int', {
    nullable: false,
    name: 'price',
  })
  price: number;

  @Column('int', {
    nullable: false,
    name: 'compare_price',
  })
  comparePrice: number;

  @Column('bigint', {
    nullable: true,
    name: 'barcode',
  })
  barcode: number;
}

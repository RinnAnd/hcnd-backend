import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import { Product } from '../entities/product.entity';

@Injectable()
export class ExcelService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async readExcelAndSaveToDb(file: Express.Multer.File): Promise<void> {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
    }) as string[][];

    const headers = [
      'Handle',
      'Title',
      'Description',
      'SKU',
      'Grams',
      'Stock',
      'Price',
      'Compare',
      'Price',
      'Barcode',
    ];

    for (const row of jsonData) {
      if (!row || row.length < 8) {
        break;
      }
      if (
        row[0] === headers[0] ||
        row[1] === headers[1] ||
        row[2] === headers[2] ||
        row[3] === headers[3] ||
        row[4] === headers[4] ||
        row[5] === headers[5] ||
        row[6] === headers[6] ||
        row[7] === headers[7] ||
        row[8] === headers[8]
      ) {
        continue;
      }
      const entity = new Product();
      entity.handle = row[0];
      entity.title = row[1];
      entity.description = row[2];
      entity.sku = parseInt(row[3]);
      entity.grams = parseInt(row[4]);
      entity.stock = parseInt(row[5]);
      entity.price = parseInt(row[6]);
      entity.comparePrice = parseInt(row[7]);
      entity.barcode = isNaN(parseInt(row[8])) ? null : parseInt(row[8]);

      this.productRepository.save(entity);
    }
  }
}

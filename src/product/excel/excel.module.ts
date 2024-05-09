import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ExcelController],
  providers: [ExcelService],
})
export class ExcelModule {}

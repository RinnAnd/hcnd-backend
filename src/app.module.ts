import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/connection';
import { ExcelModule } from './product/excel/excel.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ProductModule, UserModule, DatabaseModule, ExcelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

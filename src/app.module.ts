import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { MongoModule } from './adapters/database/mongo.module';
import { ProductRepository } from './adapters/repositories/product.repository';
import { ProductController } from './adapters/web/controllers/product.controller';
import { Product } from './domain/entities/product.entity';
import { CreateProductHandler } from './domain/handlers/create.product.handler';
import { ListProductHandler } from './domain/handlers/list.product.handler';

@Module({
  imports: [MongoModule, MongooseModule.forFeature([
    {
      name: Product.name,
      schema: SchemaFactory.createForClass(Product)
    }
  ])],
  controllers: [ProductController],
  providers: [CreateProductHandler, ListProductHandler, ProductRepository],
})
export class AppModule { }

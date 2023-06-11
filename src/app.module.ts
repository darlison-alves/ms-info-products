import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { ConfigModule } from './adapters/configs/config.module';
import { OrdertRepository } from './adapters/repositories/order.repository';
import { ProductRepository } from './adapters/repositories/product.repository';
import { ProductController } from './adapters/web/controllers/product.controller';
import { Order } from './domain/entities/order.entity';
import { Product } from './domain/entities/product.entity';
import { CreateProductHandler } from './domain/handlers/create.product.handler';
import { ListProductHandler } from './domain/handlers/list.product.handler';

@Module({
  imports: [ConfigModule, MongooseModule.forFeature([
    {
      name: Product.name,
      schema: SchemaFactory.createForClass(Product)
    },
    {
      name: Order.name,
      schema: SchemaFactory.createForClass(Order)
    }
  ])],
  controllers: [ProductController],
  providers: [CreateProductHandler, ListProductHandler, ProductRepository, OrdertRepository],
})
export class AppModule { }

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "src/domain/entities/product.entity";

@Injectable()
export class ProductRepository {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

    async findAll(): Promise<Product[]> {
        return this.productModel.find()
    }

    save(product: Product): Promise<Product> {
        return this.productModel.create(product);
    }
}
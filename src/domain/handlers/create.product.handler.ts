import { Injectable } from "@nestjs/common";
import { ProductRepository } from "src/adapters/repositories/product.repository";
import { ICreateProductUseCase } from "src/ports/inbound/create.product.use.case";
import { ProductDTO } from "../dtos/product.dto";
import { Product } from "../entities/product.entity";

@Injectable()
export class CreateProductHandler implements ICreateProductUseCase {

    constructor(private productRepository: ProductRepository) {}

    handle(productDTO: ProductDTO): Promise<Product> {
        return this.productRepository.save(Product.of(productDTO))
    }

}
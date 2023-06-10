import { Injectable } from "@nestjs/common";
import { ProductRepository } from "src/adapters/repositories/product.repository";
import { IListProductUseCase } from "src/ports/inbound/list.product.use.case";
import { ProductDTO } from "../dtos/product.dto";
import { Product } from "../entities/product.entity";

@Injectable()
export class ListProductHandler implements IListProductUseCase {

    constructor(private productRepository: ProductRepository) { }

    handle(): Promise<Product[]> {
        return this.productRepository.findAll()
    }

}
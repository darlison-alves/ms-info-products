import { Injectable } from "@nestjs/common";
import { ProductRepository } from "src/adapters/repositories/product.repository";
import { IPurchaseProductUseCase } from "src/ports/inbound/purchase.product.use.case";
import { PurchaseProductDTO } from "../dtos/purchase.product.dto";
import { Product } from "../entities/product.entity";

@Injectable()
export class PurchaseProductHandler implements IPurchaseProductUseCase {
    constructor(private productRepository: ProductRepository) { }

    handle(payload: PurchaseProductDTO): Promise<Product> {
        throw new Error("Method not implemented.");
    }
}
import { PurchaseProductDTO } from "src/domain/dtos/purchase.product.dto";
import { Product } from "src/domain/entities/product.entity";

export interface IPurchaseProductUseCase {
    handle(payload: PurchaseProductDTO): Promise<Product>
}
import { PurchaseProductDTO } from "src/domain/dtos/purchase.product.dto";
import { Product } from "src/domain/entities/product.entity";

export interface ICancelProductUseCase {
    handle(payload: PurchaseProductDTO): Promise<Product>
}
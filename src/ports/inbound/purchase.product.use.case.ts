import { PurchaseProductDTO } from "src/domain/dtos/purchase.product.dto";
import { Order } from "src/domain/entities/order.entity";

export interface IPurchaseProductUseCase {
    handle(payload: PurchaseProductDTO): Promise<Order>
}
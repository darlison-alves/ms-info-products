import { Prop, Schema } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { PurchaseProductDTO } from "../dtos/purchase.product.dto";

@Schema()
export class Order {

    @Prop()
    productId: string;

    @Prop()
    status: string;

    @Prop()
    email: string;

    @Prop()
    serviceKey: string;

    public static of(payload: PurchaseProductDTO, status: string) {
        const order = new Order();
        order.productId = payload.productId;
        order.status = status;
        order.email = payload.buyerEmail;
        order.serviceKey = payload.serviceKey;
        return order;
    }
}
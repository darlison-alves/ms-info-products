import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Order {

    @Prop()
    productId: string;

    @Prop()
    status: string

    public static of(productId: string, status: string) {
        const order = new Order();
        order.productId = productId;
        order.status = status;
        return order;
    }
}
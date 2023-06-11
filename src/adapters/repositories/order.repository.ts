import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "src/domain/entities/order.entity";

@Injectable()
export class OrdertRepository {
    constructor(@InjectModel(Order.name) private ordertModel: Model<Order>) { }

    save(product: Order): Promise<Order> {
        return this.ordertModel.create(product);
    }
}
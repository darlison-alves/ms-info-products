import { Injectable } from "@nestjs/common";
import { EventBroker } from "src/adapters/broker/event.broker";
import { OrdertRepository } from "src/adapters/repositories/order.repository";
import { ProductRepository } from "src/adapters/repositories/product.repository";
import { IPurchaseProductUseCase } from "src/ports/inbound/purchase.product.use.case";
import { PurchaseProductDTO } from "../dtos/purchase.product.dto";
import { Order } from "../entities/order.entity";
import { CoursePurchasedEvent } from "../events/course.purchased.event";

@Injectable()
export class PurchaseProductHandler implements IPurchaseProductUseCase {
    constructor(
        private orderRepository: OrdertRepository,
        private productRepository: ProductRepository,
        private eventBroker: EventBroker
    ) { }

    async handle(payload: PurchaseProductDTO): Promise<Order> {
        try {

            const product = await this.productRepository.findById(payload.productId);

            const order = Order.of(payload, "PAID")

            await this.eventBroker.publish(new CoursePurchasedEvent(payload, product));

            await this.orderRepository.save(order);
            return order;
        } catch (error) {
            console.log('Error', error)
        }
    }
}
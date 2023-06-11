import { Injectable } from "@nestjs/common";
import { EventBroker } from "src/adapters/broker/event.broker";
import { ProductRepository } from "src/adapters/repositories/product.repository";
import { ICancelProductUseCase } from "src/ports/inbound/cancel.product.use.case";
import { PurchaseProductDTO } from "../dtos/purchase.product.dto";
import { Product } from "../entities/product.entity";
import { CourseCancelledEvent } from "../events/course.cancelled.event";

@Injectable()
export class CancelProductHandler implements ICancelProductUseCase {
    constructor(
        private productRepository: ProductRepository,
        private eventBroker: EventBroker
    ) { }

    async handle(payload: PurchaseProductDTO): Promise<Product> {
        try {

            const product = await this.productRepository.findById(payload.productId);

            await this.eventBroker.publish(new CourseCancelledEvent({
                productId: payload.productId,
                email: payload.buyerEmail,
                serviceKey: payload.serviceKey,
                productRole: product.code
            }));

            return product;
        } catch (error) {
            console.log('Error', error)
        }
    }
}
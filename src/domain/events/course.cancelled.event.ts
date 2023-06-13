import { EventApplication } from "./event.application";

export class CourseCancelledEvent extends EventApplication {
    
    public productId
    public email
    public serviceKey
    public productRole
    
    constructor(payload, product) {
        super(CourseCancelledEvent.name);
        this.productId = payload.productId;
        this.email = payload.buyerEmail;
        this.serviceKey = payload.serviceKey;
        this.productRole = product.code;
    }
}
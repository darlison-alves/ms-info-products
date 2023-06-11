import { EventApplication } from "./event.application";

export class CoursePurchasedEvent extends EventApplication {
    constructor(payload: any) {
        super(CoursePurchasedEvent.name, payload)
    }
}
import { EventApplication } from "./event.application";

export class CourseCancelledEvent extends EventApplication {
    constructor(payload: any) {
        super(CourseCancelledEvent.name, payload)
    }
}
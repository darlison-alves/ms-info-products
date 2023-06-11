import { Inject, Injectable } from "@nestjs/common";
import { ClientRMQ } from "@nestjs/microservices";
import { EventApplication } from "src/domain/events/event.application";
import { IEventDispatcher } from "src/ports/outbound/event.dispatcher.interface";

@Injectable()
export class EventBroker implements IEventDispatcher {

    constructor(
        @Inject('event-broker') private readonly cli: ClientRMQ) {}

    async publish(eventApplication: EventApplication): Promise<void> {
        await this.cli.send(eventApplication.name, eventApplication)
        return;
    }

}
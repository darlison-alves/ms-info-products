import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChannelWrapper, connect } from "amqp-connection-manager";
import { CourseCancelledEvent } from "src/domain/events/course.cancelled.event";
import { CoursePurchasedEvent } from "src/domain/events/course.purchased.event";

const { RABBIT_HOST, RABBIT_QUEUE, MONGO_URL } = process.env;

const connAmqpProvider: Provider = {
    provide: 'conn-amqp',
    async useFactory() {
        try {
            const conn = await connect([RABBIT_HOST], { connectionOptions: { rejectUnauthorized: true } });
            await conn.createChannel({
                json: true,
                async setup(channel: ChannelWrapper) {
                    await channel.assertExchange('eduq-cursos', 'direct');
                    await channel.assertQueue(RABBIT_QUEUE);

                    await channel.bindQueue(RABBIT_QUEUE, 'eduq-cursos', CoursePurchasedEvent.name);
                    await channel.bindQueue(RABBIT_QUEUE, 'eduq-cursos', CourseCancelledEvent.name);
                },
            });
            return conn
        } catch (error) {
            console.log('err amqp', error)
        }
    }
}

@Module({
    imports: [
        MongooseModule.forRoot(MONGO_URL, {})
    ],
    providers: [
        connAmqpProvider
    ],
    exports: [
        connAmqpProvider
    ]

})
export class ConfigModule { }
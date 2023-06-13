import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChannelWrapper, connect } from "amqp-connection-manager";
import { CourseCancelledEvent } from "src/domain/events/course.cancelled.event";
import { CoursePurchasedEvent } from "src/domain/events/course.purchased.event";

const connAmqpProvider: Provider = {
    provide: 'conn-amqp',
    async useFactory() {
        console.log('Provider conn-amqp')
        try {
            const conn = await connect(['amqp://rabbitmq:rabbitmq@localhost:5672'], { connectionOptions: { rejectUnauthorized: true } });
            await conn.createChannel({
                json: true,
                async setup(channel: ChannelWrapper) {
                    await channel.assertExchange('eduq-cursos', 'direct');
                    await channel.assertQueue('info-product-sales');

                    await channel.bindQueue('info-product-sales', 'eduq-cursos', CoursePurchasedEvent.name);
                    await channel.bindQueue('info-product-sales', 'eduq-cursos', CourseCancelledEvent.name);
                },
            });
            return conn
        } catch (error) {
            console.log('err amqp', error)
        }
    },
}

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/test', {})
    ],
    providers: [
        connAmqpProvider
    ],
    exports: [
        connAmqpProvider
    ]

})
export class ConfigModule { }
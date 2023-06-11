import { Module, Provider } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";
import { ChannelWrapper, connect } from "amqp-connection-manager";
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
        MongooseModule.forRoot('mongodb://localhost/test', {}),
        ClientsModule.register([
            {
                name: 'event-broker',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672']
                },
            },
        ])
    ],
    providers: [
        connAmqpProvider
    ],
    exports: [
        connAmqpProvider
    ]

})
export class ConfigModule { }
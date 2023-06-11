import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";

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
    ]

})
export class ConfigModule { }
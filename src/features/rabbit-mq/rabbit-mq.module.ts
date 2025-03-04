import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { QueueName } from 'src/common/constants';
import { RabbitMQService } from './rabbit-mq.service';
import { RabbitMQController } from './rabbit-mq.controller';

const providers = [
    {
        provide: 'RabbitMQService',
        useClass: RabbitMQService,
    },
    {
        provide: 'RABBITMQ_CLIENT',
        useFactory: () => {
            const host = process.env.RABBITMQ_HOST;
            const port = Number(process.env.RABBITMQ_PORT);
            const username = process.env.RABBITMQ_USERNAME;
            const password = process.env.RABBITMQ_PASSWORD;

            const url = `amqp://${username}:${password}@${host}:${port}`;

            return ClientProxyFactory.create({
                transport: Transport.RMQ,
                options: {
                    urls: [url],
                    queue: QueueName.TEST_QUEUE,
                    queueOptions: { durable: false },
                    // noAck: false, // Bật chế độ acknowledgment thủ công
                },
            });
        },
    },
];

@Module({
    imports: [],
    controllers: [RabbitMQController],
    providers,
    exports: providers,
})
export class RabbitMQModule {}

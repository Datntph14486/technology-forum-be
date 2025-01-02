import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TestQueueDto } from './dto/test-queue.dto';
import { QueueName } from 'src/common/constants';

@Injectable()
export class RabbitMQService {
    constructor(
        @Inject('RABBITMQ_CLIENT')
        private readonly rabbitmqClient: ClientProxy,
    ) {}

    async push(dto: TestQueueDto) {
        try {
             await this.rabbitmqClient
                .send(QueueName.TEST_QUEUE, JSON.stringify(dto))
                .toPromise();
        } catch (error) {
            console.log('🚀 ~ error push queue:', error);
        }
    }
}

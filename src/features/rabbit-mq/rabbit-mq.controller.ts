import { Body, Controller, Inject, Post } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { QueueName } from 'src/common/constants';
import { RabbitMQService } from './rabbit-mq.service';
import { TestQueueDto } from './dto/test-queue.dto';

@Controller('rabbit-mq')
export class RabbitMQController {
    constructor(
        @Inject('RabbitMQService')
        private readonly rabbitMQService: RabbitMQService,
    ) {}

    @Post()
    async sendMessage(@Body() data: TestQueueDto): Promise<void> {
        return this.rabbitMQService.push(data);
    }

    @MessagePattern(QueueName.TEST_QUEUE)
    async handleMessage(message: string) {
        console.log('message queue: ', message);
    }
}

import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
    Ctx,
    EventPattern,
    MessagePattern,
    Payload,
    RmqContext,
} from '@nestjs/microservices';
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
    async sendMessage(
        @Body() dto: TestQueueDto,
    ): Promise<{ data: TestQueueDto }> {
        return this.rabbitMQService.push(dto);
    }

    @MessagePattern(QueueName.TEST_QUEUE)
    async handleMessage(
        @Payload() message: string,
        @Ctx() context: RmqContext,
    ) {

        const channel = context.getChannelRef(); // Lấy kênh RabbitMQ
        const originalMessage = context.getMessage(); // Lấy message gốc từ hàng đợi

        async function handle(m: string) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('3');
                }, 100);
            });
        }
        await handle(message);

        channel.ack(originalMessage);
    }
}

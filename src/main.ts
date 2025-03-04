import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { SerializeInterceptor } from './interceptors/serialize.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import { QueueName } from './common/constants';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const appConfig = configService.get('app');

    app.useGlobalInterceptors(new SerializeInterceptor());

    const rabbitMQConfig = configService.get('rabbitMQ');

    const { host, user, password, port } = rabbitMQConfig;

    const url = `amqp://${user}:${password}@${host}:${port}`;

    console.log(url);
    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [url],
            queue: QueueName.TEST_QUEUE,
            queueOptions: { durable: false },
            // noAck: false, // Bật chế độ acknowledgment thủ công
        },
    });

    await app.startAllMicroservices();

    const config = new DocumentBuilder()
        .setTitle('technology-forum-api')
        .setDescription('APIs')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('API')
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    await app
        .listen(appConfig.port)
        .then(() =>
            console.log('Nest application successfully started port 4001'),
        );
}
bootstrap();

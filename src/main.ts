import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { SerializeInterceptor } from './interceptors/serialize.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const appConfig = configService.get('app');

    app.useGlobalInterceptors(new SerializeInterceptor());

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

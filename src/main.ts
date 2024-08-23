import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ResponseFormatInterceptor } from './helper/response-format.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const appConfig = configService.get('app');

    app.useGlobalInterceptors(new ResponseFormatInterceptor());

    await app
        .listen(appConfig.port)
        .then(() =>
            console.log('Nest application successfully started port 4001'),
        );
}
bootstrap();

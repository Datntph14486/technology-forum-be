import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { SerializeInterceptor } from './interceptors/serialize.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const appConfig = configService.get('app');

    app.useGlobalInterceptors(new SerializeInterceptor());

    await app
        .listen(appConfig.port)
        .then(() =>
            console.log('Nest application successfully started port 4001'),
        );
}
bootstrap();

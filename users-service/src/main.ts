import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'users',
      protoPath: join(__dirname, 'users', 'users.proto'),
      url: config.get('USERS_SERVICE_URL'),
    },
  });

  await app.startAllMicroservicesAsync();
}
bootstrap();

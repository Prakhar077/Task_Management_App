import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for your frontend origin
  app.enableCors({
    origin: 'http://localhost:5173',  // frontend URL
    credentials: true,                // if you use cookies or auth headers
  });

  await app.listen(3000);
}
bootstrap();

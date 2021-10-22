import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as compression from 'compression';
import { config } from './app/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(compression());
  app.setGlobalPrefix('api');

  const PORT = config.PORT || 8000;
  await app.listen(PORT);
  console.log(`[app started] : http://localhost:${PORT}`);
}
bootstrap();

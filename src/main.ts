import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import TransformInterceptor from './common/interceptor/transform';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const options = new DocumentBuilder()
    .setTitle('期刊')
    .setDescription('期刊的API文档')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT || 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

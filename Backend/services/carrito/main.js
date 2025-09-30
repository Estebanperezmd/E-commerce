require('reflect-metadata');
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./app.module');
const { SwaggerModule, DocumentBuilder } = require('@nestjs/swagger');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🚀 Configuración Swagger
  const config = new DocumentBuilder()
    .setTitle('Carrito Service')
    .setDescription('API para gestión de carritos')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
  console.log(' Carrito Service is running on: http://localhost:3001');
  console.log(' Swagger docs available at: http://localhost:3001/api');
}
bootstrap();

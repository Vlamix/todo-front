import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  const config = new DocumentBuilder()
    .setTitle('Todo docs')
    .setDescription('The todo description')
    .setVersion('1.0')
    .addTag('todo')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('documentation', app, document)

  app.useGlobalPipes(new ValidationPipe({}))
  await app.listen(5000)
}

try {
  bootstrap()
} catch (err) {
  console.log(err)
}

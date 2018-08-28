import { NestFactory } from '@nestjs/core'
import { TracingInterceptor } from './tracing.interceptor'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalInterceptors(new TracingInterceptor())

  await app.listen(3000)
}

bootstrap()

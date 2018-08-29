import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { CacheInterceptor } from './cache.interceptor'

@Controller()
export class AppController {
  @Get()
  @UseInterceptors(CacheInterceptor)
  public getHelloWorld() {
    process.stdout.write('Controller > ')

    return 'Hello, World!'
  }
}

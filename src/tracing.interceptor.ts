import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class TracingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
    process.stdout.write('\nTracing (incoming) > ')

    return call$.pipe(
      tap(() => {
        process.stdout.write('Tracing (outgoing) > ')
      })
    )
  }
}


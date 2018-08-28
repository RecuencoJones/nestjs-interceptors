import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private static cache = {}

  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
    const url = '/'
    const value = CacheInterceptor.cache[url]

    process.stdout.write('Cache (incoming) > ')

    if (value) {
      process.stdout.write('Hit > ')

      return of(value)   
    }

    return call$.pipe(
      tap((val) => {
        CacheInterceptor.cache[url] = val

        process.stdout.write('Cache (outgoing) > ')
      })
    )
  }
}


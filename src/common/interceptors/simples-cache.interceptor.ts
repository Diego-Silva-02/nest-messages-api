import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, of, tap } from "rxjs";

export class SimpleCacheInterceptor implements NestInterceptor {
    private readonly cache = new Map()

    async intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Promise<Observable<any>> {
        console.log(`SimpleCacheInterceptor is running`);

        const request = context.switchToHttp().getRequest();
        const url = request.url;

        if(this.cache.has(url)) {
            console.log('Is in the cache', url);
            // will return the cache saved in system
            return of(this.cache.get(url)); // of transforms in a Observable
        }

        await new Promise(resolve => setTimeout(resolve, 3000));

        return next.handle().pipe(
            tap(data => { // data from request
                this.cache.set(url, data); //key, value
                console.log('Stored in cache', url);
            })
        );
    }
    
}
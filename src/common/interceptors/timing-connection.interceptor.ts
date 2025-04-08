import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const startTime = Date.now();
        // await new Promise(resolve => setTimeout(resolve, 3000));
        
        return next.handle().pipe(
            tap((data) => { // data its the responde data
                const finalTime = Date.now();
                const elapsedTime = finalTime - startTime;
                console.log(data);
                console.log(`TimingConnectionInterceptor: Have used ${elapsedTime}ms to execute`);
            })
        );
    }
    
}
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ChangeDataInterceptor implements NestInterceptor {
    async intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Promise<Observable<any>> {
        console.log(`ChangeDataInterceptor is running`);

        return next.handle().pipe(
            map(data => { // data from request
                if(Array.isArray(data)) { // change the method return if is an array
                    return {
                        data,
                        count: data.length
                    }
                }

                return data;
            })
        );
    }
    
}
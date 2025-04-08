import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, throwError } from "rxjs";

export class ErrorHandlingInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
        console.log(`ErrorHandlingInterceptor is running`);

        return next.handle().pipe(
            catchError((error) => {
                console.log(error.name);
                console.log(error.message);
                return throwError(() => {
                    if(error.name === 'NotFoundException') {
                        // return new BadRequestException(error.message); // changing error to BadRequestException
                    }
                });
            })
        );
    }
    
}
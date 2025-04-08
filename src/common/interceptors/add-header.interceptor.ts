import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { MessagesService } from "src/messages/messages.service";

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
    constructor(private readonly messagesService: MessagesService) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Promise<Observable<any>> {
        const response = context.switchToHttp().getResponse();

        response.setHeader('X-Custom-Header', 'Header value example'); // set a X-Custom-Header in header response

        return next.handle();
    }
    
}
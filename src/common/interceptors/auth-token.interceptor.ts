import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { MessagesService } from "src/messages/messages.service";

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
    constructor(private readonly messagesService: MessagesService) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token || token != '123456') {
            throw new UnauthorizedException('User not logged in!');
        }

        console.log(`Token: ${token}`);

        return next.handle();
    }
    
}
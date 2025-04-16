import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

// Guard give permission to access one route (or not)
@Injectable()
export class IsAdminGuard implements CanActivate {
    // always that the return it's true, can access this route
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const role = request['user']?.role; //get param from request
        
        return role === 'admin';
    }
}
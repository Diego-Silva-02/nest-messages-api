import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class AnotherMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
            console.log('Hello, I am AnotherMiddleware');
    
            res.setHeader('M-HEADER', 'From Middleware');

            console.log('Bye from AnotherMiddleware');
    
            next(); // go to next step
        }
}
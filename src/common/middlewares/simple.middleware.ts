import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class SimpleMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Hello, I am SimpleMiddleware');
        const authorization = req.headers?.authorization;

        if (authorization) {
            req['user'] = {
                name: 'Dieego',
                surname: 'Siilva'
            }
        }

        res.setHeader('M-HEADER', 'From Middleware');

        // End of call
        // return res.status(404).send({
        //     message: 'Not found'
        // });
        
        next(); // go to next step (next middleware)

        console.log('Bye from SimpleMiddleware');

        res.on('finish', () => {
            console.log('SimpleMiddleware: End'); // will be log this when the request finish
        });
    }
    
}
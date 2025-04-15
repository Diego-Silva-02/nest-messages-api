import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

// Exception filters can be used to modify an error
// In this example, and HttpException (and childs from HttpException)
// In this case, this ExceptionFilter will add others params to the response
@Catch(HttpException)
export class MyExceptionFilter<T extends HttpException> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();

        const statusCode = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        const error = 
            typeof response === 'string' 
              ? {
                    message: exceptionResponse
                } 
              : (exceptionResponse as object);

        response.status(statusCode).json({
            ...error,
            date: new Date().toISOString(),
            path: request.url
        })
    }
}
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      code: status,
      method: request.method,
      path: request.url,
      message: exception.message,
      timestamp: new Date(),
    };

    Logger.error(`${request.method} ${request.url}`, JSON.stringify(errorResponse), 'ExceptionFilter');

    response.status(status).json(errorResponse);
  }
}

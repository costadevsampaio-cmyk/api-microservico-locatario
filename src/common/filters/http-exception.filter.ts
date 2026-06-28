import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const status = exception.getStatus();
    const response = exception.getResponse();

    return {
      success: false,
      error: {
        message:
          typeof response === 'string'
            ? response
            : (response as any).message,
        statusCode: status,
      },
      timestamp: new Date().toISOString(),
      path: request.url,
    };
  }
}
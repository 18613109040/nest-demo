import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const msg =
      exceptionResponse?.message?.length > 0
        ? exceptionResponse?.message[0]
        : exception.message;
    const logFormat = `-----------------------------------------------------------------------
        Request original url: ${request.originalUrl}
        Method: ${request.method}
        IP: ${request.ip}
        Status code: ${status}
        Response: ${exception.toString() + `（${msg}）`}
        -----------------------------------------------------------------------
        `;

    Logger.log(logFormat);
    response.status(status).json({
      code: status,
      msg: `${status >= 500 ? 'Service Error' : msg}`,
    });
  }
}

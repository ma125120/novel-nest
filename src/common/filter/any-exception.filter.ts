import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  // HttpException,
} from '@nestjs/common';


@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response
      .status(200)
      .json({
        code: 500,
        timestamp: new Date().toISOString(),
        path: request.url,
        msg: exception.message || exception
      });
  }
}

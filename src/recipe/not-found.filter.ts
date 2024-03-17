import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost,
} from "@nestjs/common";
import { Response, Request } from "express";

@Catch(NotFoundException)
export class RecipeNotFoundFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: "Recipe not found",
      path: request.url,
    });
  }
}

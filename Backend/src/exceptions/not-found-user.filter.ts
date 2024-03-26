import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(NotFoundException)
export class RecipeNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: "User not found",
    };

    response.status(status).json(errorResponse);
  }
}

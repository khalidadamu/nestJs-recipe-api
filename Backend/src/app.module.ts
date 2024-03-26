import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { RecipeModule } from "./recipe/recipe.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import * as cors from "cors";
import { LoggerMiddleware } from "./middlewares/logger.middlewares";
import { RecipeNotFoundExceptionFilter } from "./exceptions/not-found-user.filter";
import { APP_FILTER } from "@nestjs/core";

@Module({
  imports: [
    RecipeModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: RecipeNotFoundExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors(), LoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}

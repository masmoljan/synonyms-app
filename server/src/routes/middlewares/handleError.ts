import type { Middleware } from "koa";
import { ApiError, ApiErrorType } from "../../helpers";

export enum ApplicationEvent {
  KoaMiddlewareError = "koaMiddlewareError",
}

export const handleErrorMiddleware: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof ApiError) {
      const apiError = new ApiError(error.type, error.error);
      ctx.status = apiError.httpStatusCode;
      ctx.body = { error: apiError.body };
      ctx.app.emit(ApplicationEvent.KoaMiddlewareError, apiError.error);
    } else {
      const apiError = new ApiError(
        ApiErrorType.InternalServerError,
        error as Error
      );

      ctx.status = apiError.httpStatusCode;
      ctx.body = { error: apiError.body };
      ctx.app.emit(ApplicationEvent.KoaMiddlewareError, apiError.error, ctx);
    }
  }
};

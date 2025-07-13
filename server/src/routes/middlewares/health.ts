import type { Middleware } from "koa";
import { HTTP_STATUS_CODES } from "../../constants/consts";

export const healthMiddleware: Middleware = async (
	ctx,
): Promise<void> => {
	ctx.status = HTTP_STATUS_CODES.OK;
	ctx.body = "Synonyms API service is available";
};

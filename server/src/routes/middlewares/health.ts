import { Middleware } from 'koa';
import { HTTP_STATUS_CODES } from '../../helpers/consts';

export const healthMiddleware: Middleware = async (ctx, next): Promise<void> => {
  ctx.status = HTTP_STATUS_CODES.OK;
  ctx.body = 'Synonyms API service is available';
};


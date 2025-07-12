import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import router from './routes';
import { ApplicationEvent } from './routes/middlewares/handleError';
import { errorLogger } from './helpers/';

export const koaMiddlewareErrorHandler = (
  error: Error,
  ctx: Koa.Context
): void => {
  errorLogger('Koa Middleware Error', { error, ctx });
};

const app = new Koa();

app.use(cors());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.on(ApplicationEvent.KoaMiddlewareError, koaMiddlewareErrorHandler);

export default app;

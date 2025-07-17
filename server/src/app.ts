import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import ratelimit from "koa-ratelimit";
import router from "./routes";
import { ApplicationEvent } from "./routes/middlewares/handleError";
import { logKoaError, logRequest } from "./services/logger";

export const koaMiddlewareErrorHandler = (
	error: Error,
	ctx: Koa.Context,
): void => {
	logKoaError(error, ctx);
};

const app = new Koa();

const db = new Map();

app.use(ratelimit({
	driver: 'memory',
	db,
	duration: 10 * 60 * 1000,
	id: (ctx) => ctx.ip,
	max: 1000
}))

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const responseTime = Date.now() - start;
	logRequest(
		ctx.method,
		ctx.url,
		ctx.status,
		responseTime,
		ctx.headers["user-agent"],
		ctx.request.body,
		ctx.request.query,
	);
});

app.use(cors());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.on(ApplicationEvent.KoaMiddlewareError, koaMiddlewareErrorHandler);

export default app;

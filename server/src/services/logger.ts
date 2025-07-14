import type Koa from "koa";
import { logger } from "../helpers";

interface LogContext {
	[key: string]: any;
}

export const debug = (message: string, context?: LogContext): void => {
	logger.debug(context || {}, message);
};

export const info = (message: string, context?: LogContext): void => {
	logger.info(context || {}, message);
};

export const warn = (message: string, context?: LogContext): void => {
	logger.warn(context || {}, message);
};

export const error = (message: string, context?: LogContext): void => {
	logger.error(context || {}, message);
};

export const logRequest = (
	method: string,
	url: string,
	status: number,
	responseTime: number,
	userAgent?: string,
	body?: Koa.Context["request"]["body"],
	query?: Koa.Context["request"]["query"],
): void => {
	const logData = {
		method,
		url,
		status,
		responseTime: `${responseTime}ms`,
		userAgent,
		body,
		query,
	};

	const message = `${method} ${url} - ${status}`;

	if (status >= 200 && status < 400) {
		info(message, logData);
	} else if (status >= 400 && status < 500) {
		warn(message, logData);
	} else if (status >= 500) {
		error(message, logData);
	}
};

export const logError = (err: Error, context?: LogContext): void => {
	error(err.message, {
		...context,
		error: {
			name: err.name,
			message: err.message,
			stack: err.stack,
		},
	});
};

export const logKoaError = (err: Error, ctx: Koa.Context): void => {
	error("Koa Middleware Error", {
		error: {
			message: err.message,
			stack: err.stack,
			name: err.name,
		},
		request: {
			method: ctx.method,
			url: ctx.url,
			headers: ctx.headers,
			body: ctx.request.body,
		},
		response: {
			status: ctx.status,
		},
	});
};

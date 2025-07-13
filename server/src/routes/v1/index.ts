import * as path from "node:path";
import Router from "koa-router";
import * as openapiValidator from "openapi-validator-middleware";
import {
	getSynonymsMiddleware,
	handleErrorMiddleware,
	healthMiddleware,
	postSynonymsMiddleware,
} from "../middlewares";

const apiSpec = path.join(__dirname, "spec.yml");
openapiValidator.init(apiSpec, { framework: "koa" });

const v1Router = new Router({ prefix: "/api/v1/synonyms" });

v1Router.use(handleErrorMiddleware);

v1Router.get("/health", openapiValidator.validate, healthMiddleware);
v1Router.get("/search", openapiValidator.validate, getSynonymsMiddleware);
v1Router.post("/", openapiValidator.validate, postSynonymsMiddleware);

export default v1Router;

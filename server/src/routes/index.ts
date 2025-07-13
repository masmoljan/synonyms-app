import Router from "koa-router";
import v1Router from "./v1";

const router = new Router();

router.use(v1Router.routes()).use(v1Router.allowedMethods());

export default router;

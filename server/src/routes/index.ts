import Router from 'koa-router';
import * as path from 'path';
import * as openapiValidator from 'openapi-validator-middleware';
import {
  healthMiddleware,
  getSynonymsMiddleware,
  postSynonymsMiddleware,
  handleErrorMiddleware,
} from './middlewares';

const apiSpec = path.join(__dirname, 'spec.yml');
openapiValidator.init(apiSpec, { framework: 'koa' });

const router = new Router({ prefix: '/synonyms' });

router.use(handleErrorMiddleware);

router.get('/health', openapiValidator.validate, healthMiddleware);
router.get('/search', openapiValidator.validate, getSynonymsMiddleware);
router.post('/', openapiValidator.validate, postSynonymsMiddleware);

export default router;

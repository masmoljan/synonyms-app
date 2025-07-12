import { Middleware } from 'koa';
import { WordCtx } from '../../helpers/types';
import { HTTP_STATUS_CODES } from '../../helpers/consts';
import { SynonymsService } from '../../services/synonyms';

const synonymsService = SynonymsService.getInstance();

export const getSynonymsMiddleware: Middleware<WordCtx> = async (
  ctx,
  next
): Promise<void> => {
  const { word, skip, limit } = ctx.request.query;

  const result = synonymsService.searchWords(
    word as string,
    skip ? Number(skip) : 0,
    limit ? Number(limit) : 5
  );
  
  ctx.status = HTTP_STATUS_CODES.OK;
  ctx.body = {
    ...result,
  };
};

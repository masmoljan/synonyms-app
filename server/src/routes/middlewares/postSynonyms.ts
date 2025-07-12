import { Middleware } from 'koa';
import { SynonymsService } from '../../services/synonyms';
import { WordSynonymsPairCtx } from '../../helpers/types';
import { HTTP_STATUS_CODES } from '../../helpers/consts';

const synonymsService = SynonymsService.getInstance();

export const postSynonymsMiddleware: Middleware<WordSynonymsPairCtx> = async (
  ctx,
  next
): Promise<void> => {
  const { word, synonyms } = ctx.request.body as WordSynonymsPairCtx;
  
  const result = synonymsService.addWordSynonyms(word, synonyms);

  ctx.status = HTTP_STATUS_CODES.CREATED;
  ctx.body = {
    ...result,
  };
};

import type { Middleware } from "koa";
import {
  DEFAULT_QUERY_OPTIONS,
  HTTP_STATUS_CODES,
} from "../../constants/consts";
import type { WordCtx } from "../../interfaces/types";
import { SynonymsService } from "../../services/synonyms";

const synonymsService = SynonymsService.getInstance();

export const getSynonymsMiddleware: Middleware<WordCtx> = async (
  ctx
): Promise<void> => {
  const { word, skip, limit } = ctx.request.query;

  const result = synonymsService.searchWords(
    word as string,
    skip ? Number(skip) : DEFAULT_QUERY_OPTIONS.SKIP,
    limit ? Number(limit) : DEFAULT_QUERY_OPTIONS.LIMIT
  );

  ctx.status = HTTP_STATUS_CODES.OK;
  ctx.body = {
    ...result,
  };
};

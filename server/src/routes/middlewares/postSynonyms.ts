import type { Middleware } from "koa";
import { HTTP_STATUS_CODES } from "../../constants/consts";
import type { WordSynonymsPairCtx } from "../../interfaces/types";
import { SynonymsService } from "../../services/synonyms";

const synonymsService = SynonymsService.getInstance();

export const postSynonymsMiddleware: Middleware<WordSynonymsPairCtx> = async (
	ctx
): Promise<void> => {
	const { word, synonyms } = ctx.request.body as WordSynonymsPairCtx;

	const result = synonymsService.addWordSynonyms(word, synonyms);

	ctx.status = HTTP_STATUS_CODES.CREATED;
	ctx.body = {
		...result,
	};
};

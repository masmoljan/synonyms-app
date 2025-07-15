export interface WordSynonym {
	word: string;
	synonyms: string[];
}

export interface SynonymsQueryParams {
	word: string;
	skip: number;
	limit: number;
}

export interface SynonymsResponse {
	query: string;
	results: WordSynonym[];
	count: number;
}

export interface Synonym {
  word: string;
  synonyms: string[];
}

export interface SynonymsQueryParams {
  word: string;
  skip: number;
  limit: number;
}

export interface SynonymsResponse {
  results: Synonym[];
  count: number;
}

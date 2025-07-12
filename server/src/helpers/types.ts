export interface WordCtx {
  word: string;
  skip?: number;
  limit?: number;
}

export interface WordSynonymsPairCtx {
  word: string;
  synonyms: string[];
}

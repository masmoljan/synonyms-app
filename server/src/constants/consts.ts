export const API_ERRORS = {
  WORD_SYNONYMS_PAIR_EQUAL: 'A word cannot be a synonym of itself',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  SYNONYMS_CANNOT_BE_EMPTY: 'Synonyms cannot be empty',
  WORD_CANNOT_BE_EMPTY: 'Word cannot be empty',
  DUPLICATE_SYNONYMS: 'Duplicate synonyms are not allowed'
};

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const DEFAULT_QUERY_OPTIONS = {
  SKIP: 0,
  LIMIT: 10
}
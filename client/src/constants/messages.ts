export const ERROR_MESSAGES = {
  GENERIC_ERROR: "An error occurred while fetching data",
  ADD_SYNONYM_ERROR: "An error occurred while adding the synonym",
  WORD_REQUIRED: "Word is required",
  WORD_TOO_LONG: "Word must be less than 50 characters",
  WORD_INVALID_CHARS:
    "Word can only contain letters, numbers and spaces with basic punctuation",
  WORD_MUST_START_WITH_LETTER: "Word must start with a letter",
  WORD_EMPTY: "Word cannot be empty",
  SYNONYMS_REQUIRED: "At least one synonym is required",
  SYNONYMS_TOO_MANY: "Maximum 20 synonyms allowed",
  SYNONYMS_MUST_BE_UNIQUE: "Synonyms must be unique",
  SYNONYMS_CANNOT_INCLUDE_WORD: "Synonyms cannot include the original word",
  SYNONYMS_ALREADY_EXIST: "These synonyms already exist:",
};

export const SUCCESS_MESSAGES = {
  NOTIFICATION_TITLE: "Success",
};

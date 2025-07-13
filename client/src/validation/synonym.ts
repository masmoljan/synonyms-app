import { ERROR_MESSAGES } from '@/constants/messages';
import { VALIDATION_LIMITS, VALIDATION_PATTERNS } from '@/constants/validation';
import { z } from 'zod';

export const addSynonymSchema = z
  .object({
    word: z
      .string()
      .min(VALIDATION_LIMITS.WORD_MIN_LENGTH, ERROR_MESSAGES.WORD_REQUIRED)
      .max(
        VALIDATION_LIMITS.WORD_MAX_LENGTH,
        ERROR_MESSAGES.WORD_TOO_LONG
      )
      .regex(
        VALIDATION_PATTERNS.WORD_CHARS,
        ERROR_MESSAGES.WORD_INVALID_CHARS
      )
      .transform((s) => s.trim())
      .refine((s) => s.length > 0, ERROR_MESSAGES.WORD_EMPTY),

    synonyms: z
      .array(z.string().min(1).max(50))
      .min(1, ERROR_MESSAGES.SYNONYMS_REQUIRED)
      .max(20, ERROR_MESSAGES.SYNONYMS_TOO_MANY)
      .refine(
        (synonyms) =>
          new Set(synonyms.map((s) => s.toLowerCase())).size ===
          synonyms.length,
        ERROR_MESSAGES.SYNONYMS_MUST_BE_UNIQUE
      ),
  })
  .refine(
    (data) => {
      const wordLower = data.word.toLowerCase();
      return !data.synonyms.some(
        (synonym) => synonym.toLowerCase() === wordLower
      );
    },
    {
      message: ERROR_MESSAGES.SYNONYMS_CANNOT_INCLUDE_WORD,
      path: ['synonyms'],
    }
  );

export type AddSynonymFormData = z.infer<typeof addSynonymSchema>;

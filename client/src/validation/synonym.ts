import { z } from "zod";
import { VALIDATION_LIMITS, VALIDATION_PATTERNS } from "@/constants/validation";
import i18n from "@/localization/i18n.json"


export const addSynonymSchema = z
	.object({
		word: z
			.string()
			.min(VALIDATION_LIMITS.WORD_MIN_LENGTH, i18n.ERROR_MESSAGES.WORD_REQUIRED)
			.max(VALIDATION_LIMITS.WORD_MAX_LENGTH, i18n.ERROR_MESSAGES.WORD_TOO_LONG)
			.regex(VALIDATION_PATTERNS.WORD_CHARS, i18n.ERROR_MESSAGES.WORD_INVALID_CHARS)
			.refine((val) => /^[a-zA-Z]/.test(val), {
				message: i18n.ERROR_MESSAGES.WORD_MUST_START_WITH_LETTER,
			})
			.transform((s) => s.trim())
			.refine((s) => s.length > 0, i18n.ERROR_MESSAGES.WORD_EMPTY),

		synonyms: z
			.array(
				z
					.string()
					.min(VALIDATION_LIMITS.SYNONYM_MIN_LENGTH)
					.max(VALIDATION_LIMITS.SYNONYM_MAX_LENGTH),
			)
			.min(
				VALIDATION_LIMITS.SYNONYMS_MIN_COUNT,
				i18n.ERROR_MESSAGES.SYNONYMS_REQUIRED,
			)
			.max(
				VALIDATION_LIMITS.SYNONYMS_MAX_COUNT,
				i18n.ERROR_MESSAGES.SYNONYMS_TOO_MANY,
			)
			.refine(
				(synonyms) =>
					new Set(synonyms.map((s) => s.toLowerCase())).size ===
					synonyms.length,
				i18n.ERROR_MESSAGES.SYNONYMS_MUST_BE_UNIQUE,
			),
	})
	.refine(
		(data) => {
			const wordLower = data.word.toLowerCase();
			return !data.synonyms.some(
				(synonym) => synonym.toLowerCase() === wordLower,
			);
		},
		{
			message: i18n.ERROR_MESSAGES.SYNONYMS_CANNOT_INCLUDE_WORD,
			path: ["synonyms"],
		},
	);

export type AddSynonymFormData = z.infer<typeof addSynonymSchema>;

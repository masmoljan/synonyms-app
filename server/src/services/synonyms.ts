import { API_ERRORS } from "../constants/consts";
import { ApiError, ApiErrorType } from "../helpers/apiError";
import { SynonymsStore } from "../models/synonymsStore";

interface SynonymsServiceInterface {
	addWordSynonyms(
		word: string,
		synonyms: string[],
	): {
		word: string;
		synonyms: string[];
	};
	getWordSynonyms(word: string): string[];
	searchWords(
		query: string,
		skip: number,
		limit: number,
	): {
		query: string;
		results: { word: string; synonyms: string[] }[];
		count: number;
	};
	getAffectedGroups(word: string, synonyms: string[]): Set<number>;
	createNewGroup(word: string, synonyms: string[]): void;
	addToExistingGroup(
		groupIndex: number,
		word: string,
		synonyms: string[],
	): void;
	mergeGroups(
		affectedGroups: Set<number>,
		newWord: string,
		newSynonyms: string[],
	): void;
}

export class SynonymsService implements SynonymsServiceInterface {
	private static instance: SynonymsService;
	private synonymsStore: SynonymsStore;

	private constructor() {
		this.synonymsStore = new SynonymsStore();
	}

	public static getInstance(): SynonymsService {
		if (!SynonymsService.instance) {
			SynonymsService.instance = new SynonymsService();
		}
		return SynonymsService.instance;
	}

	getAffectedGroups(word: string, synonyms: string[]): Set<number> {
		const affectedGroups = new Set<number>();

		[word, ...synonyms].forEach((w) => {
			const groupIndex = this.synonymsStore.getWordToIndexGroup(w);
			if (groupIndex !== undefined) {
				affectedGroups.add(groupIndex);
			}
		});

		return affectedGroups;
	}

	createNewGroup(word: string, synonyms: string[]) {
		// word does not exist - add it to the group
		const currentIndex = this.synonymsStore.getNextIndex();
		this.synonymsStore.setWordToIndexGroup(word, currentIndex);
		// add word with synonyms to the synonyms group
		this.synonymsStore.setGroupToSynonyms(currentIndex, [word, ...synonyms]);
		// add synonyms to the word group
		this.synonymsStore.setWordsToIndexGroup(synonyms, currentIndex);
		this.synonymsStore.incrementNextIndex();
	}

	addToExistingGroup(groupIndex: number, word: string, synonyms: string[]) {
		const groupSet = this.synonymsStore.getSynonymsGroupSet(groupIndex)!;
		this.synonymsStore.setWordsToIndexGroupIfNotExists(
			[word, ...synonyms],
			groupIndex,
			groupSet,
		);
	}

	mergeGroups(
		affectedGroups: Set<number>,
		newWord: string,
		newSynonyms: string[],
	) {
		const targetGroupIndex = Math.min(...affectedGroups);
		const allWords = new Set<string>();

		// Collect all words from affected groups
		for (const groupIndex of affectedGroups) {
			const groupWords = this.synonymsStore.getSynonymsGroupSet(groupIndex);
			if (groupWords) {
				for (const word of groupWords) {
					allWords.add(word);
				}
			}
		}

		// Add new word and synonyms
		allWords.add(newWord);
		newSynonyms.forEach((synonym) => allWords.add(synonym));

		// Update group set and word-to-group mappings in batch
		this.synonymsStore.setSynonymsGroupSet(targetGroupIndex, allWords);
		this.synonymsStore.setWordsToIndexGroup(
			Array.from(allWords),
			targetGroupIndex,
		);

		// Remove merged groups except the target
		const groupsToDelete = Array.from(affectedGroups).filter(
			(groupIndex) => groupIndex !== targetGroupIndex,
		);
		this.synonymsStore.deleteSynonymsGroups(groupsToDelete);
	}

	addWordSynonyms(word: string, synonyms: string[]) {
		const normalizedWord = this.synonymsStore.normalize(word);
		const normalizedSynonyms = synonyms.map((s) =>
			this.synonymsStore.normalize(s),
		);

		if (normalizedSynonyms.includes(normalizedWord)) {
			throw new ApiError(
				ApiErrorType.WordSynonymsPairEqual,
				new Error(API_ERRORS.WORD_SYNONYMS_PAIR_EQUAL),
			);
		}

		const uniqueSynonyms = new Set(normalizedSynonyms)
		if(uniqueSynonyms.size !== normalizedSynonyms.length) {
			throw new ApiError(
				ApiErrorType.DuplicateSynoynms,
				new Error(API_ERRORS.DUPLICATE_SYNONYMS)
			)
		}

		const affectedGroups = this.getAffectedGroups(
			normalizedWord,
			normalizedSynonyms,
		);

		if (affectedGroups.size === 0) {
			this.createNewGroup(normalizedWord, normalizedSynonyms);
		} else if (affectedGroups.size === 1) {
			const groupIndex = Array.from(affectedGroups)[0];
			this.addToExistingGroup(groupIndex, normalizedWord, normalizedSynonyms);
		} else {
			this.mergeGroups(affectedGroups, normalizedWord, normalizedSynonyms);
		}

		return {
			word: normalizedWord,
			synonyms: [...normalizedSynonyms],
		};
	}

	getWordSynonyms(word: string): string[] {
		const normalizedWord = this.synonymsStore.normalize(word);
		const index = this.synonymsStore.getWordToIndexGroup(normalizedWord);
		return index ? this.synonymsStore.getGroupToSynonyms(index) : [];
	}

	private mapWordWithSynonyms(word: string) {
		const wordIndex = this.synonymsStore.getWordToIndexGroup(word);
		const synonyms = wordIndex
			? this.synonymsStore
					.getGroupToSynonyms(wordIndex)
					.filter((s) => s !== word)
			: [];
		return {
			word,
			synonyms,
		};
	}

	searchWords(query: string, skip: number, limit: number) {
		const normalizedQuery = this.synonymsStore.normalize(query);
		const allWords = this.synonymsStore.getAllWords();

		let matches = allWords
			.filter((word) => word.includes(normalizedQuery))
			.map((word) => this.mapWordWithSynonyms(word));

		const totalCount = matches.length;

		if (skip !== undefined && limit !== undefined) {
			matches = matches.slice(skip, skip + limit);
		}

		return {
			query: normalizedQuery,
			results: matches,
			count: totalCount,
		};
	}
}

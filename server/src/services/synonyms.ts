import { API_ERRORS } from '../helpers/consts';
import { SynonymsStore } from '../models/synonymsStore';
import { ApiError, ApiErrorType } from '../helpers/apiError';

export class SynonymsService {
  private static instance: SynonymsService;
  private synonymsStore: SynonymsStore;

  private constructor() {
    this.synonymsStore = new SynonymsStore();
  }

  getAffectedGroups(word: string, synonyms: string[]) {
    const affectedGroups = new Set<number>();
    // if word exists in wordToGroup, add it to the affected groups
    if (this.synonymsStore.hasWord(word)) {
      affectedGroups.add(
        this.synonymsStore.getWordToIndexGroup(word) as number
      );
    }
    // if synonyms exist in wordToGroup, add them to the affected groups
    synonyms.forEach((synonym) => {
      if (this.synonymsStore.hasWord(synonym)) {
        affectedGroups.add(
          this.synonymsStore.getWordToIndexGroup(synonym) as number
        );
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
    synonyms.forEach((synonym) => {
      this.synonymsStore.setWordToIndexGroup(synonym, currentIndex);
    });
    this.synonymsStore.incrementNextIndex();
  }

  addToExistingGroup(groupIndex: number, word: string, synonyms: string[]) {
    const groupSet = this.synonymsStore.getSynonymsGroupSet(groupIndex)!;

    // Add word if it doesn't exist
    if (!this.synonymsStore.hasWord(word)) {
      this.synonymsStore.setWordToIndexGroup(word, groupIndex);
      groupSet.add(word);
    }

    // Add synonyms
    synonyms.forEach((synonym) => {
      if (!this.synonymsStore.hasWord(synonym)) {
        this.synonymsStore.setWordToIndexGroup(synonym, groupIndex);
        groupSet.add(synonym);
      }
    });
  }

  mergeGroups(
    affectedGroups: Set<number>,
    newWord: string,
    newSynonyms: string[]
  ) {
    const targetGroupIndex = Math.min(...Array.from(affectedGroups));
    const allWords = new Set<string>();

    affectedGroups.forEach((groupIndex) => {
      const groupWords = this.synonymsStore.getSynonymsGroupSet(groupIndex)!;
      groupWords.forEach((word) => allWords.add(word));
    });

    allWords.add(newWord);

    newSynonyms.forEach((synonym) => allWords.add(synonym));
    this.synonymsStore.setSynonymsGroupSet(targetGroupIndex, allWords);

    allWords.forEach((word) => {
      this.synonymsStore.setWordToIndexGroup(word, targetGroupIndex);
    });

    affectedGroups.forEach((groupIndex) => {
      if (groupIndex !== targetGroupIndex) {
        this.synonymsStore.deleteSynonymsGroup(groupIndex);
      }
    });
  }

  addWordSynonyms(word: string, synonyms: string[]) {
    const normalizedWord = this.synonymsStore.normalize(word);
    const normalizedSynonyms = synonyms.map((s) =>
      this.synonymsStore.normalize(s)
    );

    if (normalizedSynonyms.includes(normalizedWord)) {
      throw new ApiError(
        ApiErrorType.WordSynonymsPairEqual,
        new Error(API_ERRORS.WORD_SYNONYMS_PAIR_EQUAL)
      );
    }

    const affectedGroups = this.getAffectedGroups(
      normalizedWord,
      normalizedSynonyms
    );

    if (affectedGroups.size === 0) {
      this.createNewGroup(normalizedWord, normalizedSynonyms);
    } else if (affectedGroups.size === 1) {
      const groupIndex = Array.from(affectedGroups)[0];
      this.addToExistingGroup(groupIndex, normalizedWord, normalizedSynonyms);
    } else {
      // if entered word is a synonym of another word in the group, add it to the group
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

  searchWords(query: string, skip: number = 0, limit: number = 10) {
    const normalizedQuery = this.synonymsStore.normalize(query);
    const allWords = this.synonymsStore.getAllWords();

    const matches = allWords
      .filter((word) => word.includes(normalizedQuery))
      .slice(skip, skip + limit)
      .map((word) => {
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
      });

    return {
      query: normalizedQuery,
      results: matches,
      count: matches.length,
    };
  }

  public static getInstance(): SynonymsService {
    if (!SynonymsService.instance) {
      SynonymsService.instance = new SynonymsService();
    }
    return SynonymsService.instance;
  }
}

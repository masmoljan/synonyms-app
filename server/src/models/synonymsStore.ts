interface ISynonymsStore {
  normalize(word: string): string;
  hasWord(word: string): boolean;
  hasSynonym(synonym: string): boolean;
  addWord(word: string, groupIndex: number): void;
  getWordToIndexGroup(word: string): number | undefined;
  setWordToIndexGroup(word: string, groupIndex: number): void;
  setWordsToIndexGroup(words: string[], groupIndex: number): void;
  setWordsToIndexGroupIfNotExists(
    words: string[],
    groupIndex: number,
    groupSet: Set<string>
  ): void;
  getGroupToSynonyms(groupIndex: number): string[];
  setGroupToSynonyms(groupIndex: number, synonyms: string[]): void;
  getNextIndex(): number;
  incrementNextIndex(): void;
  getSynonymsGroupSet(groupIndex: number): Set<string> | undefined;
  setSynonymsGroupSet(groupIndex: number, words: Set<string>): void;
  deleteSynonymsGroup(groupIndex: number): void;
  deleteSynonymsGroups(groupIndices: number[]): void;
  getAllWords(): string[];
}

export class SynonymsStore implements ISynonymsStore {
  wordToGroup: Map<string, number>;
  groupToSynonyms: Map<number, Set<string>>;
  nextIndex: number;

  constructor() {
    this.wordToGroup = new Map();
    this.groupToSynonyms = new Map();
    this.nextIndex = 1;
  }

  normalize(word: string): string {
    return word.toLowerCase().trim();
  }

  hasWord(word: string): boolean {
    return this.wordToGroup.has(word);
  }

  hasSynonym(synonym: string): boolean {
    return this.wordToGroup.has(synonym);
  }

  addWord(word: string, groupIndex: number) {
    this.wordToGroup.set(word, groupIndex);
  }

  getWordToIndexGroup(word: string): number | undefined {
    return this.wordToGroup.get(word);
  }

  setWordToIndexGroup(word: string, groupIndex: number) {
    this.wordToGroup.set(word, groupIndex);
  }

  setWordsToIndexGroup(words: string[], groupIndex: number) {
    words.forEach((word) => this.setWordToIndexGroup(word, groupIndex));
  }

  setWordsToIndexGroupIfNotExists(
    words: string[],
    groupIndex: number,
    groupSet: Set<string>
  ) {
    words.forEach((word) => {
      if (!this.hasWord(word)) {
        this.setWordToIndexGroup(word, groupIndex);
        groupSet.add(word);
      }
    });
  }

  getGroupToSynonyms(groupIndex: number): string[] {
    return Array.from(this.groupToSynonyms.get(groupIndex) || []);
  }

  setGroupToSynonyms(groupIndex: number, synonyms: string[]) {
    this.groupToSynonyms.set(groupIndex, new Set(synonyms));
  }

  getNextIndex(): number {
    return this.nextIndex;
  }

  incrementNextIndex(): void {
    this.nextIndex++;
  }

  getSynonymsGroupSet(groupIndex: number): Set<string> | undefined {
    return this.groupToSynonyms.get(groupIndex);
  }

  setSynonymsGroupSet(groupIndex: number, words: Set<string>): void {
    this.groupToSynonyms.set(groupIndex, words);
  }

  deleteSynonymsGroup(groupIndex: number): void {
    this.groupToSynonyms.delete(groupIndex);
  }

  deleteSynonymsGroups(groupIndices: number[]): void {
    groupIndices.forEach((groupIndex) => {
      this.deleteSynonymsGroup(groupIndex);
    });
  }

  getAllWords(): string[] {
    return Array.from(this.wordToGroup.keys());
  }
}

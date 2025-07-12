export class SynonymsStore {
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

  getAllWords(): string[] {
    return Array.from(this.wordToGroup.keys());
  }
}

import { SynonymsService } from "../services/synonyms";

describe("SynonymsService", () => {
  let service: SynonymsService;

  beforeEach(() => {
    service = SynonymsService.getInstance();
    (service as any).synonymsStore =
      new (require("../models/synonymsStore").SynonymsStore)();
  });

  describe("addWordSynonyms", () => {
    it("should create a new group for new word", () => {
      const result = service.addWordSynonyms("big", ["large", "huge"]);

      expect(result.word).toBe("big");
      expect(result.synonyms).toEqual(["large", "huge"]);
    });

    it("should handle case insensitive words", () => {
      service.addWordSynonyms("BIG", ["Large"]);
      const synonyms = service.getWordSynonyms("big");

      expect(synonyms).toContain("big");
      expect(synonyms).toContain("large");
    });

    it("should add to existing group", () => {
      service.addWordSynonyms("big", ["large"]);
      service.addWordSynonyms("big", ["huge"]);

      const synonyms = service.getWordSynonyms("big");
      expect(synonyms).toContain("big");
      expect(synonyms).toContain("large");
      expect(synonyms).toContain("huge");
    });

    it("should merge groups (transitivity)", () => {
      service.addWordSynonyms("big", ["large"]);
      service.addWordSynonyms("small", ["tiny"]);
      service.addWordSynonyms("big", ["small"]);

      const synonyms = service.getWordSynonyms("big");
      expect(synonyms).toContain("big");
      expect(synonyms).toContain("large");
      expect(synonyms).toContain("small");
      expect(synonyms).toContain("tiny");
    });

    it("should reject word as its own synonym", () => {
      expect(() => {
        service.addWordSynonyms("big", ["big"]);
      }).toThrow();
    });
  });

  describe("getWordSynonyms", () => {
    it("should return empty array for non-existent word", () => {
      const synonyms = service.getWordSynonyms("nonexistent");
      expect(synonyms).toEqual([]);
    });

    it("should return all synonyms including the word itself", () => {
      service.addWordSynonyms("happy", ["joyful", "glad"]);
      const synonyms = service.getWordSynonyms("happy");

      expect(synonyms).toContain("happy");
      expect(synonyms).toContain("joyful");
      expect(synonyms).toContain("glad");
    });
  });

  describe("searchWords", () => {
    beforeEach(() => {
      service.addWordSynonyms("big", ["large", "huge"]);
      service.addWordSynonyms("small", ["tiny", "little"]);
    });

    it("should find words containing query", () => {
      const result = service.searchWords("big", 0, 10);

      expect(result.query).toBe("big");
      expect(result.results).toHaveLength(1);
      expect(result.results[0].word).toBe("big");
      expect(result.results[0].synonyms).toContain("large");
    });

    it("should respect pagination", () => {
      const result = service.searchWords("", 0, 2);

      expect(result.results.length).toBeLessThanOrEqual(2);
    });
  });
});

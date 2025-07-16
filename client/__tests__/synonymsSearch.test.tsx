import { vi } from "vitest";
import { SynonymsSearch } from "../src/components/features/SynonymsSearch/index";
import { render, screen } from "../src/test/testUtils";

vi.mock("../src/hooks/useScrollToTop", () => ({ useScrollToTop: () => {} }));

it("renders search title", () => {
	render(<SynonymsSearch />);
	expect(screen.getByText(/find synonyms/i)).toBeInTheDocument();
});

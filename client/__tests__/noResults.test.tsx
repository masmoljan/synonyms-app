import { render, screen } from "@/test/testUtils";
import { NoResults } from "../src/components/core/NoResults/index";

it("shows no results message", () => {
  render(<NoResults searchTerm="test" />);
  expect(screen.getByText(/no synonyms found/i)).toBeInTheDocument();
});

it("shows no results message with empty search term", () => {
  render(<NoResults searchTerm="" />);
  expect(screen.getByText(/no synonyms found for word/i)).toBeInTheDocument();
});

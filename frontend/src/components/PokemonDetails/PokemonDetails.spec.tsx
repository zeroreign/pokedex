import { render } from "@testing-library/react";
import PokemonDetails from "./PokemonDetails";

describe("Pokemon Details", () => {
  it("should render component", async () => {
    render(<PokemonDetails/>);
  });
});
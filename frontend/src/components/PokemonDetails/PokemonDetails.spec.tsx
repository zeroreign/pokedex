import { render } from "@testing-library/react";
import PokemonDetails from "./PokemonDetails";
import { PokemonTypes } from "../PokemonAPIProvider/pokemon-api.types";
import type { PokemonDetails as PokemonDetailsType } from "./PokemonDetails.types";

describe("Pokemon Details", () => {
  it("should get pokemon details from props", async () => {
    const pokemonDetails: PokemonDetailsType = {
      id: 94,
      name: "gengar",
      types: [PokemonTypes.POISON, PokemonTypes.GHOST],
      weight: 405,
      height: 15,
    };
    render(<PokemonDetails details={pokemonDetails} />);
  });
});

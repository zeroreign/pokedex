import { render, screen } from "@testing-library/react";
import PokemonDetails from ".";
import { PokemonTypes } from "../PokemonAPIProvider/pokemon-api.types";
import type { PokemonDetails as PokemonDetailsType } from "./types";
import { capitalize } from "lodash";

describe("Pokemon Details", () => {
  it("should be blank when there are no details", async () => {
    const { container } = render(<PokemonDetails />);
    expect(container.querySelector("#identifiers")).not.toBeInTheDocument();
    expect(container.querySelector("#types")).not.toBeInTheDocument();
    expect(container.querySelector("#dimentions")).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  it("should have pokemon details", async () => {
    const pokemonDetails: PokemonDetailsType = {
      id: 94,
      name: "gengar",
      types: [PokemonTypes.POISON, PokemonTypes.GHOST],
      weight: 405,
      height: 15,
    };
    render(<PokemonDetails details={pokemonDetails} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "# 94" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: capitalize("gengar") })
    ).toBeInTheDocument();
    expect(
      screen.getByText(capitalize(PokemonTypes.GHOST))
    ).toBeInTheDocument();
    expect(
      screen.getByText(capitalize(PokemonTypes.POISON))
    ).toBeInTheDocument();
    expect(screen.getByText("Weight: 405")).toBeInTheDocument();
    expect(screen.getByText("Height: 15")).toBeInTheDocument();
  });

  it("should render unchanged", async () => {
    const pokemonDetails: PokemonDetailsType = {
      id: 94,
      name: "gengar",
      types: [PokemonTypes.POISON, PokemonTypes.GHOST],
      weight: 405,
      height: 15,
    };
    const { container } = render(<PokemonDetails details={pokemonDetails} />);
    expect(container).toMatchSnapshot();
  });
});

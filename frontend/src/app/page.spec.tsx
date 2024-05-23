import { render, screen, waitFor } from "@testing-library/react";
import Home from "./page";
import { capitalize } from "lodash";
import { PokemonTypes } from "@/components/PokemonAPIProvider/pokemon-api.types";
import PokemonAPIProvider from "@/components/PokemonAPIProvider";

describe("App", () => {
  it("renders a heading", () => {
    render(<Home />, { wrapper: PokemonAPIProvider });

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Pokedex");
  });

  it("renders homepage unchanged", () => {
    const { container } = render(<Home />, { wrapper: PokemonAPIProvider });
    expect(container).toMatchSnapshot();
  });

  it("should show specific pokemon", async () => {
    const pokemonName = "gengar";
    render(<Home />, { wrapper: PokemonAPIProvider });

    await waitFor(() => {
      const pokemon = screen.getByRole("img", { name: "gengar" });
      expect(pokemon).toBeInTheDocument();

      const pokemonImageElement = screen.getByRole("img", {
        name: pokemonName,
      });
      expect(pokemonImageElement).toBeInTheDocument();
      expect(pokemonImageElement).toHaveAttribute("src");
      expect(
        screen.getByRole("heading", { level: 2, name: "# 94" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 2, name: capitalize(pokemonName) })
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
  });
});

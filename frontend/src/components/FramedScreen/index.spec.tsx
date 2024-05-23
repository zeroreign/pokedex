import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import FramedScreen from ".";
import { FramedScreenProps } from "./types";

describe("Framed Screen", () => {
  type Pokemon = Pick<Required<FramedScreenProps>["pokemon"], "name" | "image">;

  describe("Props", () => {
    it("should default to blank screen", async () => {
      render(<FramedScreen pokemon={undefined} />);
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("should display the pokemon image", async () => {
      const pokemon: Pokemon = {
        name: "gengar",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/94.svg",
      } as const;
      render(<FramedScreen pokemon={pokemon} />);
      const pokemonImageElement = screen.getByRole("img", {
        name: pokemon.name,
      });
      expect(pokemonImageElement).toBeInTheDocument();
      expect(pokemonImageElement).toHaveAttribute("src", pokemon.image);
    });
  });

  describe("Error handling", () => {
    it("should show error image if uri is invalid", async () => {
      const pokemon: Pokemon = {
        name: "gengar",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/invalid-uri-error.svg",
      } as const;
      render(<FramedScreen pokemon={pokemon} />);
      const pokemonImageElement = screen.queryByRole("img", {
        name: pokemon.name,
      });
      fireEvent.error(pokemonImageElement as Element); //Testing Library limitation requires event to be fired manually because URL was not fetched

      await waitFor(() => {
        const errorImageElement = screen.queryByRole("img", {
          name: `Failed to load image ${pokemon.name}`,
        });
        expect(errorImageElement).toBeInTheDocument();
        expect(errorImageElement).toHaveAttribute(
          "src",
          expect.stringContaining("unown-error.gif")
        );
      });
    });
  });
});

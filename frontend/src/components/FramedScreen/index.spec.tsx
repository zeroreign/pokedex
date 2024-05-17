import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import FramedScreen from ".";
import { FramedScreenProps } from "./types";

describe("Screen Frame", () => {
  type Pokemon = Pick<Required<FramedScreenProps>["pokemon"], "name" | "image">;
  it("should default to blank screen", async () => {
    render(<FramedScreen pokemon={undefined} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  describe("Props", () => {
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

    it("should set the component default max width and height when not available", async () => {
      const { container } = render(<FramedScreen />);
      const framedScreen = container.querySelector("#framed-screen");
      expect(framedScreen).toBeInTheDocument();
      expect(framedScreen).toHaveClass("max-w-5");
      expect(framedScreen).toHaveClass("max-h-5");
    });

    it("should set the component max width when passed", async () => {
      const { container } = render(<FramedScreen width={10} />);
      const framedScreen = container.querySelector("#framed-screen");
      expect(framedScreen).toBeInTheDocument();
      expect(framedScreen).toHaveClass("max-w-10");
      expect(framedScreen).toHaveClass("max-h-5");
    });

    it("should set the component max height when passed", async () => {
      const { container } = render(<FramedScreen height={10} />);
      const framedScreen = container.querySelector("#framed-screen");
      expect(framedScreen).toBeInTheDocument();
      expect(framedScreen).toHaveClass("max-w-5");
      expect(framedScreen).toHaveClass("max-h-10");
    });

    it("should set the component max width and height when passed", async () => {
      const { container } = render(<FramedScreen width={10} height={15} />);
      const framedScreen = container.querySelector("#framed-screen");
      expect(framedScreen).toBeInTheDocument();
      expect(framedScreen).toHaveClass("max-w-10");
      expect(framedScreen).toHaveClass("max-h-15");
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

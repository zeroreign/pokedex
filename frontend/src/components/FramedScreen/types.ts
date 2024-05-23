import { Pokemon } from "../PokemonAPIProvider/pokemon-api.types";

export type ImageErrorState = {
  hasError: boolean;
  errorLabel: string;
};

export interface FramedScreenProps {
  pokemon?: Pick<Pokemon, "name" | "image">;
}
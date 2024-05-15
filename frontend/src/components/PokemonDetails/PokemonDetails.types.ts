import { Pokemon } from "../PokemonAPIProvider/pokemon-api.types";

export type PokemonDetails = NonNullable<Pick<Required<Pokemon>, "id" | "name" | "types" | "weight" | "height">>;

export interface PokemonDetailsProps {
  details: PokemonDetails;
}
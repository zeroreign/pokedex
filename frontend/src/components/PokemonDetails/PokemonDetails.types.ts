import { Pokemon } from "../PokemonAPIProvider/pokemon-api.types";

export type PokemonDetails = Required<Pick<Pokemon, "id" | "name" | "types" | "weight" | "height">>;

export interface PokemonDetailsProps {
  details: PokemonDetails;
}
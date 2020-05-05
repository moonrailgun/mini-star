import * as pokemon from 'pokemon';

export function getPokemon(): string {
  return pokemon.random();
}

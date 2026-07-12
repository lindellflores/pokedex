export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  sprites: Sprites
  stats: Stat[]
  cries: Cries
  types: PokemonType[]
  abilities: Ability[]
  species: Species
}

export interface Sprites {
  front_default: string
  versions: SpriteVersions
}

export interface SpriteVersions {
  "generation-v": GenerationVSprites
}

export interface GenerationVSprites {
  "black-white": BlackWhiteSprites
}

export interface BlackWhiteSprites {
  front_default: string
  animated: AnimatedSprites | null
}

export interface AnimatedSprites {
  front_default: string | null
}

export interface Stat {
  base_stat: number
  stat: NamedApiResource
}

export interface PokemonType {
  slot: number
  type: NamedApiResource
}

export interface Ability {
  ability: NamedApiResource
  is_hidden: boolean
  slot: number
}

export interface Species {
  name: string
  url: string
}

export interface Cries {
  latest: string
  legacy: string
}

export interface NamedApiResource {
  name: string
}

export interface PokemonListItem {
  id: number
  name: string
  url: string
}

export interface PokemonSpecies {
  genera: Genus[]
  evolves_from_species: boolean
  flavor_text_entries: FlavorTextEntry[]
  evolution_chain: EvolutionChain
  varieties: Variety[]
}

export interface Genus {
  genus: string
  language: NamedApiResource
}

export interface FlavorTextEntry {
  flavor_text: string
  language: NamedApiResource
  version: NamedApiResource
}

export interface EvolutionChain {
  url: string
}

export interface Variety {
  pokemon: NamedApiResource
}
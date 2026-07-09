
export interface PokemonSpecies {
  genera: {
    genus: string
    language: {
      name: string
    }
  }[]

  evolves_from_species: boolean

  flavor_text_entries: {
    flavor_text: string
    language: {
      name: string
    }
    version: {
      name: string
    }
  }[]

  evolution_chain:{
    url: string
  }

  varieties:{
    pokemon:{
      name:string
    }
  }[]
}

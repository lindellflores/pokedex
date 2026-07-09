export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
    versions: {
      'generation-v': {
        'black-white': {
          animated: {
            back_default: string | null
            back_female: string | null
            back_shiny: string | null
            back_shiny_female: string | null
            front_default: string | null
            front_female: string | null
            front_shiny: string | null
            front_shiny_female: string | null
          } | null
          front_default: string
        }
      }
    }
  }
  stats: {
    base_stat: number
    stat: {
      name: string
    }
  }[]

  cries: {
    latest: string
    legacy: string
  }
  types: {
    slot: number
    type: {
      name: string
    }
  }[]

  abilities: {
    ability: {
      name: string
    }
    is_hidden: boolean
    slot: number
  }[]

  species: {
    name: string
    url: string
  }
}

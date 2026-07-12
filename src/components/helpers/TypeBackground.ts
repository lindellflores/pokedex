import firebg from "@/assets/typeBG/fire.png";
import waterbg from "@/assets/typeBG/water.jpg";
import icebg from "@/assets/typeBG/ice.png";
import rockbg from "@/assets/typeBG/rock.png";
import flyingbg from "@/assets/typeBG/flying.jpg";
import ghostbg from "@/assets/typeBG/ghost.jpg";
import normalbg from "@/assets/typeBG/normal.jpg";
import ground from "@/assets/typeBG/ground.jpg"
import bug from "@/assets/typeBG/bug.jpg"
import electric from "@/assets/typeBG/electric.jpg"
import poison from "@/assets/typeBG/poison.jpg"
import dark from "@/assets/typeBG/dark.jpg"
import psychic from "@/assets/typeBG/psychic.jpg"
import fairy from "@/assets/typeBG/fairy.jpg"
import fighting from "@/assets/typeBG/fighting.jpg"
import dragon from "@/assets/typeBG/dragon.jpg"
import grass from "@/assets/typeBG/grass.jpg"
import steel from "@/assets/typeBG/steel.jpg"

export const supportedTypes = [
  "fire",
  "water",
  "ice",
  "rock",
  "flying",
  "ghost",
  "ground",
  "bug",
  "electric",
  "poison",
  "dark",
  "fairy",
  "psychic",
  "fighting",
  "dragon",
  "grass",
  "steel"
] as const;

export type PokemonType = (typeof supportedTypes)[number];

export function isPokemonType(type: string): type is PokemonType {
  return supportedTypes.includes(type as PokemonType);
}

export function getBackgroundClass(type: PokemonType): string {
  switch (type) {
    case "fire":
      return firebg;
    case "water":
      return waterbg;
    case "ice":
      return icebg;
    case "rock":
      return rockbg;
    case "flying":
      return flyingbg;
    case "ghost":
      return ghostbg;
    case "ground":
      return ground
    case "bug":
      return bug
    case "electric":
      return electric
    case "poison":
      return poison
    case "dark":
      return dark
    case "fairy":
      return fairy
    case "psychic":
      return psychic
    case "fighting":
      return fighting
    case "dragon":
      return dragon
    case "grass":
      return grass
    case "steel":
      return steel;
    default:
      return normalbg;
    
  }
}

export { normalbg };
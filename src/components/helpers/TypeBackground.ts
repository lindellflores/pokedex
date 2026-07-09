import firebg from "@/assets/typeBG/fire.jpeg";
import waterbg from "@/assets/typeBG/water.jpg";
import icebg from "@/assets/typeBG/ice.png";
import rockbg from "@/assets/typeBG/rock.png";
import flyingbg from "@/assets/typeBG/flying.jpg";
import ghostbg from "@/assets/typeBG/ghost.png";
import normalbg from "@/assets/typeBG/normal.jpg";

export type PokemonType =
  | "fire"
  | "water"
  | "ice"
  | "rock"
  | "flying"
  | "ghost";

export function getBackgroundClass(type: PokemonType): string {
  switch (type) {
    case "fire":
      return firebg;
    case "water":
      return waterbg;
    case "flying":
      return flyingbg;
    case "ice":
      return icebg;
    case "rock":
      return rockbg;
    case "ghost":
      return ghostbg;
    default:
      return normalbg;
  }
}

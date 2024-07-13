import { Cocktail } from "./Cocktail"

export type CocktailResponse = {
    kind: "cocktail",
    data: { drinks: Cocktail[] }
}
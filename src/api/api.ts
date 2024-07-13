import axios from "axios";
import { MealResponse } from "../types/MealResponse";
import { CocktailResponse } from "../types/CocktailResponse";

const MEALS_ENDPOINT = "https://www.themealdb.com/"
const COCKTAILS_ENDPOINT= "https://www.thecocktaildb.com"

type GetResponse = MealResponse | CocktailResponse

async function get(url: string) : Promise<GetResponse> {
    return await axios({ method: "get", url: url })
                .then(res => (
                    url.includes(MEALS_ENDPOINT) 
                    ? {kind: "meal", ...res}
                    : {kind: "cocktail", ...res}
                ))
                .catch(err => err);
}

export async function api(
    itemType: "meal" | "cocktail",
    path: string, 
): Promise<GetResponse> {
    const url = `${itemType == "meal"? MEALS_ENDPOINT: COCKTAILS_ENDPOINT}${path}`
    const res = await get(url)
    return ( itemType == "meal" ? (res as MealResponse)
                                : (res as CocktailResponse))
}
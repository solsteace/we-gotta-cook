import { Meal } from "./Meal"

export type MealResponse = {
    kind: "meal",
    data: { meals: Meal[] }
}
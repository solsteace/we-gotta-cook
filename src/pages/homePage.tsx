import { useEffect, useState } from "react"
import { api } from "../api/api";
import { Meal } from "../types/Meal";
import { Cocktail } from "../types/Cocktail";

// Based on https://www.themealdb.com/api/json/v1/1/random.php 
// Last check: July 2024

export function HomePage() {
    const [cocktailsFetched, setCocktailsFetched] = useState(false);
    const [cocktailsSamples, setCocktailsSamples] = useState<Cocktail[]>([]);
    const [mealsFetched, setMealsFetched] = useState(false);
    const [mealsSamples, setMealsSamples] = useState<Meal[]>([]);
    
    // No access to endpoint which to get n samples :/
    useEffect(() => {
        async function getData(): Promise<void> {
            const meals: Meal[] = []
            const drinks: Cocktail[] = [];
            for(let i = 0; i < 3; i++) {
                await api("meal", "/api/json/v1/1/random.php")
                    .then(res => {
                        if(res.kind == "meal") {
                            const meal = res.data.meals[0];
                            meals.push(meal)
                        }
                    })
                await api("cocktail", "/api/json/v1/1/random.php")
                    .then(res => {
                        if(res.kind == "cocktail") {
                            const drink = res.data.drinks[0];
                            drinks.push(drink)
                        }
                    })
            }

            if(drinks.length > 0) setCocktailsFetched(true);
            if(meals.length > 0) setMealsFetched(true);
            setMealsSamples(meals);
            setCocktailsSamples(drinks);
        }

        getData();
    }, [])

    return (
        <>
            <section className="home__hero">
                <div>
                    <img 
                        src="https://i0.wp.com/www.davidgriffen.com/wp-content/uploads/2016/02/David-Griffen-Photography-Food-Action-20.jpg?fit=970%2C647&ssl=1" 
                        alt="Cook!" 
                        className="hero__image" 
                    />
                </div>
                <div className="hero__content">
                    <h2> Let's get cookin'! </h2>
                    <p> You know your taste, and we know the recipe. Maybe you and us could cook something up </p>
                    <button> Explore </button>
                </div>
            </section>
            <section className="home__intro">
                <div>
                    <img src="" alt="cooking" />
                </div>
                <div>
                    <h2> Compendium of Delicacies </h2>
                    <p>
                        Welcome to our culinary haven, where delightful meals and exquisite cocktails come together to create unforgettable dining experiences.  Our site offers a treasure trove of recipes, meticulously curated to inspire both novice cooks and seasoned chefs. Whether you're in the mood for a hearty dinner, a light brunch, or a refreshing drink, we have something to tantalize your taste buds. Explore our collection, where each recipe is crafted with passion, precision, and a touch of creativity, ensuring that every dish and cocktail you prepare is nothing short of extraordinary.
                    </p>
                </div>
            </section>
            <section className="home__samples">
                <div className="samples__heading">
                    <h2> Our Entries</h2>
                    <p> Explore more on our page! </p>
                </div>
                <div className="samples__meals">
                    <h3> Meals </h3>
                    <div>
                        {
                            !mealsFetched
                                ? <p> Fetching... </p>
                                : mealsSamples.map((item, key) => (
                                    <li key={key}> {item.strMeal} </li>
                                )) 
                        }
                    </div>
                </div>
                <div className="samples__cocktails">
                    <h3> Cocktails </h3>
                    <div>
                        {
                            !cocktailsFetched
                                ? <p> Fetching... </p>
                                : cocktailsSamples.map((item, key) => (
                                    <li key={key}> {item.strDrink} </li>
                                )) 
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
import { useEffect, useState } from "react"
import { api } from "../../api/api";
import { Meal } from "../../types/Meal";
import { Cocktail } from "../../types/Cocktail";
import "./homePage.scss"

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
            for(let i = 0; i < 4; i++) {
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

    console.log(mealsSamples)
    console.log(cocktailsSamples)
    return (
        <>
            <section className="home__hero">
                <div className="hero__content">
                    <h2> Let's get cookin'! </h2>
                    <p> You know your taste, and we know the recipe. Maybe you and us could cook something up </p>
                    <button className="button--medium"> Explore </button>
                </div>
                <div className="hero__image">
                    <div className="dim"> </div>
                    <img 
                        src="https://i0.wp.com/www.davidgriffen.com/wp-content/uploads/2016/02/David-Griffen-Photography-Food-Action-20.jpg?fit=970%2C647&ssl=1" 
                        alt="Cook!" 
                    />
                </div>
            </section>
            <section className="home__intro">
                <div className="intro__image">
                    <img 
                        src="https://www.themixer.com/en-uk/wp-content/uploads/sites/3/2022/09/FoodCocktailPairing_Canva_VEX-Collective-cocktailappetizer-1024x512.jpg" 
                        alt="cooking" 
                    />
                </div>
                <div className="intro__content">
                    <h2> The Compendium of Delicacies </h2>
                    <p>
                        Welcome to our culinary haven, where delightful meals and exquisite cocktails come together to create unforgettable dining experiences. Explore our collection, where each recipe is crafted with passion, precision, and a touch of creativity, ensuring that every dish and cocktail you prepare is nothing short of extraordinary.
                    </p>
                </div>
            </section>
            <section className="home__samples">
                <h2> Today's Selections</h2>
                <div className="samples__list">
                    {
                        !mealsFetched
                            ? ( mealsSamples.length == 0
                                ? <p> Something went wrong :/ </p>
                                : <p> Fetching... </p>
                            )
                            : mealsSamples.map((item, key) => (
                                <div className="sample">
                                    <img key={key} src={item.strMealThumb} alt={item.strMeal} />
                                    <div>
                                        <p className="sample__name">{item.strMeal}</p>
                                    </div>
                                </div>
                            )) 
                    }
                    {
                        !cocktailsFetched
                            ? ( cocktailsSamples.length == 0
                                ? <p> Something went wrong :/ </p>
                                : <p> Fetching... </p>
                            )
                            : cocktailsSamples.map((item, key) => (
                                <div className="sample">
                                    <img key={key} src={item.strDrinkThumb} alt={item.strDrink} />
                                    <div>
                                        <p className="sample__name">{item.strDrink}</p>
                                    </div>
                                </div>
                            )) 
                    }
                </div>
            </section>
        </>
    )
}
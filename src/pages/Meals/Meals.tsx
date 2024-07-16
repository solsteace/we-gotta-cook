import { useEffect, useState } from "react"
import { api } from "../../api/api"
import { Meal } from "../../types/Meal";
import "./Meals.scss";
import { Link } from "react-router-dom";

type MealFilter = {
    area: string,
    category: string
};

type Area = {strArea: string}

function Loading() {
    return (
        <div className="meals__loading">
            <h2> Please Wait </h2>
            <div className="icon icon--medium" >
                <img 
                    src="https://i.gifer.com/ZKZg.gif" 
                    alt="Loading..." 
                />
            </div>
            <p> We're preparing things up just for you</p>
        </div>
    )
}

function Content( {areas}: { areas: Area[]}) {
    const [isSearching, setIsSearching] = useState(false);
    const [mealList, setMealList] = useState<Meal[]>([]);
    const [activeFilters, setActiveFilters] = useState<MealFilter>({
        area: "", category: ""
    });

    useEffect(() => {
        async function getData() {
            const searchInactive = activeFilters.area == ""
            if(!searchInactive) {
                let filter = "?"
                filter += activeFilters.area == ""? "": `a=${activeFilters.area}`

                setIsSearching(true)
                await api("meal", `/api/json/v1/1/filter.php${filter}`)
                    .then(res => {
                        if(res.kind == "meal") {
                            setMealList(res.data.meals)
                        }
                    })
                    .catch(err => console.log(err))
                setIsSearching(false)
            }
        }

        getData()
    }, [activeFilters])

    return (
        <>
            <div className="meals__utils">
                <div className="meals__areas">
                    {
                        areas.map((area, idx) => {
                            const isSelected = area.strArea == activeFilters.area;
                            return (
                                <div 
                                    className={`area ${isSelected? "area--active": ""}`}
                                    key={idx}
                                    onClick = {() => {
                                        const shouldUpdate = activeFilters.area != area.strArea
                                        if (shouldUpdate) {
                                            const newActiveFilters = {...activeFilters}
                                            newActiveFilters.area = area.strArea;
                                            setActiveFilters(newActiveFilters);
                                        }
                                    }}
                                >
                                    <p> {area.strArea} </p> 
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="meals__list">
                {
                    (activeFilters.area == "")
                    ? (
                        <div className="meals__startSearch">
                            <p> Start Searching! </p>
                            <p> Select one of the region you want to search </p>
                        </div>
                    ) : (
                        isSearching
                        ? <p> Searching... </p>
                        : mealList.map((meal, idx) => (
                            <Link
                                className="meals__searchResult searchResult" 
                                to={`/meal/${meal.idMeal}`}
                                key={idx}
                            >
                                <div className="searchResult__image">
                                    <img src={`${meal.strMealThumb}/preview`} alt={meal.strMeal} />
                                </div>
                                <p className="searchResult__info" > {meal.strMeal} </p> 
                            </Link>
                        ))
                    )

                }
            </div>
            <button type="button"> 
                {activeFilters.area == "" 
                    ? <></>
                    : <a href="#discoverMeals"> Back to Top </a> 
                }
            </button>
        </>
    )
}

export function Meals() {
    const [pageReady, setPageReady] = useState(false);
    const [areaList, setAreaList] = useState<Area[]>([]);

    useEffect(() => {
        async function getData() {
            await api("meal", "/api/json/v1/1/list.php?a=list")
                .then(res => setAreaList(res.kind == "meal" ? res.data.meals : []))
                .catch(err => console.log(err))
            setPageReady(true);
        }

        getData();
    }, [])

    return (
        <>
            <section className="meals">
                <h2 id="discoverMeals"> Discover Meals</h2>
                {pageReady ? <Content areas={areaList} /> : <Loading/> }
            </section>
        </>
    )
}
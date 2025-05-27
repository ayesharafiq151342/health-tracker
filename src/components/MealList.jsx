import React from "react";
import Meal from '../components/Meal';
export default function MealList({mealData})
{
    const nutrients = mealData.nutrients;
    return <main>
        <section className="nutrients">
            <ul>
                <li>Calories: {nutrients.calories.toFixed(0)}</li>
                <li>Carbs: {nutrients.carbohydrates.toFixed(0)}</li>
                <li>Fats: {nutrients.fat.toFixed(0)}</li>
                <li>Protein: {nutrients.protein.toFixed(0)}</li>

            </ul>
        </section>
        <section className="meals">
            {mealData.meals.map((meal) =>
            {
                return <Meal Key = {meal.id} meal = {meal} />
            }) }
        </section>
    </main>
}
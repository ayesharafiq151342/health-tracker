import React, { useState } from 'react'
import MealList from './MealList';
import '../components/Parent.css'
export default function Parent() {
    const [mealData, setMealData] = useState(null);
    const [calories, setCalories] = useState(2000);
    const handleChange =(e) =>
    {
        setCalories(e.target.value)
    }
    function getMealData ()
    {
        fetch(
            `https://api.spoonacular.com/mealplanner/generate?apiKey=9ed1a619cfbb4d05a0475bfa512efc66&timeFrame=day&targetCalories=${calories}`
        ).then((res) => res.json())
        .then(data=> 
        {
            setMealData(data)
           
        }
        )
        .catch(()=>
        {
            console.log("error");
        });
    }
  return (
    <>
    <section className='controls'>
        <input type="number" 
        placeholder='Calories (e.g 2000)' 
        onChange={handleChange}/>
               <button 
               type="submit" 
               className="col-span-2 bg-gray-800 text-white p-2 rounded shadow-md hover:bg-gray-500"
               onClick={getMealData}>Get Daily Meal Plan</button>
    </section>
    
    {mealData && <MealList mealData={mealData}></MealList>}
    </>
  )
}

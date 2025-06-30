import React, { useEffect, useState } from "react";
export default function Meal ({meal})
{ 
    const [imageUrl, setImageUrl] = useState("");
    useEffect(()=>
    {
        fetch(`https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=9ed1a619cfbb4d05a0475bfa512efc66&includeNutrition=false`)
        .then((res)=> res.json())
        .then((data)=>
        {
            setImageUrl(data.image);
            console.log(data)
        })
        .catch(()=>
        {
            console.log("error");
        })
    },[meal.id]);
    return  (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      
          <div key={meal.id} className="flex flex-col w-80 h-[450px] lg:ml-14 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <img className="w-full h-44 object-cover" src={imageUrl} alt={meal.title} />
            <div className="flex flex-col flex-grow p-4">
              <h2 className="text-lg font-semibold text-gray-800">{meal.title}</h2>
              <ul className="mt-2 text-gray-600 flex-grow">
                <li>🕒 Preparation Time: {meal.readyInMinutes} minutes</li>
                <li>🍽️ Servings: {meal.servings}</li>
              </ul>
              <a href={meal.sourceUrl} className="mt-auto inline-block text-gray-900 hover:underline font-medium">
                Go to Recipe →
              </a>
            </div>
          </div>
       
      </div>
      )

}
import React from 'react';

function MealPlanner({ title, meal, setMeal }) {
  const handleDishChange = (dish) => {
    setMeal({
      ...meal,
      dish
    });
  };

  return (
    <div className="bg-amber-50 rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-bold text-amber-800 mb-4">{title}</h3>
      
      <div className="flex flex-col">
        <label className="text-sm text-amber-700 mb-1">Menú</label>
        <input
          type="text"
          value={meal.dish}
          onChange={(e) => handleDishChange(e.target.value)}
          placeholder={`Ej: ${title === 'Comida' ? 'Paella' : 'Tortilla española'}`}
          className="border border-amber-300 rounded-md p-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default MealPlanner;

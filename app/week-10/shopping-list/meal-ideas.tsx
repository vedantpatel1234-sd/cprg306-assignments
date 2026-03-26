"use client";

import { useEffect, useState } from "react";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  if (!ingredient) return [];
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
      ingredient
    )}`
  );

  const data = await res.json();
  return data?.meals ?? [];
}

export default function MealIdeas({ ingredient }: { ingredient: string }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  async function loadMealIdeas() {
    const results = await fetchMealIdeas(ingredient);
    setMeals(results);
  }

  useEffect(() => {
    loadMealIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredient]);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        Meal Ideas {ingredient ? `for "${ingredient}"` : ""}
      </h2>

      {!ingredient && (
        <p className="mt-2 text-slate-700">
          Click an item from your shopping list to see meal ideas.
        </p>
      )}

      {ingredient && meals.length === 0 && (
        <p className="mt-2 text-slate-700">No meals found for this ingredient.</p>
      )}

      <ul className="mt-4 space-y-2">
        {meals.map((meal) => (
          <li key={meal.idMeal} className="rounded-md border border-slate-200 p-3">
            <p className="font-semibold text-slate-900">{meal.strMeal}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
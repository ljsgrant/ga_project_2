import { useState, useEffect } from 'react';
import { getCategoryContents } from '../lib/api';
import RecipeCard from './RecipeCard';

const CategoryHighlights = () => {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    getCategoryContents('Seafood')
      .then(({ data }) => {
        const selectedRecipes = data.meals.slice(0, 5);
        setRecipes(selectedRecipes);
      })
      .catch(({ response }) => console.error(response));
  }, []);

  if (recipes === null) {
    return <p>Loading content...</p>;
  }

  return (
    <div>
      {recipes.map((meal) => (
        <RecipeCard key={meal.idMeal} {...meal} />
      ))}
    </div>
  );
};

export default CategoryHighlights;

// import { Typography } from '@mui/material';
import { Grid } from '@mui/material';

import { useState, useEffect } from 'react';
import { getCategoryContents } from '../lib/api';
import RecipeCard from './RecipeCard';

const CategoryHighlights = ({ strCategory }) => {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    getCategoryContents(strCategory)
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
    <Grid container spacing={2} direction="row" alignItems="center">
      {recipes.map((recipe) => (
        <Grid item key={recipe.idMeal} xs={2.4}>
          <RecipeCard {...recipe} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryHighlights;

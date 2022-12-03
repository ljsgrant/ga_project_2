import { useState, useEffect } from 'react';
import { getCategoryContents } from '../lib/api';
import RecipeCard from './RecipeCard';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { Grid } from '@mui/material';

const RecipesInCategory = () => {
  const category = useParams();
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    getCategoryContents(String(Object.values(category)))
      .then((response) => {
        setCurrentCategory(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (currentCategory === null) {
    return <p>Loading...</p>;
  }

  console.log(currentCategory.meals);

  return (
    <>
      <Typography align="center" gutterBottom variant="h5" component="div">
        Select from the following meals:
      </Typography>
      <Grid
        container
        spacing={5}
        direction="row"
        justifyContent="center"
        alignItems="center"
        columns={13}
      >
        {currentCategory.meals.map((meal) => (
          // <p key={meal.strMeal}>{meal.strMeal}</p>
          <Grid item key={meal.strMeal} xs={2}>
            <RecipeCard
              strMeal={meal.strMeal}
              strMealThumb={meal.strMealThumb}
              idMeal={meal.idMeal}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default RecipesInCategory;

import { Grid, Paper, Typography } from '@mui/material';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getCategoryContents } from '../lib/api';
import RecipeCard from './RecipeCard';

const RecipesInCategory = () => {
  const { category } = useParams();
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    getCategoryContents(category)
      .then(({ data }) => {
        setCurrentCategory(data.meals);
      })
      .catch(({ response }) => console.error(response));
  }, [category]);

  if (currentCategory === null) {
    return <p>Loading...</p>;
  }

  return (
    <Paper elevation={8} sx={{ width: 1, padding: '15px', bgcolor: '#FAFAFA' }}>
      <Typography variant="h5" sx={{ textTransform: 'uppercase' }} gutterBottom>
        all in{' '}
        <Typography
          variant="h5"
          component="span"
          sx={{ color: '#C17171', fontWeight: 'bold' }}
        >
          {category}
        </Typography>
      </Typography>

      <Grid
        container
        spacing={1.5}
        direction="row"
        columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
      >
        {currentCategory.map((meal) => (
          <Grid item key={meal.strMeal} xs={3}>
            <RecipeCard
              strMeal={meal.strMeal}
              strMealThumb={meal.strMealThumb}
              idMeal={meal.idMeal}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default RecipesInCategory;

// import { Typography } from '@mui/material';
import { Box, Grid, Paper, Typography } from '@mui/material';

import { useState, useEffect } from 'react';
import { getCategoryContents } from '../lib/api';
import RecipeCard from './RecipeCard';

const CategoryHighlights = ({ strCategory }) => {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    getCategoryContents(strCategory)
      .then(({ data }) => {
        const selectedRecipes = data.meals.slice(0, 4);
        setRecipes(selectedRecipes);
      })
      .catch(({ response }) => console.error(response));
  }, []);

  if (recipes === null) {
    return <p>Loading content...</p>;
  }

  return (
    <Paper
      elevation={8}
      sx={{
        maxWidth: 1,
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        bgcolor: '#FAFAFA',
        p: '10px'
      }}
    >
      <Typography
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: 1,
          alignItems: 'center'
        }}
        gutterBottom
      >
        <Typography variant="h5" sx={{ textTransform: 'uppercase' }}>
          best in <strong>{strCategory}</strong>
        </Typography>
        <Typography sx={{ textTransform: 'uppercase' }}>
          Uppercase Text.
        </Typography>
      </Typography>
      <Grid container spacing={1} direction="row">
        {recipes.map((recipe) => (
          <Grid item key={recipe.idMeal} xs={3}>
            <RecipeCard {...recipe} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default CategoryHighlights;

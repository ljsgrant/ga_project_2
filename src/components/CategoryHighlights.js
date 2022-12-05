import { Button, Grid, Paper, Typography } from '@mui/material';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
          best in{' '}
          <Link to={`/categories/${strCategory}`}>
            <Typography
              variant="h5"
              component="span"
              sx={{ color: '#C17171', '&:hover': { color: 'black' } }}
            >
              <strong>{strCategory}</strong>
            </Typography>
          </Link>
        </Typography>

        <Link to={`/categories/${strCategory}`}>
          <Button
            component="p"
            sx={{
              textTransform: 'uppercase',
              color: '#C17171',
              display: { xs: 'none', sm: 'initial' }
            }}
          >
            show more...
          </Button>
        </Link>
      </Typography>
      <Grid
        container
        spacing={1.5}
        direction="row"
        columns={{ xs: 3, sm: 6, md: 12 }}
      >
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

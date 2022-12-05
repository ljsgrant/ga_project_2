import { useState, useEffect } from 'react';
import { getCategoryNames, getCategoryContents } from '../lib/api';
import RecipeCard from './RecipeCard';
import { Paper, Grid, TextField } from '@mui/material';

const Search = () => {
  const [allRecipes, setAllRecipes] = useState(null);
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    getCategoryNames()
      .then((response) => {
        const allCategories = response.data.meals.map(
          (meal) => meal.strCategory
        );
        return allCategories;
      })
      .then((allCategories) => {
        let recipes = [];
        allCategories.forEach((category) => {
          getCategoryContents(category)
            .then((response) => {
              recipes = [...recipes, ...response.data.meals];
              setAllRecipes(recipes);
            })
            .catch((err) => console.error(err));
        });
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [searchString]);

  const filterRecipes = () => {
    const regex = new RegExp(searchString, 'i');
    setSearchResults(
      allRecipes?.filter((recipe) => {
        return recipe.strMeal.match(regex);
      })
    );
  };

  const handleChange = (event) => {
    setSearchString(event.target.value);
  };

  return (
    <>
      <Paper
        elevation={8}
        sx={{ width: 1, padding: '15px', bgcolor: '#FAFAFA' }}
      >
        <TextField
          value={searchString}
          onChange={handleChange}
          fullWidth
          label="Search for a recipe here..."
          id="fullWidth"
          sx={{ mb: 2 }}
        />

        <Grid
          container
          spacing={1.5}
          direction="row"
          columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
        >
          {searchResults &&
            searchResults.map((recipe) => (
              <Grid item key={recipe.strMeal} xs={3}>
                <RecipeCard
                  strMeal={recipe.strMeal}
                  strMealThumb={recipe.strMealThumb}
                  idMeal={recipe.idMeal}
                />
              </Grid>
            ))}
        </Grid>
      </Paper>
    </>
  );
};

export default Search;

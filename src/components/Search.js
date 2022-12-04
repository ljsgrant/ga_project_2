import axios from 'axios';
import { useState, useEffect } from 'react';
import { getCategoryNames, getCategoryContents } from '../lib/api';
import TextField from '@mui/material/TextField';

const Search = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [allRecipes, setAllRecipes] = useState(null);
  const [searchString, setSearchString] = useState(null);
  const [matchingRecipes, setMatchingRecipes] = useState(null);

  useEffect(() => {
    getCategoryNames()
      .then((response) => {
        setAllCategories(response.data.meals.map((meal) => meal.strCategory));
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

    console.log(allRecipes);
  }, [searchString]);

  const handleChange = (event) => {
    console.log('dsgdsgdg');
    setSearchString(event.target.value);
  };

  if (allRecipes !== null) {
    console.log(allRecipes);
  }

  return (
    <>
      {searchString && <p>Searching for {searchString}</p>}
      <TextField
        onChange={handleChange}
        fullWidth
        label="Search for a recipe here..."
        id="fullWidth"
      />
    </>
  );
};

export default Search;

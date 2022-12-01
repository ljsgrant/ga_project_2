import axios from 'axios';

// gets strCategory only
export const getCategoryNames = () =>
  axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

// gets idCategory, strCategory, strCategoryThumb, strCategoryDescription
export const getCategoryDetails = () =>
  axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');

// gets strMeal, strMealThumb, idMeal
export const getCategoryContents = (categoryName) =>
  axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );

export const getSingleRecipe = (recipeId) =>
  axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);

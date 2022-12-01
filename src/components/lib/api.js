import axios from 'axios';

// gets strCategory only
export const CATEGORY_NAMES_URL = () =>
  axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

// gets idCategory, strCategory, strCategoryThumb, strCategoryDescription
export const CATEGORY_DETAILS_URL = () =>
  axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');

// gets strMeal, strMealThumb, idMeal
export const FILTER_BY_CATEGORY_URL = (categoryName) =>
  axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );

export const SINGLE_MEAL_URL = (mealId) =>
  axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSingleRecipe } from '../lib/api';
import Ingredients from './Ingredients';

const RecipeShow = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    getSingleRecipe(recipeId)
      .then((response) => {
        setRecipe(response.data.meals[0]);
        setIngredients(ingredientsArray(response.data.meals[0]));
      })
      .catch((err) => console.error(err));
  }, [recipeId]);

  function ingredientsArray(wholeRecipe){
    const ingredientsItems = Object.values(wholeRecipe).slice(9, 29);
    const ingredientsQuantities = Object.values(wholeRecipe).slice(29, 49);
    const combinedIngredients = [];
    for (let i = 0; i < ingredientsItems.length; i++) {
      if (ingredientsItems[i] !== '') {
        combinedIngredients.push([
          ingredientsItems[i],
          ingredientsQuantities[i]
        ]);
      }
    }
    return combinedIngredients;
  };



  if (recipe === null) {
    return <p>Loading recipe... {}</p>;
  }

  const { strMeal: name, strInstructions: method, strSource: source } = recipe;

  return (
    <>
      <p>
        RecipeShow <br /> {name} <br /> {method} <br />{' '}
      </p>
      {recipe && <Ingredients ingredients={ingredients} />}
      <p>{source} </p>
      <br />
    </>
  );
};

export default RecipeShow;

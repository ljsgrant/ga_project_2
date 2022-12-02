import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSingleRecipe } from '../lib/api';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

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

  function ingredientsArray(wholeRecipe) {
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
  }

  if (recipe === null) {
    return <p>Loading recipe... {}</p>;
  }

  const {
    strMeal: name,
    strInstructions,
    strSource: source,
    strMealThumb
  } = recipe;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          '& > :not(style)': {
            m: 1,
            mb: 0.5
            // width: '100%',
            // height: 'auto'
          }
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: '10px'
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{ textTransform: 'uppercase', fontWeight: 'bolder' }}
          >
            {name}
          </Typography>
        </Paper>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row'
          },
          '& > :not(style)': {
            m: 1
          }
        }}
      >
        <Paper
          elevation={5}
          sx={{
            backgroundImage: `url(${strMealThumb})`,
            backgroundSize: 'cover',
            m: 0,
            width: '35vw'
          }}
          alt={`an image of ${name}.`}
          src={strMealThumb}
        />
        <Paper elevation={5} sx={{ p: 5 }}>
          <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
            Ingredients
          </Typography>
          {ingredients && <Ingredients ingredients={ingredients} />}
        </Paper>
        <Paper elevation={5} sx={{ p: 5 }}>
          <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
            Method
          </Typography>
          {recipe && <Instructions strInstructions={strInstructions} />}
        </Paper>
      </Box>

      <p>{source} </p>
      <br />
    </>
  );
};

export default RecipeShow;

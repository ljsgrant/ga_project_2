import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSingleRecipe } from '../lib/api';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
      <p>{name}</p>

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
            m: 1,
            width: '100%',
            height: 'auto'
          }
        }}
      >
        <Paper
          elevation={5}
          component="img"
          sx={{
            m: 0,
            // height: 'auto',
            // width: 600,
            maxHeight: '80vh',
            maxWidth: 'auto'

            // maxHeight: { xs: 350, md: 600 }
          }}
          alt={`an image of ${name}.`}
          src={strMealThumb}
        />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 0,
              width: '500',
              height: 'auto',
              padding: '30px'
            }
          }}
        >
          <Paper elevation={5}>
            {recipe && <Instructions strInstructions={strInstructions} />}
          </Paper>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 0,
              width: '500',
              height: 'auto',
              padding: '30px'
            }
          }}
        >
          <Paper elevation={5}>
            {ingredients && <Ingredients ingredients={ingredients} />}
          </Paper>
        </Box>
      </Box>

      <p>{source} </p>
      <br />
    </>
  );
};

export default RecipeShow;

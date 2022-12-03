import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSingleRecipe } from '../lib/api';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ImageDropdown from './ImageDropdown';

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
      if (ingredientsItems[i] !== '' && ingredientsItems[i] !== null) {
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
      {/* Header */}
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
            backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2) ), url(${strMealThumb})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            height: {
              xs: '80px',
              sm: '300px',
              md: '150px',
              lg: '10px',
              xl: '10px'
            }
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

      {/* Info (source etc) */}
      <Box
        sx={{
          display: 'flex',
          '& > :not(style)': {
            m: 1,
            mb: 0.5,
            width: '100%'
            // height: 'auto'
          }
        }}
      >
        <Paper
          elevation={5}
          sx={{
            p: 1
          }}
        >
          <Typography
            variant="h7"
            component="h3"
            sx={{ mb: 0, textAlign: 'center' }}
          >
            Recipe from: {source}
          </Typography>
        </Paper>
      </Box>

      {/* Accordion */}
      <Box
        sx={{
          display: 'flex',
          '& > :not(style)': {
            m: 1,
            mb: 0.5,
            width: '100%'
            // height: 'auto'
          }
        }}
      >
        <Paper
          elevation={5}
          sx={{
            p: 0
          }}
        >
          <ImageDropdown
            strMealThumb={strMealThumb}
            ingredients={ingredients}
            strMeal={name}
            strInstructions={strInstructions}
          />
        </Paper>
      </Box>

      {/* Main content */}
      <Box
        sx={{
          display: {
            xs: 'none',
            sm: 'none',
            md: 'flex',
            lg: 'flex',
            xl: 'flex'
          },
          minHeight: '100%',
          flexDirection: {
            xs: 'column',
            sm: 'row',
            md: 'row',
            lg: 'row',
            xl: 'row'
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
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            m: 0,
            width: '45vw',
            height: '80vh',
            display: {
              xs: 'none',
              sm: 'none',
              md: 'none',
              lg: 'flex',
              xl: 'flex'
            }
          }}
          alt={`an image of ${name}.`}
        />
        <Paper elevation={5} sx={{ p: 5 }}>
          <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
            Ingredients
          </Typography>
          {ingredients && <Ingredients ingredients={ingredients} />}
        </Paper>
        <Paper
          elevation={5}
          sx={{
            p: 5,
            flexBasis: {
              xs: '80%',
              sm: '90%',
              md: '90%',
              lg: 'flex',
              xl: 'flex'
            }
          }}
        >
          <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
            Method
          </Typography>
          {recipe && <Instructions strInstructions={strInstructions} />}
        </Paper>
      </Box>
    </>
  );
};

export default RecipeShow;

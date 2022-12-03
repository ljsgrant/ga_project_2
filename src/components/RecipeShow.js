import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSingleRecipe } from '../lib/api';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ImageDropdown from './ImageDropdown';
import { Link } from 'react-router-dom';

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
      <Box
        sx={{
          width: '100%'
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            '& > :not(style)': {
              mb: 1
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
                xs: '300px',
                sm: '300px',
                md: '190px',
                lg: '90px',
                xl: '90px'
              }
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'bolder',
                fontSize: {
                  xs: '200%',
                  sm: '275%',
                  md: '350%',
                  lg: '400%',
                  xl: '400%'
                }
              }}
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
              mb: 1,
              width: '100%'
              // height: 'auto'
            }
          }}
        >
          <a href={`${source}`}>
            <Paper
              elevation={5}
              sx={{
                p: 1,
                backgroundColor: '#C17171',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#f7d2d2',
                  color: 'black'
                }
              }}
            >
              <Typography
                variant="h7"
                component="h3"
                sx={{ mb: 0, textAlign: 'center' }}
              >
                View recipe source &#8680;
              </Typography>
            </Paper>
          </a>
        </Box>

        {/* Accordion */}
        <Box
          sx={{
            display: 'flex',
            '& > :not(style)': {
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
              // m: 1
            }
          }}
        >
          <Paper
            elevation={5}
            sx={{
              backgroundImage: `url(${strMealThumb})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              mr: 1,
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
          <Paper
            elevation={5}
            sx={{
              p: 5,
              mr: 1,
              flexBasis: {
                xs: '40%',
                sm: '40%',
                md: '40%',
                lg: '40%',
                xl: '30%'
              }
            }}
          >
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
                lg: '90%',
                xl: '90%'
              }
            }}
          >
            <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
              Method
            </Typography>
            {recipe && <Instructions strInstructions={strInstructions} />}
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default RecipeShow;

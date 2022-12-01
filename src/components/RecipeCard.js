import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getSingleRecipe } from './lib/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ name, imageUrl, recipeId }) => {
  const [testRecipe, setTestRecipe] = useState(null);

  useEffect(() => {
    getSingleRecipe('52772')
      .then((response) => setTestRecipe(response.data))
      .catch((err) => console.error(err));
  }, []);

  if (testRecipe === null) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Card sx={{ maxWidth: 400, borderRadius: '5px' }}>
        <Link>
          <CardMedia
            sx={{ maxHeight: 90 }}
            component="img"
            height="140"
            image={testRecipe.meals[0].strMealThumb}
            alt="green iguana"
          />
          <CardContent sx={{ paddingBottom: 0 }}>
            <Typography gutterBottom variant="h5" component="div">
              {testRecipe.meals[0].strMeal}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <span>{testRecipe.meals[0].strCategory}</span> ·
              <span> {testRecipe.meals[0].strArea}</span> |
              <span>
                <Link size="small"> Make this recipe</Link>
              </span>
            </Typography>
          </CardContent>
          {/* <CardActions>
        </CardActions> */}
        </Link>
      </Card>
    </>
  );
};

export default RecipeCard;

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getSingleMeal } from './lib/api';
import { useState, useEffect } from 'react';

const RecipeCard = ({ name, imageUrl }) => {
  const [testMeal, setTestMeal] = useState(null);

  useEffect(() => {
    getSingleMeal('52772')
      .then((response) => setTestMeal(response.data))
      .catch((err) => console.error(err));
  }, []);

  if (testMeal === null) {
    return <p>Loading...</p>;
  }

  console.log(testMeal.meals[0].strMeal);

  return (
    <>
      <Card sx={{ maxWidth: 275 }}>
        <CardMedia
          component="img"
          height="140"
          image={testMeal.meals[0].strMealThumb}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {testMeal.meals[0].strMeal}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default RecipeCard;

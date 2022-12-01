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

  return (
    <>
      <Card sx={{ maxWidth: 400, borderRadius: '5px' }}>
        <CardMedia
          sx={{ maxHeight: 90 }}
          component="img"
          height="140"
          image={testMeal.meals[0].strMealThumb}
          alt="green iguana"
        />
        <CardContent sx={{ paddingBottom: 0 }}>
          <Typography gutterBottom variant="h5" component="div">
            {testMeal.meals[0].strMeal}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span>{testMeal.meals[0].strCategory}</span> ·{' '}
            <span>{testMeal.meals[0].strArea}</span>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Make this recipe</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default RecipeCard;

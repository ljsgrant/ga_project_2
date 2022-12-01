import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { getSingleRecipe } from './lib/api';
// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ strMeal, strMealThumb, idMeal }) => (
  <Card sx={{ maxWidth: 400, borderRadius: '5px' }}>
    <Link to={`/recipes/${idMeal}`}>
      <CardMedia
        sx={{ maxHeight: 90 }}
        component="img"
        height="140"
        image={strMealThumb}
        alt={strMeal}
      />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography gutterBottom variant="h5" component="div">
          {strMeal}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
            <span>{}</span> ·<span> {}</span> |
          </Typography> */}
      </CardContent>
      {/* <CardActions>
        </CardActions> */}
    </Link>
  </Card>
);

export default RecipeCard;

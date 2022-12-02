import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const RecipeCard = ({ strMeal, strMealThumb, idMeal }) => (
  <CardActionArea>
    <Link to={`/recipes/${idMeal}`}>
      <Card
        sx={{
          height: 210,
          maxWidth: 500,
          borderRadius: '5px',
          backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2) ), url(${strMealThumb})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '&:hover': {
            backgroundImage: `url(${strMealThumb})`
          }
        }}
      >
        <CardContent
          sx={{
            width: '80%',
            height: 1,
            paddingBottom: 0,
            color: 'white',
            textShadow: '2px 2px 5px black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography textAlign="center" variant="h5">
            {strMeal}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  </CardActionArea>
);

export default RecipeCard;

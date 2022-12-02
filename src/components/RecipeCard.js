import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const RecipeCard = ({ strMeal, strMealThumb, idMeal }) => (
  <CardActionArea>
    <Link to={`/recipes/${idMeal}`}>
      <Card
        sx={{
          height: 210,
          maxWidth: 400,
          borderRadius: '5px'
        }}
      >
        <CardMedia
          sx={{ maxHeight: 95 }}
          component="img"
          image={strMealThumb}
          alt={strMeal}
        />
        <CardContent sx={{ paddingBottom: 0 }}>
          <Typography gutterBottom variant="h6" component="div">
            {strMeal}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            <span>{}</span> ·<span> {}</span> |
          </Typography> */}
        </CardContent>
        {/* <CardActions>
        </CardActions> */}
      </Card>
    </Link>
  </CardActionArea>
);

export default RecipeCard;

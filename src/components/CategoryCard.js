import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getCategoryDetails } from './lib/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ name, imageUrl, description, id }) => {
  const [testCategory, setTestCategory] = useState(null);

  useEffect(() => {
    getCategoryDetails()
      .then((response) => setTestCategory(response.data))
      .catch((err) => console.error(err));
  }, []);

  if (testCategory === null) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Card sx={{ maxWidth: 400, borderRadius: '5px' }}>
        <Link>
          <CardMedia
            sx={{ maxHeight: 400 }}
            component="img"
            height="140"
            image={imageUrl}
            alt={`An image of a ${name.toLowerCase()} dish`}
          />
          <CardContent sx={{ paddingBottom: 0 }}>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          {/* <CardActions>
        </CardActions> */}
        </Link>
      </Card>
    </>
  );
};

export default CategoryCard;

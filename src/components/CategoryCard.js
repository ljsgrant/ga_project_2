import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getCategoryDetails } from '../lib/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardActionArea } from '@mui/material';

const CategoryCard = ({ name, imageUrl, id }) => {
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
      <CardActionArea>
        <Link to={`/categories/${name}`}>
          <Card
            sx={{
              height: 210,
              maxWidth: 500,
              borderRadius: '5px',
              backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2) ), url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '&:hover': {
                backgroundImage: `url(${imageUrl})`
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
                {name}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </CardActionArea>
      {/* <Card sx={{ maxWidth: 400, borderRadius: '5px' }}>
        <Link>
          <CardMedia
            sx={{ maxHeight: 400 }}
            component="img"
            height="140"
            image={imageUrl}
            alt={`An image of a ${name.toLowerCase()} dish`}
          />
          <CardContent sx={{ paddingBottom: 0 }}>
            <Typography
              align="center"
              gutterBottom
              variant="h5"
              component="div"
            >
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          {/* <CardActions>
        </CardActions> */}
      {/* </Link>
      </Card> */}{' '}
    </>
  );
};

export default CategoryCard;

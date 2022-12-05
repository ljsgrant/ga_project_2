import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

import { Link } from 'react-router-dom';

const CategoryCard = ({ strCategory, strCategoryThumb }) => (
  <CardActionArea>
    <Link to={`/categories/${strCategory}`}>
      <Card
        sx={{
          height: 210,
          maxWidth: 500,
          borderRadius: '5px',
          backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${strCategoryThumb})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '&:hover': {
            backgroundImage: `url(${strCategoryThumb})`
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
            {strCategory}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  </CardActionArea>
);

export default CategoryCard;

import { useState, useEffect } from 'react';
import { getCategoryDetails } from '../lib/api';
import CategoryCard from './CategoryCard';
import { Paper, Typography } from '@mui/material';

import { Grid } from '@mui/material';

const AllCategories = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getCategoryDetails()
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((err) => console.error(err));
  }, []);

  if (categories === null) {
    return <p>Loading...</p>;
  }

  return (
    <Paper elevation={8} sx={{ width: 1, padding: '15px', bgcolor: '#FAFAFA' }}>
      <Typography variant="h5" gutterBottom>
        ALL{' '}
        <Typography
          variant="h5"
          component="span"
          sx={{ color: '#C17171', fontWeight: 'bold' }}
        >
          CATEGORIES
        </Typography>
      </Typography>
      <Grid
        container
        spacing={1.5}
        direction="row"
        columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
      >
        {categories.map((category) => (
          <Grid item key={category.idCategory} xs={3}>
            <CategoryCard {...category} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default AllCategories;

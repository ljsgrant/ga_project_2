import { useState, useEffect } from 'react';
import { getCategoryDetails } from '../lib/api';
import CategoryCard from './CategoryCard';
import { Typography } from '@mui/material';

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

  console.log(categories);

  return (
    <>
      <Typography align="center" gutterBottom variant="h5" component="div">
        Select from the following categories to see dishes:
      </Typography>
      <Grid
        container
        spacing={5}
        direction="row"
        justifyContent="center"
        alignItems="center"
        columns={13}
      >
        {categories.map((category) => (
          <Grid item key={category.idCategory} xs={2}>
            <CategoryCard
              name={category.strCategory}
              imageUrl={category.strCategoryThumb}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AllCategories;

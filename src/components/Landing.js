import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCategoryNames } from '../lib/api';
import CategoryHighlights from './CategoryHighlights';

const Landing = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getCategoryNames()
      .then(({ data }) => setCategories(data.meals))
      .catch(({ response }) => console.error(response));
  }, []);

  if (categories === null) {
    return <p>Loading content...</p>;
  }

  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3}>
      {categories.map((category) => (
        <Box gridColumn="span 12" key={category.strCategory} xs={12}>
          <CategoryHighlights {...category} />
        </Box>
      ))}
    </Box>
  );
};

export default Landing;

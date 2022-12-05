import { Box } from '@mui/material';

import CategoryHighlights from './CategoryHighlights';

const Landing = ({ categories }) => (
  <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3}>
    {categories.map((category) => (
      <Box gridColumn="span 12" key={category.strCategory} xs={12}>
        <CategoryHighlights {...category} />
      </Box>
    ))}
  </Box>
);

export default Landing;

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
    <>
      {categories.map((category) => (
        <CategoryHighlights key={category.strCategory} {...category} />
      ))}
    </>
  );
};

export default Landing;

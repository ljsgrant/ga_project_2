import { useState, useEffect } from 'react';
import { getCategoryDetails } from './lib/api';
import CategoryCard from './CategoryCard';

const AllCategories = () => {
  const [testCategories, setTestCategories] = useState(null);

  useEffect(() => {
    getCategoryDetails()
      .then((response) => {
        setTestCategories(response.data.categories);
      })
      .catch((err) => console.error(err));
  }, []);

  if (testCategories === null) {
    return <p>Loading...</p>;
  }

  console.log(testCategories);

  return (
    <>
      {testCategories.map((category) => (
        <CategoryCard name={category.strCategory} imageUrl={category.strCategoryThumb} key={category.idCategory} />
      ))}
    </>
  );
};

export default AllCategories;

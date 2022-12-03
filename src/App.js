import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import RecipeCard from './components/RecipeCard';
import RecipeShow from './components/RecipeShow';
import RecipesInCategory from './components/RecipesInCategory';
import CategoryCard from './components/CategoryCard';
import AllCategories from './components/AllCategories';
import Landing from './components/Landing';
import { useState, useEffect } from 'react';
import { getCategoryNames } from './lib/api';

const App = () => {
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
    <Navigation>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing categories={categories} />} />
          <Route path="/recipe-card" element={<RecipeCard />} />
          <Route path="/category-card" element={<CategoryCard />} />
          <Route path="/recipes/:recipeId" element={<RecipeShow />} />
          <Route path="/categories/:category" element={<RecipesInCategory />} />
          <Route path="/categories" element={<AllCategories />} />
        </Routes>
      </BrowserRouter>
    </Navigation>
  );
};

export default App;

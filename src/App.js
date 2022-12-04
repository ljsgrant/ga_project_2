import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import RecipeShow from './components/RecipeShow';
import RecipesInCategory from './components/RecipesInCategory';
import AllCategories from './components/AllCategories';
import Landing from './components/Landing';
import Search from './components/Search';
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
    <BrowserRouter>
      <Navigation categories={categories}>
        <Routes>
          <Route path="/" element={<Landing categories={categories} />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipes/:recipeId" element={<RecipeShow />} />
          <Route path="/categories/:category" element={<RecipesInCategory />} />
          <Route path="/categories" element={<AllCategories />} />
          <Route
            path="/*"
            element={<p>Oooops, looks like this page doesn&apos;t exist...</p>}
          />
        </Routes>
      </Navigation>
    </BrowserRouter>
  );
};

export default App;

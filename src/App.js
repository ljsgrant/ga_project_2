import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import RecipeCard from './components/RecipeCard';
import RecipeShow from './components/RecipeShow';
import RecipesInCategory from './components/RecipesInCategory';
import CategoryCard from './components/CategoryCard';
import AllCategories from './components/AllCategories';
import Landing from './components/Landing';

const App = () => {
  return (
    <Navigation>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
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

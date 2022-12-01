import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import RecipeCard from './components/RecipeCard';
import RecipeShow from './components/RecipeShow';
import RecipesInCategory from './components/RecipesInCategory';
import CategoryCard from './components/CategoryCard';
import AllCategories from './components/AllCategories';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/recipe-card" element={<RecipeCard />} />
        <Route path="/category-card" element={<CategoryCard />} />
        <Route
          path="/categories/:category/:recipeId"
          element={<RecipeShow />}
        />
        <Route path="/categories/:category" element={<RecipesInCategory />} />
        <Route path="/categories" element={<AllCategories />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import RecipeCard from './components/RecipeCard';
import RecipeShow from './components/RecipeShow';
import Category from './components/Category';
import CategoryCard from './components/CategoryCard';
import Categogies from './components/Categories';

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
        <Route path="/categories/:category" element={<Category />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

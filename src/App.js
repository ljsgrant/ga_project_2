import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipeCard from './components/RecipeCard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe-card" element={<RecipeCard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

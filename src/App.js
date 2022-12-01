import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import RecipeCard from './components/RecipeCard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/recipe-card" element={<RecipeCard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

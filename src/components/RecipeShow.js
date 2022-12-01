import { useParams } from 'react-router-dom';

const RecipeShow = () => {
  const { category, id } = useParams();

  return <p>RecipeShow</p>;
};

export default RecipeShow;

import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const ingredientData = useSelector((state) =>
    state.ingredients.ingredients.find((item) => item._id === id)
  );

  if (!id) {
    return <div>Error: Ingredient ID is missing.</div>; // Обработка отсутствия id
  }

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
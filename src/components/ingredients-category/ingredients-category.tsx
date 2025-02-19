import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const burgerConstructor = useSelector((state) => state.constructorSlice);

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients: constructorIngredients } = burgerConstructor;

    // Подсчет ингредиентов с использованием reduce
    const counters = constructorIngredients.reduce<{ [key: string]: number }>(
      (acc, ingredient: TIngredient) => {
        acc[ingredient._id] = (acc[ingredient._id] || 0) + 1;
        return acc;
      },
      {}
    );

    if (bun) counters[bun._id] = 2; // Учитываем бун в счетчике
    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});

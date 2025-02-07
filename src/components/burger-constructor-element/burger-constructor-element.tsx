import { FC, memo, useCallback } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from 'react-redux';
import {
  removeIngredient,
  moveIngredient
} from '../../services/slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const onMoveDown = useCallback(() => {
      if (index < totalItems - 1) { 
        dispatch(moveIngredient({ fromIndex: index, toIndex: index + 1 }));
      }
    }, [dispatch, index, totalItems]);

    const onMoveUp = useCallback(() => {
      if (index > 0) { 
        dispatch(moveIngredient({ fromIndex: index, toIndex: index - 1 }));
      }
    }, [dispatch, index]);

    const onRemoveIngredient = useCallback(() => {
      dispatch(removeIngredient(ingredient.id));
    }, [dispatch, index]);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={onMoveUp}
        handleMoveDown={onMoveDown}
        handleClose={onRemoveIngredient}
      />
    );
  }
);

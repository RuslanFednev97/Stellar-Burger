import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { TIngredient, TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useSelector } from '../../services/store';

export const BurgerIngredients: FC = () => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  // Группировка ингредиентов по типу
  const { buns, mains, sauces } = ingredients.reduce<{
    buns: TIngredient[];
    mains: TIngredient[];
    sauces: TIngredient[];
  }>(
    (acc, item) => {
      if (item.type === 'bun') acc.buns.push(item);
      if (item.type === 'main') acc.mains.push(item);
      if (item.type === 'sauce') acc.sauces.push(item);
      return acc;
    },
    { buns: [], mains: [], sauces: [] }
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, isBunsInView] = useInView({ threshold: 0 });
  const [mainsRef, isMainsInView] = useInView({ threshold: 0 });
  const [saucesRef, isSaucesInView] = useInView({ threshold: 0 });

  useEffect(() => {
    if (isBunsInView) {
      setCurrentTab('bun');
    } else if (isSaucesInView) {
      setCurrentTab('sauce');
    } else if (isMainsInView) {
      setCurrentTab('main');
    }
  }, [isBunsInView, isMainsInView, isSaucesInView]);

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={handleTabClick}
    />
  );
};

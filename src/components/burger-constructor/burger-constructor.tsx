import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useDispatch } from '../../services/store';
import { clearOrders, createOrderThunk } from '../../services/slices/ordersSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bun, ingredients } = useSelector((state) => state.constructorSlice);
  const orderRequest = useSelector((state) => state.order.isOrderRequesting);
  const orderModalData = useSelector((state) => state.order.currentOrder);

  const handleOrderClick = () => {
    if (!bun || orderRequest) return;

    const accessToken = getCookie('accessToken');
    if (accessToken) {
      const ingredientsIds = [
        bun?._id || '',
        ...ingredients.map((item) => item.id),
        bun?._id || ''
      ];
      dispatch(createOrderThunk(ingredientsIds));
    } else {
      return navigate('/login', { state: { form: '/' } });
    }
  };

  const handleCloseOrderModal = () => {
    dispatch(clearOrders());
    dispatch(clearConstructor());
    navigate(-1);
  };

  const calculatePrice = (bun: TIngredient | null, ingredients: TIngredient[]): number => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce((s: number, v: TIngredient) => s + v.price, 0);
    return bunPrice + ingredientsPrice;
  };

  const price = useMemo(() => calculatePrice(bun, ingredients), [bun, ingredients]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
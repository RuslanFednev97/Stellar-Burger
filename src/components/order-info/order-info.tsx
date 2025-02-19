import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import { fetchOrderByNumberThunk } from '../../services/slices/ordersSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const { number } = useParams<{ number: string }>();

  const orderData = useSelector((state) => {
    const orderFromFeed = state.feed.orders.find(
      (item) => item.number === Number(number)
    );
    if (orderFromFeed) return orderFromFeed;

    const orderFromOrderSlice = state.order.orders?.find(
      (item) => item.number === Number(number)
    );
    if (orderFromOrderSlice) return orderFromOrderSlice;

    return state.order.selectedOrder?.number === Number(number)
      ? state.order.selectedOrder
      : null;
  });

  useEffect(() => {
    if (!orderData) {
      dispatch(fetchOrderByNumberThunk(Number(number)));
    }
  }, [dispatch, orderData, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);
    const ingredientsInfo = orderData.ingredients.reduce<{
      [key: string]: TIngredient & { count: number };
    }>((acc, item) => {
      const ingredient = ingredients.find((ing) => ing._id === item);
      if (ingredient) {
        acc[item] = acc[item]
          ? { ...acc[item], count: acc[item].count + 1 }
          : { ...ingredient, count: 1 };
      }
      return acc;
    }, {});

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};

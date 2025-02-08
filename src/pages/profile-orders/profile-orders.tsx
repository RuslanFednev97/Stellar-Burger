import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { fetchOrdersThunk } from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, []);

  const orders: TOrder[] = useSelector((state) => state.order.orders) || [];

  return <ProfileOrdersUI orders={orders} />;
};

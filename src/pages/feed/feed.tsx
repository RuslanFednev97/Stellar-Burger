import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { clearOrders, fetchFeedsThunk } from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.feed.orders);

  if (!orders.length) {
    return <Preloader />;
  }

  function updateOrders() {
    dispatch(clearOrders());
    dispatch(fetchFeedsThunk());
  }
  return <FeedUI orders={orders} handleGetFeeds={updateOrders} />;
};

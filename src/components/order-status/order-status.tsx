import React, { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

const statusText: { [key: string]: string } = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан'
};

const statusStyles: { [key: string]: string } = {
  pending: '#E52B1A',
  done: '#00CCCC',
  created: '#F2F2F3' // Добавлено значение по умолчанию
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  const textStyle = statusStyles[status] || statusStyles.created; // Используем значение по умолчанию

  return (
    <OrderStatusUI
      textStyle={textStyle}
      text={statusText[status] || 'Неизвестный статус'}
    />
  );
};

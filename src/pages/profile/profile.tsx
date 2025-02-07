import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { updateUser } from '../../services/slices/userSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();

  // Получаем пользователя из стора
  const user = useSelector((state) => state.user.user);

  // Инициализация состояния с учётом данных пользователя из стора
  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    // Если пользователь обновился, обновляем состояние формы
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  // Отправка формы
  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(updateUser(formValue));
    },
    [dispatch, formValue]
  );

  // Отмена изменений и возврат к первоначальным данным
  const handleCancel = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      setFormValue({
        name: user?.name || '',
        email: user?.email || '',
        password: ''
      });
    },
    [user]
  );

  // Обработчик изменения полей формы
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValue((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    },
    []
  );

  // Отображение компонента, если данные пользователя загружены
  if (!user) return null;

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};


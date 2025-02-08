import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { registerUser } from '../../services/slices/userSlice';
import { TRegisterData } from '../../utils/burger-api';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !name || !password) return; // Проверка на заполненность

    const registerData: TRegisterData = { name, email, password };
    dispatch(registerUser(registerData));
  };

  return (
    <RegisterUI
      errorText=''
      userName={name}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setName}
      handleSubmit={handleSubmit}
    />
  );
};

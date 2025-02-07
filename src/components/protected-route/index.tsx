import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};
export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const user = useSelector((state) => state.user.user); 
  const location = useLocation();
  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }
  return children;
};
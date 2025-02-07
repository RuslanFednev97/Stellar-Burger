import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'; 
import { AppHeader, OrderInfo, Modal, IngredientDetails } from '@components'; 
import { ProtectedRoute } from '../protected-route'; 
import { useDispatch } from '../../services/store'; 
import { useEffect } from 'react'; 
import { fetchIngredientsThunk } from '../../services/slices/ingredientsSlice'; 
import { fetchFeedsThunk } from '../../services/slices/feedsSlice'; 
import { fetchUser } from '../../services/slices/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state && location.state.background;

  useEffect(() => {
    dispatch(fetchIngredientsThunk());
    dispatch(fetchFeedsThunk());
    dispatch(fetchUser());
  }, [dispatch]);

  const handleCloseModal = (): void => {
    navigate(-1);
  };

  const routes = [
    { path: '/', element: <ConstructorPage /> },
    { path: '/feed', element: <Feed /> },
    { path: '/login', element: <ProtectedRoute onlyUnAuth><Login /></ProtectedRoute> },
    { path: '/register', element: <ProtectedRoute onlyUnAuth><Register /></ProtectedRoute> },
    { path: '/forgot-password', element: <ProtectedRoute onlyUnAuth><ForgotPassword /></ProtectedRoute> },
    { path: '/reset-password', element: <ProtectedRoute onlyUnAuth><ResetPassword /></ProtectedRoute> },
    { path: '/profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
    { path: '/profile/orders', element: <ProtectedRoute><ProfileOrders /></ProtectedRoute> },
    { path: '*', element: <NotFound404 /> },
    { path: '/feed/:number', element: <OrderInfo /> },
    { path: '/ingredients/:id', element: <IngredientDetails /> },
    { path: '/profile/orders/:number', element: <ProtectedRoute><OrderInfo /></ProtectedRoute> },
  ];

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={''} onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title={''} onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title={''} onClose={handleCloseModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
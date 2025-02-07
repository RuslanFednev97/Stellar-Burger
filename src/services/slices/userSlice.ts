import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TRegisterData, TLoginData } from '../../utils/burger-api';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../../utils/cookie';

interface TUserState {
  user: TUser | null;
  isAuthChecked: boolean;
  requestStatus: boolean;
  loginUserError: string | null | undefined;
}

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  requestStatus: false,
  loginUserError: null
};

export const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    return await getUserApi(); 
  } catch (error) {
    console.error(error);
    throw error; 
  }
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData, thunkAPI) => {
    try {
      const response = await registerUserApi({ email, name, password });
      console.log('registerUser response:', response);
      
      if (!response.success) {
        return thunkAPI.rejectWithValue(response);
      }

      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      
      return response;
    } catch (error) {
      console.error('registerUser error:', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData, thunkAPI) => {
    const response = await loginUserApi({ email, password });
    if (!response.success) {
      return thunkAPI.rejectWithValue(response);
    }
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await getUserApi();
      if (!response.success) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      console.error('fetchUser error:', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: TRegisterData, thunkAPI) => {
    const response = await updateUserApi(user);
    if (!response.success) {
      return thunkAPI.rejectWithValue(response);
    }
    return response;
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    const response = await logoutApi();
    if (!response.success) {
      return thunkAPI.rejectWithValue(response);
    }
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
    return response;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    const handlePending = (state: TUserState) => {
      state.requestStatus = true;
      state.loginUserError = null;
    };

    const handleRejected = (state: TUserState, action: any) => {
      state.requestStatus = false;
      state.isAuthChecked = true;
      state.loginUserError = action.error.message;
    };

    const handleFulfilled = (state: TUserState, action: any) => {
      state.user = action.payload.user;
      state.isAuthChecked = true;
      state.requestStatus = false;
    };

    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(loginUser.fulfilled, handleFulfilled)
      .addCase(fetchUser.pending, handlePending)
      .addCase(fetchUser.rejected, handleRejected)
      .addCase(fetchUser.fulfilled, handleFulfilled)
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(registerUser.fulfilled, handleFulfilled)
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.rejected, handleRejected)
      .addCase(updateUser.fulfilled, handleFulfilled)
      .addCase(logout.pending, handlePending)
      .addCase(logout.rejected, handleRejected)
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
  selectors: {
    selectUser: (sliceState) => sliceState.user,
    selectIsAuthChecked: (sliceState) => sliceState.isAuthChecked,
    selectRequestStatus: (sliceState) => sliceState.requestStatus,
    selectLoginUserError: (sliceState) => sliceState.loginUserError
  }
});

export const { setAuthChecked, setUser } = userSlice.actions;
export const { selectUser, selectIsAuthChecked, selectRequestStatus, selectLoginUserError } = userSlice.selectors;
export default userSlice.reducer;
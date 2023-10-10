import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
 status:'loading',
 isAuthenticated: boolean;
 user: {
  name: string;
  email: string;
 } | null;
}

const initialState: AuthState = {
 status:'loading',
 isAuthenticated: false,
 user: null,
};

const authSlice = createSlice({
 name: 'auth',
 initialState,
 reducers: {
  login(state, action: PayloadAction<{ name: string; email: string }>) {
   state.isAuthenticated = true;
   state.user = action.payload;
  },
  logout(state) {
   state.isAuthenticated = false;
   state.user = null;
  },
 },
});


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

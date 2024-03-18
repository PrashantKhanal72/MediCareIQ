import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        isAuthenticated: false,
        role: null,
        userId: null
}

const authSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {
                setLogin: (state, action) => {
                    state.isAuthenticated = true;
                    state.role = action.payload.role;
                    state.userId = action.payload.userId;
                },
                setLogout: (state) => {
                        state.isAuthenticated = false;
                        state.role = null;
                        state.userId = null;
                }
        }
})

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;

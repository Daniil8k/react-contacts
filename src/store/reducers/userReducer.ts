import { IAuthPayload, IAuthResponse, login, register } from "@/api/authAPI";
import { IUser } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const accessToken = localStorage.getItem("accessToken")
	? localStorage.getItem("accessToken")
	: null;

const user = localStorage.getItem("user") ? localStorage.getItem("user") : null;

interface IState {
	user: IUser;
	accessToken: string | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string;
}

const initialState: IState = {
	user: user ? JSON.parse(user) : {},
	accessToken,
	isAuthenticated: !!accessToken,
	loading: false,
	error: ""
};

export const loginUser = createAsyncThunk(
	"user/login",
	async (payload: IAuthPayload, thunkAPI) => {
		try {
			return await login(payload);
		} catch (error) {
			let message = axios.isAxiosError(error)
				? error.response?.data || error.message || error.toString()
				: error;

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const registerUser = createAsyncThunk(
	"user/register",
	async (payload: IAuthPayload, thunkAPI) => {
		try {
			return await register(payload);
		} catch (error) {
			let message = axios.isAxiosError(error)
				? error.response?.data || error.message || error.toString()
				: error;

			return thunkAPI.rejectWithValue(message);
		}
	}
);

const onPending = (state: IState) => {
	state.loading = true;
	state.error = "";
};

const onRejected = (state: IState, action: PayloadAction<string>) => {
	state.user.id = null;
	state.user.email = "";
	state.accessToken = null;
	state.loading = false;
	state.error = action.payload;

	localStorage.removeItem("accessToken");
	localStorage.removeItem("user");
};

const onFulfilled = (state: IState, action: PayloadAction<IAuthResponse>) => {
	state.user = action.payload?.user;
	state.accessToken = action.payload?.accessToken;
	state.isAuthenticated = true;
	state.loading = false;
	state.error = "";

	localStorage.setItem("accessToken", state.accessToken);
	localStorage.setItem("user", JSON.stringify(state.user));
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: (state) => {
			state.user.id = null;
			state.user.email = "";
			state.isAuthenticated = false;
			state.accessToken = null;
			state.loading = false;
			state.error = "";

			localStorage.removeItem("accessToken");
			localStorage.removeItem("user");
		}
	},
	extraReducers: {
		[loginUser.pending.type]: onPending,
		[loginUser.rejected.type]: onRejected,
		[loginUser.fulfilled.type]: onFulfilled,
		[registerUser.pending.type]: onPending,
		[registerUser.rejected.type]: onRejected,
		[registerUser.fulfilled.type]: onFulfilled
	}
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

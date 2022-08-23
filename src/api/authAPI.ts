import axios from "axios";

export interface IAuthPayload {
	email: string;
	password: string;
}

export interface IAuthResponse {
	accessToken: string;
	user: {
		id: string;
		email: string;
	};
}

export const login = async (payload: IAuthPayload) => {
	const response = await axios.post<IAuthResponse>(
		import.meta.env.VITE_API_BASE_URL + "/login",
		payload
	);

	return response.data;
};

export const register = async (payload: IAuthPayload) => {
	const response = await axios.post<IAuthResponse>(
		import.meta.env.VITE_API_BASE_URL + "/register",
		payload
	);

	return response.data;
};

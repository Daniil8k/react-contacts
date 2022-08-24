import baseAxios from "@/api/helpers/baseAxios";
import { IUser } from "@/types/types";

export interface IAuthPayload {
	email: string;
	password: string;
}

export interface IAuthResponse {
	accessToken: string;
	user: IUser;
}

const login = async (payload: IAuthPayload) => {
	const response = await baseAxios.post<IAuthResponse>("/login", payload);

	return response.data;
};

const register = async (payload: IAuthPayload) => {
	const response = await baseAxios.post<IAuthResponse>("/register", payload);

	return response.data;
};

export default { login, register };

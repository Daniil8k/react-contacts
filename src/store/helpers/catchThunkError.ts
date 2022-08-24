import axios from "axios";

export default function catchThunkError(
	error: unknown,
	rejectWithValue: (msg: unknown) => void
) {
	let message = axios.isAxiosError(error)
		? error.response?.data || error.message || error.toString()
		: error;

	return rejectWithValue(message);
}

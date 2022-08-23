import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser, registerUser } from "@/store/reducers/userReducer";

export interface IAuthForm {
	email: string;
	password: string;
}

const AuthPage: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isAuthenticated, error } = useAppSelector((state) => state.user);
	const { register, handleSubmit } = useForm<IAuthForm>();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
	}, []);

	const onLogin = async (data: IAuthForm) => {
		let res = await dispatch(loginUser(data));

		if (
			res.meta.requestStatus === "rejected" &&
			res.payload !== "Incorrect password"
		) {
			res = await dispatch(registerUser(data));
		}

		if (res.meta.requestStatus === "fulfilled") {
			navigate("/");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div>
				<form className="flex flex-col gap-2" onSubmit={handleSubmit(onLogin)}>
					<input {...register("email")} required />
					<input {...register("password")} required />
					<input
						className="rounded-md p-1 border-black border-2"
						type="submit"
						value="Login / Register"
					/>
				</form>
				{!!error && <div>{error}</div>}
			</div>
		</div>
	);
};

export default AuthPage;

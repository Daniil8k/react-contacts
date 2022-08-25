import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser, registerUser } from "@/store/reducers/userReducer";
import Button from "@/components/ui/Button";

export interface IAuthForm {
	email: string;
	password: string;
}

const AuthPage: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isAuthenticated, error, loading } = useAppSelector((state) => state.user);
	const { register, handleSubmit } = useForm<IAuthForm>();
	const [isRegister, setIsRegister] = useState(false);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
	}, []);

	const toggleRegister = () => {
		setIsRegister((value) => !value);
	};

	const onLogin = async (data: IAuthForm) => {
		let res = await dispatch(isRegister ? registerUser(data) : loginUser(data));

		if (res.meta.requestStatus === "fulfilled") {
			navigate("/");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="w-64">
				<h2 className="text-lg">{isRegister ? "Sign up" : "Sign in"}</h2>
				<div
					style={{ opacity: !!error ? 1 : 0 }}
					className="min-h-[1.25rem] text-sm font-medium text-danger mb-1"
				>
					{error}
				</div>
				<form className="flex flex-col mb-1" onSubmit={handleSubmit(onLogin)}>
					<div className="text-left mb-2">
						<label htmlFor="email" className="label mb-2">
							Your email
						</label>
						<input
							id="email"
							type="email"
							className="input-auth"
							placeholder="name@company.com"
							{...register("email")}
							required
						/>
					</div>
					<div className="text-left mb-6">
						<label htmlFor="password" className="label mb-2">
							Your password
						</label>
						<input
							id="password"
							type="password"
							className="input-auth"
							placeholder="••••"
							{...register("password")}
							required
						/>
					</div>
					<Button
						className="focus:ring-1 focus:outline-none focus:ring-blue-300"
						loading={loading}
						disabled={loading}
						type="submit"
					>
						{isRegister ? "Register" : "Login"}
					</Button>
				</form>
				<div className="flex px-1 justify-between text-sm font-medium text-neutral-light">
					<span>
						{isRegister ? "Already have an account?" : "Not registered?"}
					</span>
					<button
						onClick={toggleRegister}
						className="text-primary-dark hover:underline"
					>
						{isRegister ? "Sign in" : "Sign up"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;

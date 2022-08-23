import { FC, useEffect, useState } from "react";
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
					className="min-h-[1.25rem] text-sm font-medium text-red-400 mb-1"
				>
					{error}
				</div>
				<form className="flex flex-col" onSubmit={handleSubmit(onLogin)}>
					<div className="text-left mb-2">
						<label
							htmlFor="email"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Your email
						</label>
						<input
							id="email"
							type="email"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							placeholder="name@company.com"
							{...register("email")}
							required
						/>
					</div>
					<div className="text-left mb-6">
						<label
							htmlFor="password"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Your password
						</label>
						<input
							id="password"
							type="password"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							placeholder="••••"
							{...register("password")}
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full mb-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						{isRegister ? "Register" : "Login"}
					</button>
				</form>
				<div className="flex px-1 justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
					<span>
						{isRegister ? "Already have an account?" : "Not registered?"}
					</span>
					<button
						onClick={toggleRegister}
						className="text-blue-700 hover:underline dark:text-blue-500"
					>
						{isRegister ? "Sign in" : "Sign up"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;

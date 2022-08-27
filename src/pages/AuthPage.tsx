import { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser, registerUser } from "@/store/reducers/userReducer";
import Button from "@/components/ui/Button";
import useFade from "@/hooks/useFade";
import TextButton from "@/components/ui/TextButton";
import Input from "@/components/ui/Input";

export interface IAuthForm {
	email: string;
	password: string;
	confirm_password: string;
}

const AuthPage: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isAuthenticated, error, loading } = useAppSelector(
		(state) => state.user
	);
	const {
		register,
		handleSubmit,
		setFocus,
		watch,
		reset,
		formState: { errors: formErrors }
	} = useForm<IAuthForm>();
	const [isRegister, setIsRegister] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const [startFadeAnimation, isFade] = useFade(contentRef);
	const registerOptions = {
		email: {
			required: "Required",
			pattern: {
				value: /.+@.+/,
				message: "Email is not valid"
			}
		},
		password: {
			required: "Required",
			minLength: {
				value: 4,
				message: "At least 4 characters"
			}
		},
		confirmPassword: {
			required: "Required",
			validate: (value: string) => {
				if (watch("password") != value) {
					return "Mismatch";
				}
			}
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
	}, []);

	useEffect(() => {
		setFocus && setFocus("email");
	}, [setFocus, isFade]);

	const toggleRegister = () => {
		if (isFade) return;

		reset(undefined, {
			keepValues: true
		});
		startFadeAnimation();
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
			<div ref={contentRef} className="w-64">
				<h2 className="text-lg">{isRegister ? "Sign up" : "Sign in"}</h2>
				<div
					style={{ opacity: error ? 1 : 0 }}
					className="min-h-[1.25rem] text-sm font-medium text-danger mb-1"
				>
					{error}
				</div>
				<form className="flex flex-col mb-1" onSubmit={handleSubmit(onLogin)}>
					<Input
						id="email"
						className="mb-2"
						placeholder="name@company.com"
						label="Email"
						error={formErrors.email?.message}
						{...register("email", registerOptions.email)}
					/>
					<Input
						id="password"
						type="password"
						className="mb-2"
						placeholder="••••"
						label="Password"
						error={formErrors.password?.message}
						{...register("password", registerOptions.password)}
					/>
					{isRegister && (
						<Input
							id="confirm_password"
							type="password"
							className="mb-2"
							placeholder="••••"
							label="Confirm password"
							error={formErrors.confirm_password?.message}
							{...register("confirm_password", registerOptions.confirmPassword)}
						/>
					)}
					<Button
						className="mt-6 focus:ring-1 focus:outline-none focus:ring-blue-300"
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
					<TextButton onClick={toggleRegister} disabled={isFade}>
						{isRegister ? "Sign in" : "Sign up"}
					</TextButton>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;

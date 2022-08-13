import { FC } from "react";
import { useAppDispatch } from "@/store";
import { login } from "@/store/reducers/userReducer";
import { useNavigate } from "react-router-dom";

const AuthPage: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onLogin = () => {
		dispatch(login());
		navigate("/");
	};

	return (
		<div>
			<h1>Auth</h1>
			<button onClick={onLogin}>Log in</button>
		</div>
	);
};

export default AuthPage;

import { FC, memo } from "react";
import { useAppDispatch } from "@/store";
import { logout } from "@/store/reducers/userReducer";
import { Link, useNavigate } from "react-router-dom";

const Nav: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onExit = () => {
		dispatch(logout());
		navigate("/auth");
	};

	return (
		<nav className="flex gap-2">
			<Link to={"/"}>Contacts</Link>
			<button onClick={onExit}>Exit</button>
		</nav>
	);
};

export default memo(Nav);

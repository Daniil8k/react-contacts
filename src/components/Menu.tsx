import { FC } from "react";
import { useAppDispatch } from "@/store";
import { logout } from "@/store/reducers/userReducer";
import { Link, useNavigate } from "react-router-dom";

const Menu: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onExit = () => {
		dispatch(logout());
		navigate("/auth");
	};

	return (
		<nav className="flex flex-colo gap-2">
			<Link to={"/"}>Contacts</Link>
			<button onClick={onExit}>Exit</button>
		</nav>
	);
};

export default Menu;

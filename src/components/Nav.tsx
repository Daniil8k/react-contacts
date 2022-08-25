import { FC, memo } from "react";
import { useAppDispatch } from "@/store";
import { logout } from "@/store/reducers/userReducer";
import { useNavigate } from "react-router-dom";
import IconButton from "./ui/IconButton";

const Nav: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onExit = () => {
		dispatch(logout());
		navigate("/auth");
	};

	return (
		<nav className="flex gap-2">
			{/* <Link to={"/"}>Contacts</Link> */}
			<IconButton name="logout" color="var(--color-danger)" onClick={onExit} />
		</nav>
	);
};

export default memo(Nav);

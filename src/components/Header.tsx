import { useAppSelector } from "@/store";
import { FC, memo } from "react";
import Nav from "./Nav";

export const Header: FC = () => {
	const { user } = useAppSelector((state) => state.user);

	return (
		<div className="flex items-center justify-between py-1 px-4 mx-4 bg-background-light rounded-bl-xl rounded-br-xl">
			<div>{user?.email}</div>
			<Nav />
		</div>
	);
};

export default memo(Header);

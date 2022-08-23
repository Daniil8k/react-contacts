import { useAppSelector } from "@/store";
import { FC, memo } from "react";
import Nav from "./Nav";

export const Header: FC = () => {
	const { user } = useAppSelector((state) => state.user);

	return (
		<div className="flex items-center justify-between p-2">
			<div>{user?.email}</div>
			<Nav />
		</div>
	);
};

export default memo(Header);

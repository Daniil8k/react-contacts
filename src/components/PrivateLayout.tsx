import { FC } from "react";
import { useAppSelector } from "@/store";
import { Navigate, useOutlet } from "react-router-dom";
import Menu from "./Menu";

const PrivateLayout: FC = () => {
	const { isAuthenticated } = useAppSelector((state) => state.user);
	const outlet = useOutlet();

	if (!isAuthenticated) {
		return <Navigate to="/auth" />;
	}

	return (
		<div>
			<Menu />
			{outlet}
		</div>
	);
};

export default PrivateLayout;

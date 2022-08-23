import { FC } from "react";
import { useAppSelector } from "@/store";
import { Navigate, useOutlet } from "react-router-dom";
import Header from "./Header";

const PrivateLayout: FC = () => {
	const { isAuthenticated } = useAppSelector((state) => state.user);
	const outlet = useOutlet();

	if (!isAuthenticated) {
		return <Navigate to="/auth" />;
	}

	return (
		<div className="min-h-screen">
			<Header />
			{outlet}
		</div>
	);
};

export default PrivateLayout;

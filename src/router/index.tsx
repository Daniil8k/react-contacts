import { Route, Routes } from "react-router-dom";
import AuthPage from "@/pages/AuthPage";
import PrivateLayout from "@/components/PrivateLayout";
import ContactsPage from "@/pages/ContactsPage";

export default function Router() {
	return (
		<Routes>
			<Route path="/auth" element={<AuthPage />} />
			<Route path="/" element={<PrivateLayout />}>
				<Route path="/" element={<ContactsPage />} />
			</Route>
		</Routes>
	);
}

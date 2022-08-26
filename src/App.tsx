import EditModal from "./components/EditModal";
import Router from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<Router />
			<EditModal />
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				pauseOnHover
				theme="dark"
				bodyStyle={{ textAlign: "left" }}
			/>
		</>
	);
}

export default App;

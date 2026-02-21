import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div className="bg-black min-h-screen text-white flex">
			<Sidebar />
			<main className="p-6 w-full">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;

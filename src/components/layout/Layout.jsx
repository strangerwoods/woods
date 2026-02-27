import { useState } from "react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
	const [open, setOpen] = useState(false);
	const toggle = () => setOpen((v) => !v);
	const close = () => setOpen(false);

	return (
		<div className="bg-neutral-950 min-h-screen text-stone-50">
			<div className="md:hidden p-2">
				<button
					onClick={toggle}
					aria-expanded={open}
					className="px-3 py-2 bg-gray-800 rounded"
				>
					☰
				</button>
			</div>

			{open && <div onClick={close} className="fixed inset-0 bg-black/50 z-40 md:hidden" />}

			<div className="flex">
				<Sidebar open={open} onClose={close} />
				<main className="p-6 w-full">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Layout;

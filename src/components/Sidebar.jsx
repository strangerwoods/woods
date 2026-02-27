import { NavLink } from "react-router-dom";
import { listPosts } from "../lib/posts";

const Sidebar = ({ open = false, onClose = () => { } }) => {
	const posts = listPosts();
	const grouped = posts.reduce((acc, p) => {
		const month = `${p.year}-${p.month}`; // YYYY-MM
		acc[month] = acc[month] || [];
		acc[month].push(p);
		return acc;
	}, {});

	const months = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

	const mobileClasses = open ? "translate-x-0" : "-translate-x-full";

	return (
		<aside
			className={`fixed inset-y-0 left-0 w-80 transform transition-transform duration-200 z-50 md:static md:translate-x-0 ${mobileClasses} p-8 `}
		>
			<div className="md:hidden mb-4 flex justify-between items-center">
				<h2 className="text-xl font-bold">Dates</h2>
				<button
					onClick={onClose}
					aria-label="Close sidebar"
					className="px-2 py-1 bg-gray-800 rounded"
				>
					✕
				</button>
			</div>

			<div className="hidden md:block">
				<h2 className="text-xl font-bold mb-4">Dates</h2>
			</div>

			{months.map((month) => (
				<div key={month} className="mb-4">
					<div className="uppercase text-gray-400 text-xl mb-4">{month}</div>
					<ul className="list-none pl-2">
						{grouped[month].map((post) => (
							<li key={post.id} className="mb-1">
								<NavLink
									onClick={onClose}
									end
									to={`/posts/${post.year}/${post.month}/${post.id}`}
									className={({ isActive }) =>
										`w-full block px-1 py-0.5 transition-colors duration-150 hover:underline ${isActive
											? "bg-white text-black"
											: "text-white hover:bg-white hover:text-black"
										}`
									}
								>
									{post.title}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			))}
		</aside>
	);
};

export default Sidebar;

import { Link } from "react-router-dom";
import { listPosts } from "../lib/posts";

const Sidebar = ({ open = false, onClose = () => {} }) => {
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
			className={`fixed inset-y-0 left-0 w-64 transform transition-transform duration-200 z-50 md:static md:translate-x-0 ${mobileClasses} bg-black p-4 border-r border-gray-800`}
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
					<div className="text-sm uppercase text-gray-400 mb-1">{month}</div>
					<ul className="list-none pl-0">
						{grouped[month].map((post) => (
							<li key={post.id} className="mb-1">
								<Link
									onClick={onClose}
									to={`/posts/${post.year}/${post.month}/${post.day}`}
									className="text-white hover:underline"
								>
									{post.title}
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
		</aside>
	);
};

export default Sidebar;

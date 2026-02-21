import { Link } from "react-router-dom";
import { listPosts } from '../lib/posts';

const Sidebar = () => {
	const posts = listPosts();
	const grouped = posts.reduce((acc, p) => {
		const month = `${p.year}-${p.month}`; // YYYY-MM
		acc[month] = acc[month] || [];
		acc[month].push(p);
		return acc;
	}, {});

	const months = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

	return (
		<aside className="w-64 p-4 border-r border-gray-800">
			<h2 className="text-xl font-bold mb-4">Dates</h2>
			{months.map((month) => (
				<div key={month} className="mb-4">
					<div className="text-sm uppercase text-gray-400 mb-1">{month}</div>
					<ul className="list-none pl-0">
						{grouped[month].map(post => (
							<li key={post.id} className='mb-1'>
								<Link to={`/posts/${post.year}/${post.month}/${post.day}`} className='text-white hover:underline'>
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

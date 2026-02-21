import { useParams } from 'react-router-dom';
import { getPost } from '../lib/posts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Post = () => {
	const { year, month, day } = useParams();
	const post = getPost(year, month, day);

	if (!post) return <div>Post not found.</div>;

	return (
		<article>
			<h1 className='text-2xl font-bold mb-2'>{post.title}</h1>
			<div className='text-sm text-gray-400 mb-4'>{`${post.year}-${post.month}-${post.day}`}</div>
			<div className='prose prose-invert'>
				<ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
			</div>
		</article>
	);
};

export default Post;

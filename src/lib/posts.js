// posts loader using Vite's import.meta.glob with eager:true
const modules = import.meta.glob("/src/posts/**/*.md", { as: "raw", eager: true });

const posts = Object.entries(modules)
	.map(([path, content]) => {
		// Match both DD.md and DD-XX.md formats
		const m = path.match(/\/src\/posts\/(\d{4})\/(\d{2})\/(\d{2})(?:-(\d{2}))?\.md$/);
		if (!m) return null;
		const [, year, month, day, variant] = m;
		const variantNum = variant || "01";
		const titleMatch = content.match(/^#\s+(.*)/m);
		const title = titleMatch ? titleMatch[1].trim() : `${year}-${month}-${day}`;
		// remove the first H1 heading from content so Post doesn't duplicate the title
		const contentWithoutTitle = content.replace(/^#\s+.*(?:\r?\n)*/m, "");
		return {
			id: `${day}-${variantNum}`,
			year,
			month,
			day,
			variant: variantNum,
			title,
			content: contentWithoutTitle,
		};
	})
	.filter(Boolean)
	.sort((a, b) => b.id.localeCompare(a.id));

export function listPosts() {
	return posts;
}

export function getPost(year, month, id) {
	return posts.find((p) => p.year === year && p.month === month && p.id === id) || null;
}

export function getPostsByDate(year, month, day) {
	return posts.filter((p) => p.year === year && p.month === month && p.day === day);
}

export default posts;

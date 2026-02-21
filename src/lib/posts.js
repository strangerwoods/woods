// posts loader using Vite's import.meta.glob with eager:true
const modules = import.meta.glob('/src/posts/**/*.md', { as: 'raw', eager: true });

const posts = Object.entries(modules)
  .map(([path, content]) => {
    const m = path.match(/\/src\/posts\/(\d{4})\/(\d{2})\/(\d{2})\.md$/);
    if (!m) return null;
    const [, year, month, day] = m;
    const titleMatch = content.match(/^#\s+(.*)/m);
    const title = titleMatch ? titleMatch[1].trim() : `${year}-${month}-${day}`;
    return {
      id: `${year}-${month}-${day}`,
      year,
      month,
      day,
      title,
      content,
    };
  })
  .filter(Boolean)
  .sort((a, b) => b.id.localeCompare(a.id));

export function listPosts() {
  return posts;
}

export function getPost(year, month, day) {
  return posts.find(p => p.year === year && p.month === month && p.day === day) || null;
}

export default posts;

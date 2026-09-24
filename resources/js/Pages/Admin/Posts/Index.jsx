import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

function StatusPill({ status }) {
    const published = status === 'published';

    return (
        <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                published
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-muted-foreground'
            }`}
        >
            {published ? 'Published' : 'Draft'}
        </span>
    );
}

export default function PostsIndex({ posts, filters, counts }) {
    const [search, setSearch] = useState(filters.search ?? '');

    const applyFilter = (params) =>
        router.get('/admin/posts', params, {
            preserveState: true,
            replace: true,
        });

    const submitSearch = (e) => {
        e.preventDefault();
        applyFilter({ search, status: filters.status });
    };

    const remove = (post) => {
        if (window.confirm(`Delete “${post.title}”? This cannot be undone.`)) {
            router.delete(`/admin/posts/${post.slug}`, { preserveScroll: true });
        }
    };

    const tabs = [
        { key: '', label: 'All', count: counts.all },
        { key: 'published', label: 'Published', count: counts.published },
        { key: 'draft', label: 'Drafts', count: counts.draft },
    ];

    return (
        <AdminLayout
            title="Blog"
            description="Write and publish articles."
            actions={
                <Link
                    href="/admin/posts/create"
                    className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                >
                    <Plus className="h-4 w-4" />
                    New post
                </Link>
            }
        >
            <Head title="Blog posts" />

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.label}
                            onClick={() =>
                                applyFilter({
                                    search: filters.search,
                                    status: tab.key,
                                })
                            }
                            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                                (filters.status ?? '') === tab.key
                                    ? 'bg-foreground text-background'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {tab.label}
                            <span className="ml-1.5 opacity-60">
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                <form onSubmit={submitSearch} className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search posts"
                        className="w-56 rounded-lg border-input bg-background py-2 pl-9 text-sm text-foreground focus:border-foreground focus:ring-ring"
                    />
                </form>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm">
                {posts.data.length === 0 ? (
                    <p className="px-6 py-12 text-center text-sm text-muted-foreground">
                        No posts yet. Create your first one.
                    </p>
                ) : (
                    <div className="divide-y divide-border">
                        {posts.data.map((post) => (
                            <div
                                key={post.id}
                                className="flex flex-wrap items-center gap-4 px-6 py-4"
                            >
                                <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                                    {post.cover_image && (
                                        <img
                                            src={`/storage/${post.cover_image}`}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="font-medium text-foreground">
                                            {post.title}
                                        </p>
                                        <StatusPill status={post.status} />
                                        {post.is_featured && (
                                            <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    <p className="truncate text-sm text-muted-foreground">
                                        {post.categories
                                            ?.map((c) => c.name)
                                            .join(', ') || 'Uncategorised'}
                                        {' · '}
                                        {post.reading_minutes} min read
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    {post.status === 'published' && (
                                        <a
                                            href={`/blog/${post.slug}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            View
                                        </a>
                                    )}
                                    <Link
                                        href={`/admin/posts/${post.slug}/edit`}
                                        className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition-opacity hover:opacity-90"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => remove(post)}
                                        className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-destructive"
                                        aria-label={`Delete ${post.title}`}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {posts.links && posts.last_page > 1 && (
                <div className="mt-6 flex flex-wrap gap-1">
                    {posts.links.map((link, i) => (
                        <button
                            key={i}
                            disabled={!link.url}
                            onClick={() =>
                                link.url &&
                                router.get(link.url, {}, { preserveState: true })
                            }
                            className={`rounded-lg px-3 py-1.5 text-sm ${
                                link.active
                                    ? 'bg-foreground text-background'
                                    : 'text-muted-foreground hover:text-foreground disabled:opacity-40'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}

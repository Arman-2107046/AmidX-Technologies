import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Trash2, Video } from 'lucide-react';
import { useState } from 'react';

export default function ProjectsIndex({ projects, filters, counts }) {
    const [search, setSearch] = useState(filters.search ?? '');

    const applyFilter = (params) =>
        router.get('/admin/projects', params, {
            preserveState: true,
            replace: true,
        });

    const submitSearch = (e) => {
        e.preventDefault();
        applyFilter({ search, status: filters.status });
    };

    const remove = (project) => {
        if (
            window.confirm(`Delete “${project.title}”? This cannot be undone.`)
        ) {
            router.delete(`/admin/projects/${project.slug}`, {
                preserveScroll: true,
            });
        }
    };

    const tabs = [
        { key: '', label: 'All', count: counts.all },
        { key: 'published', label: 'Published', count: counts.published },
        { key: 'draft', label: 'Drafts', count: counts.draft },
    ];

    return (
        <AdminLayout
            title="Portfolio"
            description="Projects shown on the public portfolio."
            actions={
                <Link
                    href="/admin/projects/create"
                    className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                >
                    <Plus className="h-4 w-4" />
                    New project
                </Link>
            }
        >
            <Head title="Portfolio" />

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
                        placeholder="Search projects"
                        className="w-56 rounded-lg border-input bg-background py-2 pl-9 text-sm text-foreground focus:border-foreground focus:ring-ring"
                    />
                </form>
            </div>

            {projects.data.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-premium-sm">
                    <p className="text-sm text-muted-foreground">
                        No projects yet. Add your first one.
                    </p>
                </div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.data.map((project) => (
                        <div
                            key={project.id}
                            className="overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm"
                        >
                            <div className="relative aspect-[16/10] bg-muted">
                                {project.cover_url ? (
                                    <img
                                        src={project.cover_url}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                                        No cover
                                    </div>
                                )}

                                <div className="absolute left-3 top-3 flex gap-1.5">
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                                            project.status === 'published'
                                                ? 'bg-foreground text-background'
                                                : 'bg-background text-muted-foreground'
                                        }`}
                                    >
                                        {project.status}
                                    </span>
                                    {project.is_featured && (
                                        <span className="rounded-full bg-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                {project.has_video && (
                                    <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-[10px] font-medium text-foreground">
                                        <Video className="h-3 w-3" />
                                        Video
                                    </span>
                                )}
                            </div>

                            <div className="p-4">
                                <p className="mb-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                                    {[project.sector, project.year]
                                        .filter(Boolean)
                                        .join(' · ') || '—'}
                                </p>
                                <p className="truncate font-medium text-foreground">
                                    {project.title}
                                </p>
                                {project.client && (
                                    <p className="truncate text-sm text-muted-foreground">
                                        {project.client}
                                    </p>
                                )}

                                <div className="mt-4 flex items-center gap-2">
                                    <Link
                                        href={`/admin/projects/${project.slug}/edit`}
                                        className="flex-1 rounded-lg bg-foreground px-3 py-1.5 text-center text-xs font-semibold text-background transition-opacity hover:opacity-90"
                                    >
                                        Edit
                                    </Link>
                                    {project.status === 'published' && (
                                        <a
                                            href={`/portfolio/${project.slug}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            View
                                        </a>
                                    )}
                                    <button
                                        onClick={() => remove(project)}
                                        className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-destructive"
                                        aria-label={`Delete ${project.title}`}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {projects.last_page > 1 && (
                <div className="mt-8 flex flex-wrap gap-1">
                    {projects.links.map((link, i) => (
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

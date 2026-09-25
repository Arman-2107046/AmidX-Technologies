import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';

export default function TechnologiesIndex({ technologies }) {
    const grouped = technologies.reduce((acc, tech) => {
        (acc[tech.category] = acc[tech.category] ?? []).push(tech);
        return acc;
    }, {});

    const remove = (tech) => {
        if (window.confirm(`Remove “${tech.name}”?`)) {
            router.delete(`/admin/technologies/${tech.slug}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout
            title="Technologies"
            description="The stack shown on the public technologies page."
            actions={
                <Link
                    href="/admin/technologies/create"
                    className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                >
                    <Plus className="h-4 w-4" />
                    New technology
                </Link>
            }
        >
            <Head title="Technologies" />

            {technologies.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-premium-sm">
                    <p className="text-sm text-muted-foreground">
                        Nothing listed yet. Add your first technology.
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {Object.entries(grouped).map(([category, items]) => (
                        <div key={category}>
                            <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                {category}
                                <span className="ml-2 opacity-60">
                                    {items.length}
                                </span>
                            </h2>

                            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm">
                                <div className="divide-y divide-border">
                                    {items.map((tech) => (
                                        <div
                                            key={tech.id}
                                            className="flex flex-wrap items-center gap-4 px-5 py-4"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                                {tech.logo_url ? (
                                                    <img
                                                        src={tech.logo_url}
                                                        alt=""
                                                        className="h-5 w-5 object-contain"
                                                    />
                                                ) : (
                                                    <span className="text-[11px] font-semibold text-foreground">
                                                        {tech.name
                                                            .slice(0, 2)
                                                            .toUpperCase()}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <p className="font-medium text-foreground">
                                                        {tech.name}
                                                    </p>
                                                    {tech.is_core && (
                                                        <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-background">
                                                            Core
                                                        </span>
                                                    )}
                                                    {tech.status !==
                                                        'published' && (
                                                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                                                            {tech.status}
                                                        </span>
                                                    )}
                                                </div>
                                                {tech.description && (
                                                    <p className="truncate text-sm text-muted-foreground">
                                                        {tech.description}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/technologies/${tech.slug}/edit`}
                                                    className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition-opacity hover:opacity-90"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => remove(tech)}
                                                    className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-destructive"
                                                    aria-label={`Delete ${tech.name}`}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}

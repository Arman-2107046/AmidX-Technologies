import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function PagesIndex({ pages }) {
    return (
        <AdminLayout
            title="Pages"
            description="Every page on the public site and its editable content."
        >
            <Head title="Pages" />

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm">
                <div className="divide-y divide-border">
                    {pages.map((page) => (
                        <div
                            key={page.id}
                            className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
                        >
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="font-medium text-foreground">
                                        {page.name}
                                    </p>
                                    {!page.is_published && (
                                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                            Draft
                                        </span>
                                    )}
                                </div>
                                <p className="truncate text-sm text-muted-foreground">
                                    {page.route} &middot; {page.blocks_count}{' '}
                                    editable field
                                    {page.blocks_count === 1 ? '' : 's'}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                {page.route && (
                                    <a
                                        href={page.route}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        View
                                    </a>
                                )}
                                <Link
                                    href={`/admin/pages/${page.slug}`}
                                    className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition-opacity hover:opacity-90"
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}

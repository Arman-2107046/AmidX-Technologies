import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { MapPin, Plus, Trash2 } from 'lucide-react';

export default function JobsIndex({ jobs, counts }) {
    const remove = (job) => {
        if (window.confirm(`Delete “${job.title}”? This cannot be undone.`)) {
            router.delete(`/admin/jobs/${job.slug}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout
            title="Careers"
            description={`${counts.open} open role${counts.open === 1 ? '' : 's'} on the public site.`}
            actions={
                <Link
                    href="/admin/jobs/create"
                    className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                >
                    <Plus className="h-4 w-4" />
                    New role
                </Link>
            }
        >
            <Head title="Careers" />

            {jobs.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-premium-sm">
                    <p className="text-sm text-muted-foreground">
                        No roles yet. The public page shows a speculative
                        application prompt until you add one.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm">
                    <div className="divide-y divide-border">
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
                            >
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="font-medium text-foreground">
                                            {job.title}
                                        </p>
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                                                job.status === 'published'
                                                    ? 'bg-foreground text-background'
                                                    : 'bg-muted text-muted-foreground'
                                            }`}
                                        >
                                            {job.status}
                                        </span>
                                        {!job.is_open && (
                                            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                                                Closed
                                            </span>
                                        )}
                                    </div>

                                    <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
                                        {job.team && <span>{job.team}</span>}
                                        {job.location && (
                                            <span className="inline-flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {job.location}
                                            </span>
                                        )}
                                        {job.employment_type && (
                                            <span>{job.employment_type}</span>
                                        )}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    {job.status === 'published' && (
                                        <a
                                            href={`/careers/${job.slug}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            View
                                        </a>
                                    )}
                                    <Link
                                        href={`/admin/jobs/${job.slug}/edit`}
                                        className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition-opacity hover:opacity-90"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => remove(job)}
                                        className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-destructive"
                                        aria-label={`Delete ${job.title}`}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

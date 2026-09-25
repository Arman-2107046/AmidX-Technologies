import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Quote, Trash2 } from 'lucide-react';

export default function ClientsIndex({ clients, counts }) {
    const remove = (client) => {
        if (window.confirm(`Remove “${client.name}”? This cannot be undone.`)) {
            router.delete(`/admin/clients/${client.slug}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout
            title="Clients"
            description={`${counts.published} of ${counts.all} shown on the public site.`}
            actions={
                <Link
                    href="/admin/clients/create"
                    className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                >
                    <Plus className="h-4 w-4" />
                    New client
                </Link>
            }
        >
            <Head title="Clients" />

            {clients.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-premium-sm">
                    <p className="text-sm text-muted-foreground">
                        No clients yet. Add your first one.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm">
                    <div className="divide-y divide-border">
                        {clients.map((client) => (
                            <div
                                key={client.id}
                                className="flex flex-wrap items-center gap-4 px-6 py-4"
                            >
                                <div className="flex h-10 w-24 shrink-0 items-center">
                                    {client.logo_url ? (
                                        <img
                                            src={client.logo_url}
                                            alt=""
                                            className="max-h-8 w-auto max-w-full object-contain"
                                        />
                                    ) : (
                                        <span className="text-xs text-muted-foreground">
                                            No logo
                                        </span>
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="font-medium text-foreground">
                                            {client.name}
                                        </p>
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                                                client.status === 'published'
                                                    ? 'bg-foreground text-background'
                                                    : 'bg-muted text-muted-foreground'
                                            }`}
                                        >
                                            {client.status}
                                        </span>
                                        {client.is_featured && (
                                            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                                                Featured
                                            </span>
                                        )}
                                        {client.has_quote && (
                                            <Quote
                                                className="h-3 w-3 text-muted-foreground"
                                                aria-label="Has a quote"
                                            />
                                        )}
                                    </div>

                                    <p className="truncate text-sm text-muted-foreground">
                                        {[
                                            client.industry,
                                            client.location,
                                            client.since
                                                ? `since ${client.since}`
                                                : null,
                                        ]
                                            .filter(Boolean)
                                            .join(' · ') || '—'}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/admin/clients/${client.slug}/edit`}
                                        className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition-opacity hover:opacity-90"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => remove(client)}
                                        className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-destructive"
                                        aria-label={`Delete ${client.name}`}
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

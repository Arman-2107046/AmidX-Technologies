import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { FileText, Layers, Settings as SettingsIcon } from 'lucide-react';

function Stat({ label, value, icon: Icon }) {
    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{label}</p>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                {value}
            </p>
        </div>
    );
}

export default function AdminDashboard({ stats, pages, lastLogin }) {
    return (
        <AdminLayout
            title="Dashboard"
            description={
                lastLogin
                    ? `Last signed in ${new Date(lastLogin).toLocaleString()}`
                    : 'Welcome back.'
            }
        >
            <Head title="Admin dashboard" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Stat label="Pages" value={stats.pages} icon={FileText} />
                <Stat
                    label="Editable fields"
                    value={stats.blocks}
                    icon={Layers}
                />
                <Stat
                    label="Site settings"
                    value={stats.settings}
                    icon={SettingsIcon}
                />
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm">
                <div className="border-b border-border px-6 py-4">
                    <h2 className="font-semibold text-foreground">Pages</h2>
                    <p className="text-sm text-muted-foreground">
                        Edit the content shown on the public site.
                    </p>
                </div>

                <div className="divide-y divide-border">
                    {pages.map((page) => (
                        <div
                            key={page.id}
                            className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
                        >
                            <div className="min-w-0">
                                <p className="font-medium text-foreground">
                                    {page.name}
                                </p>
                                <p className="truncate text-sm text-muted-foreground">
                                    {page.route}
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

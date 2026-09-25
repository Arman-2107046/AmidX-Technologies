import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

export default function FaqsIndex({ faqs }) {
    const grouped = faqs.reduce((acc, faq) => {
        (acc[faq.group] = acc[faq.group] ?? []).push(faq);
        return acc;
    }, {});

    const remove = (faq) => {
        if (window.confirm(`Delete “${faq.question}”?`)) {
            router.delete(`/admin/faqs/${faq.id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout
            title="FAQ"
            description="Questions shown on the public FAQ page."
            actions={
                <Link
                    href="/admin/faqs/create"
                    className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                >
                    <Plus className="h-4 w-4" />
                    New question
                </Link>
            }
        >
            <Head title="FAQ" />

            {faqs.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-premium-sm">
                    <p className="text-sm text-muted-foreground">
                        No questions yet. Add your first one.
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {Object.entries(grouped).map(([group, items]) => (
                        <div key={group}>
                            <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                {group}
                                <span className="ml-2 opacity-60">
                                    {items.length}
                                </span>
                            </h2>

                            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm">
                                <div className="divide-y divide-border">
                                    {items.map((faq) => (
                                        <div
                                            key={faq.id}
                                            className="flex items-center gap-3 px-5 py-4"
                                        >
                                            <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/50" />

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-medium text-foreground">
                                                    {faq.question}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Order {faq.sort_order}
                                                    {!faq.is_published &&
                                                        ' · hidden'}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/faqs/${faq.id}/edit`}
                                                    className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition-opacity hover:opacity-90"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => remove(faq)}
                                                    className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-destructive"
                                                    aria-label={`Delete ${faq.question}`}
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

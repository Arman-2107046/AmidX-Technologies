import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

const inputClasses =
    'mt-1 block w-full rounded-lg border-input bg-background text-foreground shadow-sm focus:border-foreground focus:ring-ring';

function Field({ block, value, onChange }) {
    const id = `block-${block.id}`;

    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-foreground"
            >
                {block.label}
            </label>

            {block.type === 'textarea' || block.type === 'list' ? (
                <textarea
                    id={id}
                    rows={block.type === 'list' ? 8 : 3}
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    className={`${inputClasses} ${block.type === 'list' ? 'font-mono text-xs' : ''}`}
                />
            ) : (
                <input
                    id={id}
                    type="text"
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    className={inputClasses}
                />
            )}

            <p className="mt-1 text-xs text-muted-foreground">
                {block.help ?? (
                    <>
                        Key: <code>{block.key}</code>
                        {block.type === 'list' && ' — JSON array'}
                    </>
                )}
            </p>
        </div>
    );
}

export default function EditPage({ page, sections }) {
    // Flatten the grouped blocks into { [id]: value } for the form.
    const initialBlocks = {};
    Object.values(sections).forEach((blocks) =>
        blocks.forEach((b) => {
            initialBlocks[b.id] = b.value ?? '';
        }),
    );

    const { data, setData, put, processing, isDirty } = useForm({
        meta_title: page.meta_title ?? '',
        meta_description: page.meta_description ?? '',
        is_published: page.is_published,
        blocks: initialBlocks,
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/pages/${page.slug}`, { preserveScroll: true });
    };

    const setBlock = (id, value) =>
        setData('blocks', { ...data.blocks, [id]: value });

    return (
        <AdminLayout
            title={page.name}
            description={`Editing content for ${page.route ?? page.slug}`}
            actions={
                <div className="flex items-center gap-2">
                    <Link
                        href="/admin/pages"
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Back
                    </Link>
                    {page.route && (
                        <a
                            href={page.route}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            View page
                        </a>
                    )}
                    <button
                        form="page-form"
                        type="submit"
                        disabled={processing || !isDirty}
                        className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40"
                    >
                        {processing && (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        )}
                        {isDirty ? 'Save changes' : 'Saved'}
                    </button>
                </div>
            }
        >
            <Head title={`Edit ${page.name}`} />

            <form
                id="page-form"
                onSubmit={submit}
                className="max-w-3xl space-y-6"
            >
                {Object.entries(sections).map(([section, blocks]) => (
                    <div
                        key={section}
                        className="rounded-2xl border border-border bg-card p-6 shadow-premium-sm"
                    >
                        <h2 className="mb-4 font-semibold capitalize text-foreground">
                            {section}
                        </h2>

                        <div className="space-y-4">
                            {blocks.map((block) => (
                                <Field
                                    key={block.id}
                                    block={block}
                                    value={data.blocks[block.id]}
                                    onChange={(v) => setBlock(block.id, v)}
                                />
                            ))}
                        </div>
                    </div>
                ))}

                {/* SEO + visibility */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                    <h2 className="mb-4 font-semibold text-foreground">
                        SEO &amp; visibility
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="meta_title"
                                className="block text-sm font-medium text-foreground"
                            >
                                Meta title
                            </label>
                            <input
                                id="meta_title"
                                type="text"
                                value={data.meta_title}
                                onChange={(e) =>
                                    setData('meta_title', e.target.value)
                                }
                                className={inputClasses}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="meta_description"
                                className="block text-sm font-medium text-foreground"
                            >
                                Meta description
                            </label>
                            <textarea
                                id="meta_description"
                                rows={3}
                                value={data.meta_description}
                                onChange={(e) =>
                                    setData('meta_description', e.target.value)
                                }
                                className={inputClasses}
                            />
                        </div>

                        <label className="flex items-center gap-2 text-sm text-foreground">
                            <input
                                type="checkbox"
                                checked={data.is_published}
                                onChange={(e) =>
                                    setData('is_published', e.target.checked)
                                }
                                className="rounded border-input text-foreground focus:ring-ring"
                            />
                            Published
                        </label>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

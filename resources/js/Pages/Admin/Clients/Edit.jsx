import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ImageIcon, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

const inputClasses =
    'mt-1 block w-full rounded-lg border-input bg-background text-foreground shadow-sm focus:border-foreground focus:ring-ring';

function Field({ id, label, hint, error, children }) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-foreground"
            >
                {label}
            </label>
            {children}
            {hint && !error && (
                <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
            )}
            {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
        </div>
    );
}

export default function ClientEdit({ client, projects }) {
    const isNew = !client;
    const [logoPreview, setLogoPreview] = useState(client?.logo_url ?? null);

    const { data, setData, post, processing, errors } = useForm({
        name: client?.name ?? '',
        slug: client?.slug ?? '',
        industry: client?.industry ?? '',
        location: client?.location ?? '',
        since: client?.since ?? '',
        summary: client?.summary ?? '',
        logo: null,
        logo_alt: client?.logo_alt ?? '',
        remove_logo: false,
        website: client?.website ?? '',
        quote: client?.quote ?? '',
        quote_author: client?.quote_author ?? '',
        quote_role: client?.quote_role ?? '',
        project_id: client?.project_id ?? '',
        is_featured: client?.is_featured ?? false,
        status: client?.status ?? 'draft',
        sort_order: client?.sort_order ?? 0,
    });

    const submit = (e) => {
        e.preventDefault();
        post(isNew ? '/admin/clients' : `/admin/clients/${client.slug}`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const pickLogo = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setData('logo', file);
        setLogoPreview(URL.createObjectURL(file));
    };

    return (
        <AdminLayout
            title={isNew ? 'New client' : 'Edit client'}
            description={
                isNew ? 'Add a client to the public list.' : `Editing “${client.name}”`
            }
            actions={
                <div className="flex items-center gap-2">
                    <Link
                        href="/admin/clients"
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Back
                    </Link>
                    <a
                        href="/clients"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        View page
                    </a>
                    <button
                        form="client-form"
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40"
                    >
                        {processing && (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        )}
                        {isNew ? 'Add client' : 'Save changes'}
                    </button>
                </div>
            }
        >
            <Head title={isNew ? 'New client' : `Edit ${client.name}`} />

            <form
                id="client-form"
                onSubmit={submit}
                className="grid gap-6 lg:grid-cols-3"
            >
                <div className="space-y-6 lg:col-span-2">
                    <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <Field id="name" label="Client name" error={errors.name}>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`${inputClasses} text-lg font-semibold`}
                            />
                        </Field>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                id="industry"
                                label="Industry"
                                hint="Used as the filter on the public page."
                            >
                                <input
                                    id="industry"
                                    type="text"
                                    value={data.industry}
                                    onChange={(e) =>
                                        setData('industry', e.target.value)
                                    }
                                    placeholder="E-commerce"
                                    className={inputClasses}
                                />
                            </Field>

                            <Field id="location" label="Location">
                                <input
                                    id="location"
                                    type="text"
                                    value={data.location}
                                    onChange={(e) =>
                                        setData('location', e.target.value)
                                    }
                                    className={inputClasses}
                                />
                            </Field>

                            <Field id="since" label="Client since">
                                <input
                                    id="since"
                                    type="text"
                                    value={data.since}
                                    onChange={(e) =>
                                        setData('since', e.target.value)
                                    }
                                    placeholder="2024"
                                    className={inputClasses}
                                />
                            </Field>

                            <Field
                                id="website"
                                label="Website"
                                error={errors.website}
                            >
                                <input
                                    id="website"
                                    type="url"
                                    value={data.website}
                                    onChange={(e) =>
                                        setData('website', e.target.value)
                                    }
                                    placeholder="https://example.com"
                                    className={inputClasses}
                                />
                            </Field>
                        </div>

                        <Field
                            id="summary"
                            label="Summary"
                            hint="One line about the work, shown beside the name."
                            error={errors.summary}
                        >
                            <textarea
                                id="summary"
                                rows={2}
                                value={data.summary}
                                onChange={(e) =>
                                    setData('summary', e.target.value)
                                }
                                className={inputClasses}
                            />
                        </Field>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <div>
                            <h2 className="font-semibold text-foreground">
                                Quote
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Optional. Clients with a quote lead the page,
                                above the list.
                            </p>
                        </div>

                        <Field id="quote" label="What they said" error={errors.quote}>
                            <textarea
                                id="quote"
                                rows={3}
                                value={data.quote}
                                onChange={(e) =>
                                    setData('quote', e.target.value)
                                }
                                className={inputClasses}
                            />
                        </Field>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field id="quote_author" label="Who said it">
                                <input
                                    id="quote_author"
                                    type="text"
                                    value={data.quote_author}
                                    onChange={(e) =>
                                        setData('quote_author', e.target.value)
                                    }
                                    className={inputClasses}
                                />
                            </Field>

                            <Field id="quote_role" label="Their role">
                                <input
                                    id="quote_role"
                                    type="text"
                                    value={data.quote_role}
                                    onChange={(e) =>
                                        setData('quote_role', e.target.value)
                                    }
                                    placeholder="CTO"
                                    className={inputClasses}
                                />
                            </Field>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <h2 className="font-semibold text-foreground">
                            Publishing
                        </h2>

                        <Field id="status" label="Status">
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) =>
                                    setData('status', e.target.value)
                                }
                                className={inputClasses}
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </Field>

                        <Field
                            id="sort_order"
                            label="Sort order"
                            hint="Lower numbers appear first."
                        >
                            <input
                                id="sort_order"
                                type="number"
                                min="0"
                                value={data.sort_order}
                                onChange={(e) =>
                                    setData('sort_order', e.target.value)
                                }
                                className={inputClasses}
                            />
                        </Field>

                        <label className="flex items-center gap-2 text-sm text-foreground">
                            <input
                                type="checkbox"
                                checked={data.is_featured}
                                onChange={(e) =>
                                    setData('is_featured', e.target.checked)
                                }
                                className="rounded border-input text-foreground focus:ring-ring"
                            />
                            Featured
                        </label>

                        <Field
                            id="project_id"
                            label="Linked case study"
                            hint="Rows link here when set, otherwise to the website."
                        >
                            <select
                                id="project_id"
                                value={data.project_id ?? ''}
                                onChange={(e) =>
                                    setData('project_id', e.target.value)
                                }
                                className={inputClasses}
                            >
                                <option value="">None</option>
                                {projects.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.title}
                                    </option>
                                ))}
                            </select>
                        </Field>
                    </div>

                    <div className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <h2 className="font-semibold text-foreground">Logo</h2>

                        <div className="flex h-24 items-center justify-center rounded-xl bg-muted p-4">
                            {logoPreview && !data.remove_logo ? (
                                <img
                                    src={logoPreview}
                                    alt=""
                                    className="max-h-full max-w-full object-contain"
                                />
                            ) : (
                                <ImageIcon className="h-7 w-7 text-muted-foreground" />
                            )}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={pickLogo}
                            className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-foreground file:px-3 file:py-2 file:text-sm file:font-medium file:text-background"
                        />
                        {errors.logo && (
                            <p className="text-sm text-destructive">
                                {errors.logo}
                            </p>
                        )}

                        <Field id="logo_alt" label="Alt text">
                            <input
                                id="logo_alt"
                                type="text"
                                value={data.logo_alt}
                                onChange={(e) =>
                                    setData('logo_alt', e.target.value)
                                }
                                className={inputClasses}
                            />
                        </Field>

                        {client?.logo_url && (
                            <label className="flex items-center gap-2 text-sm text-foreground">
                                <input
                                    type="checkbox"
                                    checked={data.remove_logo}
                                    onChange={(e) =>
                                        setData('remove_logo', e.target.checked)
                                    }
                                    className="rounded border-input text-foreground focus:ring-ring"
                                />
                                Remove logo
                            </label>
                        )}
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

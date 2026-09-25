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

export default function TechnologyEdit({ technology, categories }) {
    const isNew = !technology;
    const [logoPreview, setLogoPreview] = useState(
        technology?.logo_url ?? null,
    );

    const { data, setData, post, processing, errors } = useForm({
        name: technology?.name ?? '',
        slug: technology?.slug ?? '',
        category: technology?.category ?? 'Backend',
        description: technology?.description ?? '',
        rationale: technology?.rationale ?? '',
        logo: null,
        logo_alt: technology?.logo_alt ?? '',
        remove_logo: false,
        website: technology?.website ?? '',
        is_core: technology?.is_core ?? false,
        status: technology?.status ?? 'published',
        sort_order: technology?.sort_order ?? 0,
    });

    const submit = (e) => {
        e.preventDefault();
        post(
            isNew
                ? '/admin/technologies'
                : `/admin/technologies/${technology.slug}`,
            { forceFormData: true, preserveScroll: true },
        );
    };

    const pickLogo = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setData('logo', file);
        setLogoPreview(URL.createObjectURL(file));
    };

    return (
        <AdminLayout
            title={isNew ? 'New technology' : 'Edit technology'}
            description={
                isNew
                    ? 'Add something to the stack.'
                    : `Editing “${technology.name}”`
            }
            actions={
                <div className="flex items-center gap-2">
                    <Link
                        href="/admin/technologies"
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Back
                    </Link>
                    <a
                        href="/technologies"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        View page
                    </a>
                    <button
                        form="tech-form"
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40"
                    >
                        {processing && (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        )}
                        {isNew ? 'Add technology' : 'Save changes'}
                    </button>
                </div>
            }
        >
            <Head
                title={isNew ? 'New technology' : `Edit ${technology.name}`}
            />

            <form
                id="tech-form"
                onSubmit={submit}
                className="grid max-w-5xl gap-6 lg:grid-cols-3"
            >
                <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-premium-sm lg:col-span-2">
                    <Field id="name" label="Name" error={errors.name}>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Laravel"
                            className={`${inputClasses} text-lg font-semibold`}
                        />
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                            id="category"
                            label="Category"
                            hint="Groups the technology on the public page."
                            error={errors.category}
                        >
                            <input
                                id="category"
                                type="text"
                                list="tech-categories"
                                value={data.category}
                                onChange={(e) =>
                                    setData('category', e.target.value)
                                }
                                className={inputClasses}
                            />
                            <datalist id="tech-categories">
                                {categories.map((c) => (
                                    <option key={c} value={c} />
                                ))}
                            </datalist>
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
                                placeholder="https://laravel.com"
                                className={inputClasses}
                            />
                        </Field>
                    </div>

                    <Field
                        id="description"
                        label="Description"
                        hint="What it is, in one line."
                        error={errors.description}
                    >
                        <textarea
                            id="description"
                            rows={2}
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            className={inputClasses}
                        />
                    </Field>

                    <Field
                        id="rationale"
                        label="Why we use it"
                        hint="Optional. Shown beneath the description."
                        error={errors.rationale}
                    >
                        <textarea
                            id="rationale"
                            rows={2}
                            value={data.rationale}
                            onChange={(e) =>
                                setData('rationale', e.target.value)
                            }
                            className={inputClasses}
                        />
                    </Field>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <h2 className="font-semibold text-foreground">
                            Placement
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
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
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
                                checked={data.is_core}
                                onChange={(e) =>
                                    setData('is_core', e.target.checked)
                                }
                                className="rounded border-input text-foreground focus:ring-ring"
                            />
                            Part of the core stack
                        </label>
                        <p className="text-xs text-muted-foreground">
                            Core technologies are named at the top of the page.
                        </p>
                    </div>

                    <div className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <h2 className="font-semibold text-foreground">Logo</h2>

                        <div className="flex h-20 items-center justify-center rounded-xl bg-muted p-4">
                            {logoPreview && !data.remove_logo ? (
                                <img
                                    src={logoPreview}
                                    alt=""
                                    className="max-h-full max-w-full object-contain"
                                />
                            ) : (
                                <ImageIcon className="h-6 w-6 text-muted-foreground" />
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

                        {technology?.logo_url && (
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

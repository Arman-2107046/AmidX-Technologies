import RichTextEditor from '@/Components/RichTextEditor';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

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

export default function JobEdit({ job }) {
    const isNew = !job;

    const { data, setData, post, put, processing, errors } = useForm({
        title: job?.title ?? '',
        slug: job?.slug ?? '',
        team: job?.team ?? '',
        location: job?.location ?? '',
        employment_type: job?.employment_type ?? 'Full-time',
        experience: job?.experience ?? '',
        summary: job?.summary ?? '',
        body: job?.body ?? '',
        apply_email: job?.apply_email ?? '',
        apply_url: job?.apply_url ?? '',
        is_open: job?.is_open ?? true,
        status: job?.status ?? 'draft',
        sort_order: job?.sort_order ?? 0,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isNew) {
            post('/admin/jobs');
        } else {
            put(`/admin/jobs/${job.slug}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout
            title={isNew ? 'New role' : 'Edit role'}
            description={
                isNew ? 'Post a new opening.' : `Editing “${job.title}”`
            }
            actions={
                <div className="flex items-center gap-2">
                    <Link
                        href="/admin/jobs"
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Back
                    </Link>
                    {!isNew && job.status === 'published' && (
                        <a
                            href={job.permalink}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            View
                        </a>
                    )}
                    <button
                        form="job-form"
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40"
                    >
                        {processing && (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        )}
                        {isNew ? 'Create role' : 'Save changes'}
                    </button>
                </div>
            }
        >
            <Head title={isNew ? 'New role' : `Edit ${job.title}`} />

            <form
                id="job-form"
                onSubmit={submit}
                className="grid gap-6 lg:grid-cols-3"
            >
                <div className="space-y-6 lg:col-span-2">
                    <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <Field id="title" label="Role title" error={errors.title}>
                            <input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={`${inputClasses} text-lg font-semibold`}
                            />
                        </Field>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                id="team"
                                label="Team"
                                hint="Roles are grouped by team."
                            >
                                <input
                                    id="team"
                                    type="text"
                                    value={data.team}
                                    onChange={(e) =>
                                        setData('team', e.target.value)
                                    }
                                    placeholder="Engineering"
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
                                    placeholder="Dhaka / Remote"
                                    className={inputClasses}
                                />
                            </Field>

                            <Field id="employment_type" label="Employment type">
                                <input
                                    id="employment_type"
                                    type="text"
                                    value={data.employment_type}
                                    onChange={(e) =>
                                        setData(
                                            'employment_type',
                                            e.target.value,
                                        )
                                    }
                                    className={inputClasses}
                                />
                            </Field>

                            <Field id="experience" label="Experience">
                                <input
                                    id="experience"
                                    type="text"
                                    value={data.experience}
                                    onChange={(e) =>
                                        setData('experience', e.target.value)
                                    }
                                    placeholder="3+ years"
                                    className={inputClasses}
                                />
                            </Field>
                        </div>

                        <Field
                            id="summary"
                            label="Summary"
                            hint="One or two lines, shown in the listing."
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

                        <Field
                            id="slug"
                            label="URL slug"
                            hint={`/careers/${data.slug || 'role-title'}`}
                        >
                            <input
                                id="slug"
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                placeholder="Generated from the title"
                                className={inputClasses}
                            />
                        </Field>
                    </div>

                    <div>
                        <h2 className="mb-3 text-sm font-medium text-foreground">
                            Role description
                        </h2>
                        <RichTextEditor
                            value={data.body}
                            onChange={(html) => setData('body', html)}
                            placeholder="What the role involves, who it suits…"
                        />
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
                                checked={data.is_open}
                                onChange={(e) =>
                                    setData('is_open', e.target.checked)
                                }
                                className="rounded border-input text-foreground focus:ring-ring"
                            />
                            Accepting applications
                        </label>
                        <p className="text-xs text-muted-foreground">
                            Unchecking keeps the page live but removes it from
                            the listing and hides the apply button.
                        </p>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <h2 className="font-semibold text-foreground">
                            Applications
                        </h2>

                        <Field
                            id="apply_email"
                            label="Apply by email"
                            hint="Falls back to the site contact address."
                            error={errors.apply_email}
                        >
                            <input
                                id="apply_email"
                                type="email"
                                value={data.apply_email}
                                onChange={(e) =>
                                    setData('apply_email', e.target.value)
                                }
                                className={inputClasses}
                            />
                        </Field>

                        <Field
                            id="apply_url"
                            label="…or an application link"
                            hint="Takes precedence over the email."
                            error={errors.apply_url}
                        >
                            <input
                                id="apply_url"
                                type="url"
                                value={data.apply_url}
                                onChange={(e) =>
                                    setData('apply_url', e.target.value)
                                }
                                placeholder="https://…"
                                className={inputClasses}
                            />
                        </Field>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

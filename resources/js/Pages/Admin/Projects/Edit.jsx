import RichTextEditor from '@/Components/RichTextEditor';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ImageIcon, LoaderCircle, X } from 'lucide-react';
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

/** Tech stack entered as chips. */
function TechInput({ value, onChange }) {
    const [draft, setDraft] = useState('');

    const add = () => {
        const item = draft.trim();
        if (item && !value.includes(item)) {
            onChange([...value, item]);
        }
        setDraft('');
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            add();
        } else if (e.key === 'Backspace' && !draft && value.length) {
            onChange(value.slice(0, -1));
        }
    };

    return (
        <div>
            <label
                htmlFor="tech"
                className="block text-sm font-medium text-foreground"
            >
                Tech stack
            </label>

            {value.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                    {value.map((item) => (
                        <span
                            key={item}
                            className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs text-foreground"
                        >
                            {item}
                            <button
                                type="button"
                                onClick={() =>
                                    onChange(value.filter((t) => t !== item))
                                }
                                aria-label={`Remove ${item}`}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <input
                id="tech"
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                onBlur={add}
                placeholder="Laravel, React…"
                className={inputClasses}
            />
            <p className="mt-1 text-xs text-muted-foreground">
                Press Enter or comma to add.
            </p>
        </div>
    );
}

export default function ProjectEdit({ project, sectors }) {
    const isNew = !project;
    const [coverPreview, setCoverPreview] = useState(project?.cover_url ?? null);
    const [videoPreview, setVideoPreview] = useState(project?.video_src ?? null);

    const { data, setData, post, processing, errors } = useForm({
        title: project?.title ?? '',
        slug: project?.slug ?? '',
        client: project?.client ?? '',
        sector: project?.sector ?? '',
        year: project?.year ?? '',
        summary: project?.summary ?? '',
        body: project?.body ?? '',
        cover: null,
        cover_alt: project?.cover_alt ?? '',
        video: null,
        video_url: project?.video_url ?? '',
        remove_video: false,
        tech: project?.tech ?? [],
        live_url: project?.live_url ?? '',
        link_mode: project?.link_mode ?? 'auto',
        status: project?.status ?? 'draft',
        is_featured: project?.is_featured ?? false,
        sort_order: project?.sort_order ?? 0,
        meta_title: project?.meta_title ?? '',
        meta_description: project?.meta_description ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(isNew ? '/admin/projects' : `/admin/projects/${project.slug}`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const pickFile = (field, setPreview) => (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setData(field, file);
        setPreview(URL.createObjectURL(file));
    };

    return (
        <AdminLayout
            title={isNew ? 'New project' : 'Edit project'}
            description={
                isNew
                    ? 'Add a project to the portfolio.'
                    : `Editing “${project.title}”`
            }
            actions={
                <div className="flex items-center gap-2">
                    <Link
                        href="/admin/projects"
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Back
                    </Link>
                    {!isNew && project.status === 'published' && (
                        <a
                            href={project.permalink}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            View
                        </a>
                    )}
                    <button
                        form="project-form"
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40"
                    >
                        {processing && (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        )}
                        {isNew ? 'Create project' : 'Save changes'}
                    </button>
                </div>
            }
        >
            <Head title={isNew ? 'New project' : `Edit ${project.title}`} />

            <form
                id="project-form"
                onSubmit={submit}
                className="grid gap-6 lg:grid-cols-3"
            >
                <div className="space-y-6 lg:col-span-2">
                    <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <Field id="title" label="Project title" error={errors.title}>
                            <input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={`${inputClasses} text-lg font-semibold`}
                            />
                        </Field>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field id="client" label="Client">
                                <input
                                    id="client"
                                    type="text"
                                    value={data.client}
                                    onChange={(e) =>
                                        setData('client', e.target.value)
                                    }
                                    className={inputClasses}
                                />
                            </Field>

                            <Field id="year" label="Year">
                                <input
                                    id="year"
                                    type="text"
                                    value={data.year}
                                    onChange={(e) =>
                                        setData('year', e.target.value)
                                    }
                                    placeholder="2026"
                                    className={inputClasses}
                                />
                            </Field>

                            <Field
                                id="sector"
                                label="Sector"
                                hint="Used as the filter on the portfolio page."
                            >
                                <input
                                    id="sector"
                                    type="text"
                                    list="sector-options"
                                    value={data.sector}
                                    onChange={(e) =>
                                        setData('sector', e.target.value)
                                    }
                                    placeholder="Web App"
                                    className={inputClasses}
                                />
                                <datalist id="sector-options">
                                    {sectors.map((s) => (
                                        <option key={s} value={s} />
                                    ))}
                                </datalist>
                            </Field>

                            <Field
                                id="slug"
                                label="URL slug"
                                hint={`/portfolio/${data.slug || 'project-title'}`}
                            >
                                <input
                                    id="slug"
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) =>
                                        setData('slug', e.target.value)
                                    }
                                    placeholder="Generated from the title"
                                    className={inputClasses}
                                />
                            </Field>
                        </div>

                        <Field
                            id="summary"
                            label="Summary"
                            hint="One or two lines, shown on the card."
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

                        <TechInput
                            value={data.tech}
                            onChange={(v) => setData('tech', v)}
                        />
                    </div>

                    <div>
                        <h2 className="mb-3 text-sm font-medium text-foreground">
                            Case study
                        </h2>
                        <RichTextEditor
                            value={data.body}
                            onChange={(html) => setData('body', html)}
                            placeholder="How the project came together…"
                        />
                        <p className="mt-2 text-xs text-muted-foreground">
                            Optional. With “Auto” linking, a card opens this
                            case study when it has content and the live site
                            otherwise.
                        </p>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <h2 className="font-semibold text-foreground">SEO</h2>
                        <Field id="meta_title" label="Meta title">
                            <input
                                id="meta_title"
                                type="text"
                                value={data.meta_title}
                                onChange={(e) =>
                                    setData('meta_title', e.target.value)
                                }
                                placeholder={data.title}
                                className={inputClasses}
                            />
                        </Field>
                        <Field id="meta_description" label="Meta description">
                            <textarea
                                id="meta_description"
                                rows={2}
                                value={data.meta_description}
                                onChange={(e) =>
                                    setData('meta_description', e.target.value)
                                }
                                placeholder={data.summary}
                                className={inputClasses}
                            />
                        </Field>
                    </div>
                </div>

                {/* Sidebar */}
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
                            Feature (wider card)
                        </label>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <h2 className="font-semibold text-foreground">Link</h2>

                        <Field
                            id="live_url"
                            label="Live site URL"
                            error={errors.live_url}
                        >
                            <input
                                id="live_url"
                                type="url"
                                value={data.live_url}
                                onChange={(e) =>
                                    setData('live_url', e.target.value)
                                }
                                placeholder="https://example.com"
                                className={inputClasses}
                            />
                        </Field>

                        <Field
                            id="link_mode"
                            label="Card opens"
                            hint="Where a click on the card takes the visitor."
                        >
                            <select
                                id="link_mode"
                                value={data.link_mode}
                                onChange={(e) =>
                                    setData('link_mode', e.target.value)
                                }
                                className={inputClasses}
                            >
                                <option value="auto">
                                    Auto — case study, else live site
                                </option>
                                <option value="detail">
                                    Always the case study
                                </option>
                                <option value="external">
                                    Always the live site
                                </option>
                            </select>
                        </Field>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <h2 className="font-semibold text-foreground">
                            Cover image
                        </h2>

                        <div className="aspect-video overflow-hidden rounded-xl bg-muted">
                            {coverPreview ? (
                                <img
                                    src={coverPreview}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-muted-foreground">
                                    <ImageIcon className="h-8 w-8" />
                                </div>
                            )}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={pickFile('cover', setCoverPreview)}
                            className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-foreground file:px-3 file:py-2 file:text-sm file:font-medium file:text-background"
                        />
                        {errors.cover && (
                            <p className="text-sm text-destructive">
                                {errors.cover}
                            </p>
                        )}

                        <Field id="cover_alt" label="Alt text">
                            <input
                                id="cover_alt"
                                type="text"
                                value={data.cover_alt}
                                onChange={(e) =>
                                    setData('cover_alt', e.target.value)
                                }
                                className={inputClasses}
                            />
                        </Field>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <h2 className="font-semibold text-foreground">Video</h2>
                        <p className="text-xs text-muted-foreground">
                            Plays muted on hover, with the cover image as its
                            poster.
                        </p>

                        {videoPreview && !data.remove_video && (
                            <video
                                src={videoPreview}
                                muted
                                loop
                                playsInline
                                controls
                                className="w-full rounded-xl bg-muted"
                            />
                        )}

                        <input
                            type="file"
                            accept="video/mp4,video/webm"
                            onChange={pickFile('video', setVideoPreview)}
                            className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-foreground file:px-3 file:py-2 file:text-sm file:font-medium file:text-background"
                        />
                        {errors.video && (
                            <p className="text-sm text-destructive">
                                {errors.video}
                            </p>
                        )}

                        <Field
                            id="video_url"
                            label="…or a video URL"
                            hint="Direct .mp4/.webm link, useful for large files."
                            error={errors.video_url}
                        >
                            <input
                                id="video_url"
                                type="url"
                                value={data.video_url}
                                onChange={(e) =>
                                    setData('video_url', e.target.value)
                                }
                                placeholder="https://…/demo.mp4"
                                className={inputClasses}
                            />
                        </Field>

                        {!isNew && project.has_upload && (
                            <label className="flex items-center gap-2 text-sm text-foreground">
                                <input
                                    type="checkbox"
                                    checked={data.remove_video}
                                    onChange={(e) =>
                                        setData(
                                            'remove_video',
                                            e.target.checked,
                                        )
                                    }
                                    className="rounded border-input text-foreground focus:ring-ring"
                                />
                                Remove uploaded video
                            </label>
                        )}
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

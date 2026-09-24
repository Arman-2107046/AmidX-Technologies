import RichTextEditor from '@/Components/RichTextEditor';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ImageIcon, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

const inputClasses =
    'mt-1 block w-full rounded-lg border-input bg-background text-foreground shadow-sm focus:border-foreground focus:ring-ring';

export default function PostEdit({ post, categories }) {
    const isNew = !post;
    const [coverPreview, setCoverPreview] = useState(post?.cover_url ?? null);

    const { data, setData, post: submit, processing, errors } = useForm({
        title: post?.title ?? '',
        slug: post?.slug ?? '',
        excerpt: post?.excerpt ?? '',
        body: post?.body ?? '',
        cover: null,
        cover_alt: post?.cover_alt ?? '',
        status: post?.status ?? 'draft',
        is_featured: post?.is_featured ?? false,
        published_at: post?.published_at ?? '',
        meta_title: post?.meta_title ?? '',
        meta_description: post?.meta_description ?? '',
        categories: post?.categories ?? [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Multipart, so Inertia needs POST even when updating.
        submit(isNew ? '/admin/posts' : `/admin/posts/${post.slug}`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const pickCover = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setData('cover', file);
        setCoverPreview(URL.createObjectURL(file));
    };

    const toggleCategory = (id) =>
        setData(
            'categories',
            data.categories.includes(id)
                ? data.categories.filter((c) => c !== id)
                : [...data.categories, id],
        );

    return (
        <AdminLayout
            title={isNew ? 'New post' : 'Edit post'}
            description={
                isNew ? 'Write a new article.' : `Editing “${post.title}”`
            }
            actions={
                <div className="flex items-center gap-2">
                    <Link
                        href="/admin/posts"
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Back
                    </Link>
                    {!isNew && post.status === 'published' && (
                        <a
                            href={post.permalink}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            View
                        </a>
                    )}
                    <button
                        form="post-form"
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40"
                    >
                        {processing && (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        )}
                        {isNew ? 'Create post' : 'Save changes'}
                    </button>
                </div>
            }
        >
            <Head title={isNew ? 'New post' : `Edit ${post.title}`} />

            <form
                id="post-form"
                onSubmit={handleSubmit}
                className="grid gap-6 lg:grid-cols-3"
            >
                {/* Main column */}
                <div className="space-y-6 lg:col-span-2">
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-foreground"
                            >
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                className={`${inputClasses} text-lg font-semibold`}
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-destructive">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="slug"
                                className="block text-sm font-medium text-foreground"
                            >
                                URL slug
                            </label>
                            <input
                                id="slug"
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                placeholder="Generated from the title"
                                className={inputClasses}
                            />
                            <p className="mt-1 text-xs text-muted-foreground">
                                /blog/{data.slug || 'your-post-title'}
                            </p>
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="excerpt"
                                className="block text-sm font-medium text-foreground"
                            >
                                Excerpt
                            </label>
                            <textarea
                                id="excerpt"
                                rows={2}
                                value={data.excerpt}
                                onChange={(e) =>
                                    setData('excerpt', e.target.value)
                                }
                                className={inputClasses}
                            />
                            <p className="mt-1 text-xs text-muted-foreground">
                                Shown on the blog listing cards.
                            </p>
                        </div>
                    </div>

                    {/* Body editor */}
                    <RichTextEditor
                        value={data.body}
                        onChange={(html) => setData('body', html)}
                        placeholder="Tell the story…"
                    />

                    {/* SEO */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <h2 className="mb-4 font-semibold text-foreground">
                            SEO
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
                                    placeholder={data.title}
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
                                    rows={2}
                                    value={data.meta_description}
                                    onChange={(e) =>
                                        setData(
                                            'meta_description',
                                            e.target.value,
                                        )
                                    }
                                    placeholder={data.excerpt}
                                    className={inputClasses}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <h2 className="mb-4 font-semibold text-foreground">
                            Publishing
                        </h2>

                        <label
                            htmlFor="status"
                            className="block text-sm font-medium text-foreground"
                        >
                            Status
                        </label>
                        <select
                            id="status"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className={inputClasses}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>

                        <div className="mt-4">
                            <label
                                htmlFor="published_at"
                                className="block text-sm font-medium text-foreground"
                            >
                                Publish date
                            </label>
                            <input
                                id="published_at"
                                type="datetime-local"
                                value={data.published_at}
                                onChange={(e) =>
                                    setData('published_at', e.target.value)
                                }
                                className={inputClasses}
                            />
                            <p className="mt-1 text-xs text-muted-foreground">
                                Leave empty to publish now. A future date
                                schedules the post.
                            </p>
                        </div>

                        <label className="mt-4 flex items-center gap-2 text-sm text-foreground">
                            <input
                                type="checkbox"
                                checked={data.is_featured}
                                onChange={(e) =>
                                    setData('is_featured', e.target.checked)
                                }
                                className="rounded border-input text-foreground focus:ring-ring"
                            />
                            Feature at the top of the blog
                        </label>
                    </div>

                    {/* Cover image */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <h2 className="mb-4 font-semibold text-foreground">
                            Cover image
                        </h2>

                        <div className="mb-3 aspect-video overflow-hidden rounded-xl bg-muted">
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
                            onChange={pickCover}
                            className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-foreground file:px-3 file:py-2 file:text-sm file:font-medium file:text-background"
                        />
                        {errors.cover && (
                            <p className="mt-1 text-sm text-destructive">
                                {errors.cover}
                            </p>
                        )}

                        <div className="mt-3">
                            <label
                                htmlFor="cover_alt"
                                className="block text-sm font-medium text-foreground"
                            >
                                Alt text
                            </label>
                            <input
                                id="cover_alt"
                                type="text"
                                value={data.cover_alt}
                                onChange={(e) =>
                                    setData('cover_alt', e.target.value)
                                }
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <h2 className="mb-4 font-semibold text-foreground">
                            Categories
                        </h2>

                        {categories.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No categories yet.{' '}
                                <Link
                                    href="/admin/categories"
                                    className="underline hover:text-foreground"
                                >
                                    Add one
                                </Link>
                                .
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <label
                                        key={category.id}
                                        className="flex items-center gap-2 text-sm text-foreground"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={data.categories.includes(
                                                category.id,
                                            )}
                                            onChange={() =>
                                                toggleCategory(category.id)
                                            }
                                            className="rounded border-input text-foreground focus:ring-ring"
                                        />
                                        {category.name}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

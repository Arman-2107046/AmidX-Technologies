import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import { useState } from 'react';

const inputClasses =
    'mt-1 block w-full rounded-lg border-input bg-background text-foreground shadow-sm focus:border-foreground focus:ring-ring';

function AddCategoryForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/categories', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <form
            onSubmit={submit}
            className="rounded-2xl border border-border bg-card p-6 shadow-premium-sm"
        >
            <h2 className="mb-4 font-semibold text-foreground">Add category</h2>

            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={inputClasses}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-destructive">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-foreground"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows={2}
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className={inputClasses}
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                    Add category
                </button>
            </div>
        </form>
    );
}

function CategoryRow({ category }) {
    const [editing, setEditing] = useState(false);
    const { data, setData, put, processing } = useForm({
        name: category.name,
        description: category.description ?? '',
    });

    const save = (e) => {
        e.preventDefault();
        put(`/admin/categories/${category.slug}`, {
            preserveScroll: true,
            onSuccess: () => setEditing(false),
        });
    };

    const remove = () => {
        if (
            window.confirm(
                `Remove “${category.name}”? Posts keep their content but lose this category.`,
            )
        ) {
            router.delete(`/admin/categories/${category.slug}`, {
                preserveScroll: true,
            });
        }
    };

    if (editing) {
        return (
            <form onSubmit={save} className="flex items-center gap-2 px-6 py-4">
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="flex-1 rounded-lg border-input bg-background text-sm text-foreground focus:border-foreground focus:ring-ring"
                    autoFocus
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground"
                    aria-label="Save"
                >
                    <Check className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground"
                    aria-label="Cancel"
                >
                    <X className="h-4 w-4" />
                </button>
            </form>
        );
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
            <div className="min-w-0">
                <p className="font-medium text-foreground">{category.name}</p>
                <p className="truncate text-sm text-muted-foreground">
                    /blog?category={category.slug} &middot;{' '}
                    {category.posts_count} post
                    {category.posts_count === 1 ? '' : 's'}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => setEditing(true)}
                    className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={`Rename ${category.name}`}
                >
                    <Pencil className="h-4 w-4" />
                </button>
                <button
                    onClick={remove}
                    className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-destructive"
                    aria-label={`Delete ${category.name}`}
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

export default function Categories({ categories }) {
    return (
        <AdminLayout
            title="Categories"
            description="Group blog posts by topic."
        >
            <Head title="Categories" />

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm lg:col-span-2">
                    {categories.length === 0 ? (
                        <p className="px-6 py-12 text-center text-sm text-muted-foreground">
                            No categories yet.
                        </p>
                    ) : (
                        <div className="divide-y divide-border">
                            {categories.map((category) => (
                                <CategoryRow
                                    key={category.id}
                                    category={category}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <AddCategoryForm />
            </div>
        </AdminLayout>
    );
}

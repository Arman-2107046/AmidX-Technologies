import RichTextEditor from '@/Components/RichTextEditor';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

const inputClasses =
    'mt-1 block w-full rounded-lg border-input bg-background text-foreground shadow-sm focus:border-foreground focus:ring-ring';

export default function FaqEdit({ faq, groups }) {
    const isNew = !faq;

    const { data, setData, post, put, processing, errors } = useForm({
        question: faq?.question ?? '',
        answer: faq?.answer ?? '',
        group: faq?.group ?? 'General',
        is_published: faq?.is_published ?? true,
        sort_order: faq?.sort_order ?? 0,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isNew) {
            post('/admin/faqs');
        } else {
            put(`/admin/faqs/${faq.id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout
            title={isNew ? 'New question' : 'Edit question'}
            description={
                isNew
                    ? 'Add a question to the FAQ.'
                    : 'Update this question and answer.'
            }
            actions={
                <div className="flex items-center gap-2">
                    <Link
                        href="/admin/faqs"
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Back
                    </Link>
                    <a
                        href="/faq"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        View FAQ
                    </a>
                    <button
                        form="faq-form"
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40"
                    >
                        {processing && (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        )}
                        {isNew ? 'Add question' : 'Save changes'}
                    </button>
                </div>
            }
        >
            <Head title={isNew ? 'New question' : 'Edit question'} />

            <form
                id="faq-form"
                onSubmit={submit}
                className="grid max-w-5xl gap-6 lg:grid-cols-3"
            >
                <div className="space-y-6 lg:col-span-2">
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
                        <label
                            htmlFor="question"
                            className="block text-sm font-medium text-foreground"
                        >
                            Question
                        </label>
                        <input
                            id="question"
                            type="text"
                            value={data.question}
                            onChange={(e) =>
                                setData('question', e.target.value)
                            }
                            className={`${inputClasses} text-lg font-medium`}
                        />
                        {errors.question && (
                            <p className="mt-1 text-sm text-destructive">
                                {errors.question}
                            </p>
                        )}
                    </div>

                    <div>
                        <h2 className="mb-3 text-sm font-medium text-foreground">
                            Answer
                        </h2>
                        <RichTextEditor
                            value={data.answer}
                            onChange={(html) => setData('answer', html)}
                            placeholder="Answer the question plainly…"
                        />
                    </div>
                </div>

                <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-premium-sm lg:self-start">
                    <h2 className="font-semibold text-foreground">Placement</h2>

                    <div>
                        <label
                            htmlFor="group"
                            className="block text-sm font-medium text-foreground"
                        >
                            Topic
                        </label>
                        <input
                            id="group"
                            type="text"
                            list="faq-groups"
                            value={data.group}
                            onChange={(e) => setData('group', e.target.value)}
                            className={inputClasses}
                        />
                        <datalist id="faq-groups">
                            {groups.map((g) => (
                                <option key={g} value={g} />
                            ))}
                        </datalist>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Questions are grouped by topic on the public page.
                        </p>
                    </div>

                    <div>
                        <label
                            htmlFor="sort_order"
                            className="block text-sm font-medium text-foreground"
                        >
                            Sort order
                        </label>
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
                        <p className="mt-1 text-xs text-muted-foreground">
                            Lower numbers appear first.
                        </p>
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
            </form>
        </AdminLayout>
    );
}

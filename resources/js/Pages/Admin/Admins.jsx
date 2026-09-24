import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';

const inputClasses =
    'mt-1 block w-full rounded-lg border-input bg-background text-foreground shadow-sm focus:border-foreground focus:ring-ring';

function AddAdminForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/admins', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <form
            onSubmit={submit}
            className="rounded-2xl border border-border bg-card p-6 shadow-premium-sm"
        >
            <h2 className="mb-4 font-semibold text-foreground">
                Add administrator
            </h2>

            <div className="space-y-4">
                {[
                    ['name', 'Name', 'text'],
                    ['email', 'Email', 'email'],
                    ['password', 'Password', 'password'],
                    ['password_confirmation', 'Confirm password', 'password'],
                ].map(([field, label, type]) => (
                    <div key={field}>
                        <label
                            htmlFor={field}
                            className="block text-sm font-medium text-foreground"
                        >
                            {label}
                        </label>
                        <input
                            id={field}
                            type={type}
                            value={data[field]}
                            onChange={(e) => setData(field, e.target.value)}
                            className={inputClasses}
                        />
                        {errors[field] && (
                            <p className="mt-1 text-sm text-destructive">
                                {errors[field]}
                            </p>
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                    Add administrator
                </button>
            </div>
        </form>
    );
}

function ChangePasswordForm() {
    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put('/admin/password', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <form
            onSubmit={submit}
            className="rounded-2xl border border-border bg-card p-6 shadow-premium-sm"
        >
            <h2 className="mb-4 font-semibold text-foreground">
                Change your password
            </h2>

            <div className="space-y-4">
                {[
                    ['current_password', 'Current password'],
                    ['password', 'New password'],
                    ['password_confirmation', 'Confirm new password'],
                ].map(([field, label]) => (
                    <div key={field}>
                        <label
                            htmlFor={field}
                            className="block text-sm font-medium text-foreground"
                        >
                            {label}
                        </label>
                        <input
                            id={field}
                            type="password"
                            value={data[field]}
                            onChange={(e) => setData(field, e.target.value)}
                            className={inputClasses}
                        />
                        {errors[field] && (
                            <p className="mt-1 text-sm text-destructive">
                                {errors[field]}
                            </p>
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                    Update password
                </button>
            </div>
        </form>
    );
}

export default function Admins({ admins, currentId, errors }) {
    const remove = (admin) => {
        if (
            window.confirm(
                `Remove ${admin.name}? This cannot be undone.`,
            )
        ) {
            router.delete(`/admin/admins/${admin.id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout
            title="Administrators"
            description="Accounts that can sign in to this panel."
        >
            <Head title="Administrators" />

            {errors?.admin && (
                <p className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {errors.admin}
                </p>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm lg:col-span-2">
                    <div className="divide-y divide-border">
                        {admins.map((admin) => (
                            <div
                                key={admin.id}
                                className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
                            >
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-foreground">
                                            {admin.name}
                                        </p>
                                        {admin.id === currentId && (
                                            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                                You
                                            </span>
                                        )}
                                    </div>
                                    <p className="truncate text-sm text-muted-foreground">
                                        {admin.email}
                                        {admin.last_login_at &&
                                            ` · last seen ${new Date(admin.last_login_at).toLocaleDateString()}`}
                                    </p>
                                </div>

                                {admin.id !== currentId && (
                                    <button
                                        onClick={() => remove(admin)}
                                        className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-destructive"
                                        aria-label={`Remove ${admin.name}`}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <AddAdminForm />
                <ChangePasswordForm />
            </div>
        </AdminLayout>
    );
}

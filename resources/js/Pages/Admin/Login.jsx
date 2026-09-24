import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function AdminLogin() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Admin sign in" />

            <div className="flex min-h-screen flex-col items-center justify-center bg-muted px-6 py-12">
                <img
                    src="/image.png"
                    alt="AMIDX"
                    className="mb-8 h-12 w-auto"
                />

                <div className="w-full rounded-2xl border border-border bg-card p-8 shadow-premium-lg sm:max-w-md">
                    <h1 className="text-xl font-bold tracking-tight text-foreground">
                        Admin sign in
                    </h1>
                    <p className="mb-6 mt-1 text-sm text-muted-foreground">
                        Manage site content and settings.
                    </p>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-foreground"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                autoComplete="username"
                                autoFocus
                                className="mt-1 block w-full rounded-lg border-input bg-background text-foreground shadow-sm focus:border-foreground focus:ring-ring"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-destructive">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-foreground"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                autoComplete="current-password"
                                className="mt-1 block w-full rounded-lg border-input bg-background text-foreground shadow-sm focus:border-foreground focus:ring-ring"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-destructive">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                                className="rounded border-input text-foreground focus:ring-ring"
                            />
                            Remember me
                        </label>

                        <button
                            type="submit"
                            disabled={processing}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-all duration-300 hover:bg-foreground/90 disabled:opacity-50"
                        >
                            {processing && (
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                            )}
                            Sign in
                        </button>
                    </form>
                </div>

                <a
                    href="/"
                    className="mt-8 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    &larr; Back to site
                </a>
            </div>
        </>
    );
}

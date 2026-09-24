import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted px-6 py-12">
            <Link
                href="/"
                className="mb-8 transition-opacity hover:opacity-80"
            >
                <img
                    src="/image.png"
                    alt="AMIDX Logo"
                    className="h-12 w-auto"
                />
            </Link>

            <div className="w-full overflow-hidden rounded-2xl border border-border bg-card px-6 py-8 shadow-premium-lg sm:max-w-md">
                {children}
            </div>

            <Link
                href="/"
                className="mt-8 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                &larr; Back to site
            </Link>
        </div>
    );
}

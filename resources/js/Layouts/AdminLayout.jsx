import { Link, router, usePage } from '@inertiajs/react';
import {
    FileText,
    LayoutDashboard,
    LogOut,
    Settings as SettingsIcon,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Pages', href: '/admin/pages', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: SettingsIcon },
    { name: 'Administrators', href: '/admin/admins', icon: Users },
];

function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);

    const message = flash?.success ?? flash?.error;
    const isError = Boolean(flash?.error);

    useEffect(() => {
        if (!message) return;

        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 4000);
        return () => clearTimeout(timer);
    }, [message]);

    if (!message || !visible) return null;

    return (
        <div
            className={`fixed right-6 top-6 z-50 rounded-xl border px-4 py-3 text-sm shadow-premium-lg ${
                isError
                    ? 'border-destructive/30 bg-destructive text-destructive-foreground'
                    : 'border-border bg-foreground text-background'
            }`}
        >
            {message}
        </div>
    );
}

export default function AdminLayout({ title, description, actions, children }) {
    const { auth, url } = usePage();
    const admin = auth?.admin;
    const pathname = (url ?? '').split('?')[0];

    const isCurrent = (item) =>
        item.exact ? pathname === item.href : pathname.startsWith(item.href);

    const logout = () => router.post('/admin/logout');

    return (
        <div className="flex min-h-screen bg-muted">
            <FlashMessage />

            {/* Sidebar */}
            <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-background lg:flex">
                <div className="flex h-20 items-center border-b border-border px-6">
                    <img
                        src="/image.png"
                        alt="AMIDX"
                        className="h-8 w-auto"
                    />
                </div>

                <nav className="flex-1 space-y-1 p-4">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                                    isCurrent(item)
                                        ? 'bg-foreground text-background'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-border p-4">
                    <p className="truncate text-sm font-medium text-foreground">
                        {admin?.name}
                    </p>
                    <p className="mb-3 truncate text-xs text-muted-foreground">
                        {admin?.email}
                    </p>
                    <div className="flex items-center gap-2">
                        <a
                            href="/"
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 rounded-lg border border-border px-3 py-2 text-center text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            View site
                        </a>
                        <button
                            onClick={logout}
                            className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
                            aria-label="Log out"
                        >
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <div className="flex min-w-0 flex-1 flex-col">
                {/* Mobile nav */}
                <div className="flex items-center gap-1 overflow-x-auto border-b border-border bg-background px-4 py-3 lg:hidden">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${
                                isCurrent(item)
                                    ? 'bg-foreground text-background'
                                    : 'text-muted-foreground'
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <button
                        onClick={logout}
                        className="ml-auto whitespace-nowrap rounded-lg px-3 py-2 text-sm text-muted-foreground"
                    >
                        Log out
                    </button>
                </div>

                <header className="border-b border-border bg-background px-6 py-6 lg:px-10">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                {title}
                            </h1>
                            {description && (
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {description}
                                </p>
                            )}
                        </div>
                        {actions}
                    </div>
                </header>

                <main className="flex-1 p-6 lg:p-10">{children}</main>
            </div>
        </div>
    );
}

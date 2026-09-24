import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-foreground bg-muted text-foreground focus:bg-muted'
                    : 'border-transparent text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground focus:border-border focus:bg-muted/50 focus:text-foreground'
            } text-base font-medium transition duration-300 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}

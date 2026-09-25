import { Button } from '@/Components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
    const { props, url } = usePage();
    const user = props.auth?.user;

    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Inertia's `url` carries the query string; match on the pathname only.
    const pathname = url.split('?')[0];

    useEffect(() => {
        const handleScroll = () => {
            // Prevent mobile micro-scroll blur
            setIsScrolled(window.scrollY > 40);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [url]);

    const isActive = (href) =>
        href === '/'
            ? pathname === '/'
            : pathname === href || pathname.startsWith(href + '/');

    const authButtons = (fullWidth = false) => {
        const width = fullWidth ? 'w-full' : '';

        return user ? (
            <>
                <Button asChild variant="ghost" size="lg" className={width}>
                    <Link href={route('dashboard')}>Dashboard</Link>
                </Button>
                <Button variant="premium" size="lg" className={width}>
                    Start a Project
                </Button>
            </>
        ) : (
            <>
                <Button asChild variant="ghost" size="lg" className={width}>
                    <Link href={route('login')}>Log in</Link>
                </Button>
                <Button asChild variant="premium" size="lg" className={width}>
                    <Link href={route('register')}>Register</Link>
                </Button>
            </>
        );
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'border-b border-border bg-background/80 shadow-premium-sm lg:backdrop-blur-xl'
                    : 'border-b border-transparent bg-transparent backdrop-blur-0'
            }`}
        >
            <nav className="container mx-auto px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-2xl font-bold tracking-tight transition-opacity hover:opacity-80"
                    >
                        <img
                            src="/image.png"
                            alt="AMIDX Logo"
                            className="h-11 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-1 lg:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                                    isActive(link.href)
                                        ? 'bg-muted text-foreground'
                                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden items-center gap-2 lg:flex">
                        {authButtons()}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                        className="rounded-lg p-2 transition-colors hover:bg-muted lg:hidden"
                    >
                        {isOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden border-t border-border bg-background lg:hidden"
                        >
                            <div className="space-y-2 py-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`block rounded-lg px-4 py-3 text-base font-medium transition-all ${
                                            isActive(link.href)
                                                ? 'bg-muted text-foreground'
                                                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                <div className="space-y-2 px-4 pt-4">
                                    {authButtons(true)}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
};

export default Navbar;

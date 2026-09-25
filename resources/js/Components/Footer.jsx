import { useSetting } from '@/lib/content';
import { Link } from '@inertiajs/react';
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';

/**
 * Links are grouped by intent rather than stacked in one long column, so a
 * visitor scanning for "what do they do" and one scanning for "can I trust
 * them" each land in the right place.
 */
const columns = [
    {
        heading: 'Company',
        links: [
            { name: 'About Us', href: '/about' },
            { name: 'Clients', href: '/clients' },
            { name: 'Careers', href: '/careers' },
            { name: 'Contact', href: '/contact' },
        ],
    },
    {
        heading: 'Work',
        links: [
            { name: 'Portfolio', href: '/portfolio' },
            { name: 'Solutions', href: '/solutions' },
            { name: 'Technologies', href: '/technologies' },
            { name: 'Pricing', href: '/pricing' },
        ],
    },
    {
        heading: 'Resources',
        links: [
            { name: 'Blog', href: '/blog' },
            { name: 'FAQ', href: '/faq' },
            { name: 'Sitemap', href: '/sitemap' },
        ],
    },
    {
        heading: 'Legal',
        links: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/service' },
            { name: 'Cookie Policy', href: '/cookies' },
        ],
    },
];

function FooterLink({ href, children }) {
    return (
        <Link
            href={href}
            className="group inline-flex items-center gap-1.5 py-1.5 text-sm text-background/55 transition-colors duration-300 hover:text-background"
        >
            {/* A rule that draws out on hover, instead of an underline */}
            <span className="h-px w-0 bg-background transition-all duration-300 group-hover:w-3" />
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                {children}
            </span>
        </Link>
    );
}

function ContactLine({ icon: Icon, href, children }) {
    const content = (
        <>
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-background/40" />
            <span>{children}</span>
        </>
    );

    if (!href) {
        return (
            <div className="flex items-start gap-3 text-sm text-background/55">
                {content}
            </div>
        );
    }

    return (
        <a
            href={href}
            className="flex items-start gap-3 text-sm text-background/55 transition-colors duration-300 hover:text-background"
        >
            {content}
        </a>
    );
}

const Footer = () => {
    const s = useSetting();

    // Only render socials that have actually been set in the CMS.
    const socials = [
        { name: 'LinkedIn', href: s('social.linkedin', '#') },
        { name: 'Twitter', href: s('social.twitter', '#') },
        { name: 'GitHub', href: s('social.github', '#') },
    ].filter((item) => item.href && item.href !== '#');

    const toTop = () =>
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
                .matches
                ? 'auto'
                : 'smooth',
        });

    return (
        <footer className="relative overflow-hidden bg-foreground text-background">
            <div className="container relative mx-auto px-6 lg:px-8">
                {/* Availability — usually the first thing a prospect looks for */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-background/10 py-6">
                    <p className="flex items-center gap-2.5 text-sm text-background/70">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-background/60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-background" />
                        </span>
                        {s('company.availability', 'Available for new projects')}
                    </p>

                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-background"
                    >
                        Start a project
                        <span className="h-px w-5 bg-background transition-all duration-300 group-hover:w-8" />
                    </Link>
                </div>

                {/* Brand + four link columns */}
                <div className="grid gap-x-8 gap-y-12 py-14 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <Link
                            href="/"
                            className="inline-flex transition-opacity duration-300 hover:opacity-80"
                        >
                            {/*
                                blacklogo.jpeg is a white mark on a baked-in
                                black background. `mix-blend-screen` drops that
                                black into the footer and hides the JPEG
                                compression artefacts ringing the mark.
                            */}
                            <img
                                src="/blacklogo.jpeg"
                                alt="AMIDX Logo"
                                className="h-10 w-auto mix-blend-screen"
                            />
                        </Link>

                        <p className="mt-7 max-w-xs text-sm leading-relaxed text-background/55">
                            {s(
                                'company.tagline',
                                'Premium software, UI/UX, and cloud infrastructure, from domain to deployment.',
                            )}
                        </p>

                        <div className="mt-8 space-y-3.5">
                            <ContactLine
                                icon={Mail}
                                href={`mailto:${s('contact.email', 'business@amidx.net')}`}
                            >
                                {s('contact.email', 'business@amidx.net')}
                            </ContactLine>

                            <ContactLine
                                icon={Phone}
                                href={`tel:${s('contact.phone_link', '+8801306789067')}`}
                            >
                                {s(
                                    'contact.phone',
                                    '+880 1306-789067, +880 1988-008844',
                                )}
                            </ContactLine>

                            <ContactLine icon={MapPin}>
                                {s(
                                    'contact.address',
                                    'House 11, Road 18, Sector 4, Uttara, Dhaka, Bangladesh',
                                )}
                            </ContactLine>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-8">
                        {columns.map((column) => (
                            <nav key={column.heading} aria-label={column.heading}>
                                <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-background/40">
                                    {column.heading}
                                </h2>
                                {/* Pull left so the hover rule does not shift the text */}
                                <ul className="-ml-[18px]">
                                    {column.links.map((link) => (
                                        <li key={link.name}>
                                            <FooterLink href={link.href}>
                                                {link.name}
                                            </FooterLink>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        ))}
                    </div>
                </div>

                {/* Oversized wordmark, clipped by the footer edge */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none select-none overflow-hidden"
                >
                    <span className="block translate-y-[0.14em] whitespace-nowrap text-[clamp(3rem,13vw,13rem)] font-bold leading-none tracking-tighter text-background/[0.05]">
                        AmidX Technologies
                    </span>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-background/10 py-7 text-sm text-background/40 md:flex-row">
                    <p>
                        © {new Date().getFullYear()}{' '}
                        {s('company.name', 'AmidX')}. All rights reserved.
                    </p>

                    <div className="flex items-center gap-7">
                        {socials.length > 0 && (
                            <div className="flex items-center gap-5">
                                {socials.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="transition-colors duration-300 hover:text-background"
                                    >
                                        {social.name}
                                    </a>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={toTop}
                            aria-label="Back to top"
                            className="group flex h-9 w-9 items-center justify-center rounded-full border border-background/20 transition-colors duration-300 hover:border-background hover:bg-background hover:text-foreground"
                        >
                            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import { Link } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Solutions', href: '/solutions' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Contact', href: '/contact' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/service' },
    ],
};

const Footer = () => {
    return (
        <footer className="overflow-hidden bg-foreground text-background">
            {/* Main Footer */}
            <div className="container mx-auto px-6 py-10 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {/* Brand + contact */}
                    <div>
                        <Link
                            href="/"
                            className="mb-8 flex items-center gap-2 text-2xl font-bold tracking-tight transition-opacity hover:opacity-80"
                        >
                            {/*
                                blacklogo.jpeg is a white mark on a baked-in
                                black background (JPEG has no transparency).
                                `mix-blend-screen` drops that black into the
                                footer while leaving the white mark intact,
                                and hides the grey compression artefacts that
                                would otherwise ring the logo.
                            */}
                            <img
                                src="/blacklogo.jpeg"
                                alt="AMIDX Logo"
                                className="h-11 w-auto mix-blend-screen"
                            />
                        </Link>

                        <p className="mb-6 max-w-sm text-background/60">
                            Premium software, UI/UX, and cloud infrastructure,
                            from domain to deployment.
                        </p>

                        <div className="space-y-3">
                            <a
                                href="mailto:business@amidx.net"
                                className="flex items-center gap-3 text-background/60 transition-colors hover:text-background"
                            >
                                <Mail className="h-5 w-5" />
                                business@amidx.net
                            </a>

                            <a
                                href="tel:+8801306789067"
                                className="flex items-center gap-3 text-background/60 transition-colors hover:text-background"
                            >
                                <Phone className="h-5 w-5" />
                                +880 1306-789067, +880 1988-008844
                            </a>

                            <div className="flex items-start gap-3 text-background/60">
                                <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                                House 11, Road 18, Sector 4, Uttara, Dhaka,
                                Bangladesh
                            </div>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-background/80">
                            Company
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-background/60 transition-colors hover:text-background"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-background/80">
                            Legal
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-background/60 transition-colors hover:text-background"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-background/10 pt-6 text-sm text-background/40 md:flex-row">
                    <p>
                        © {new Date().getFullYear()} AmidX. All rights reserved.
                    </p>

                    <div className="flex gap-4">
                        <a href="#" className="hover:text-background">
                            LinkedIn
                        </a>
                        <a href="#" className="hover:text-background">
                            Twitter
                        </a>
                        <a href="#" className="hover:text-background">
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

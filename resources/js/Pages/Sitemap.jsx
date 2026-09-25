import AnimatedSection from '@/Components/AnimatedSection';
import PageHero from '@/Components/PageHero';
import PublicLayout from '@/Layouts/PublicLayout';
import { useContent } from '@/lib/content';
import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';

const Sitemap = ({ sections, meta }) => {
    const t = useContent();

    return (
        <>
            <PageHero
                eyebrow={t('hero.eyebrow', 'Index')}
                title={t('hero.title', 'Everything')}
                titleAccent={t('hero.title_accent', 'in one place')}
                subtitle={t(
                    'hero.subtitle',
                    'Every page on this site, generated from what is actually published.',
                )}
                image={meta?.hero_image}
                imageAlt={meta?.hero_image_alt}
                seed="sitemap"
                align="text"
            />

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                        {sections.map((section, i) => (
                            <AnimatedSection
                                key={section.title}
                                delay={(i % 3) * 0.08}
                            >
                                <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                    {section.title}
                                </h2>

                                <ul className="space-y-1 border-t border-border pt-2">
                                    {section.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="group flex items-baseline justify-between gap-4 py-2"
                                            >
                                                <span className="text-balance leading-snug text-foreground/85 transition-colors duration-300 group-hover:text-foreground">
                                                    {link.label}
                                                </span>

                                                <span className="flex shrink-0 items-center gap-2">
                                                    {link.meta && (
                                                        <span className="text-xs text-muted-foreground">
                                                            {link.meta}
                                                        </span>
                                                    )}
                                                    <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </AnimatedSection>
                        ))}
                    </div>

                    <AnimatedSection>
                        <p className="mt-20 border-t border-border pt-8 text-sm text-muted-foreground">
                            Search engines can read the{' '}
                            <a
                                href="/sitemap.xml"
                                className="text-foreground underline underline-offset-4"
                            >
                                XML sitemap
                            </a>
                            .
                        </p>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
};

const SitemapPage = (props) => (
    <>
        <Head title={props.meta?.title || 'Sitemap'}>
            {props.meta?.description && (
                <meta name="description" content={props.meta.description} />
            )}
        </Head>
        <Sitemap {...props} />
    </>
);

SitemapPage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default SitemapPage;

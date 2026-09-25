import AnimatedSection from '@/Components/AnimatedSection';
import PageHero from '@/Components/PageHero';
import PublicLayout from '@/Layouts/PublicLayout';
import { useContent } from '@/lib/content';
import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

function TechCard({ tech }) {
    const Wrapper = tech.website ? 'a' : 'div';
    const props = tech.website
        ? { href: tech.website, target: '_blank', rel: 'noreferrer noopener' }
        : {};

    return (
        <Wrapper
            {...props}
            className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-foreground/20 hover:shadow-premium-md"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted">
                    {tech.logo_url ? (
                        <img
                            src={tech.logo_url}
                            alt={tech.logo_alt}
                            loading="lazy"
                            className="h-6 w-6 object-contain"
                        />
                    ) : (
                        <span className="text-sm font-semibold text-foreground">
                            {tech.name.slice(0, 2).toUpperCase()}
                        </span>
                    )}
                </div>

                {tech.website && (
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                )}
            </div>

            <h3 className="mt-5 flex items-center gap-2 font-semibold tracking-tight">
                {tech.name}
                {tech.is_core && (
                    <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-background">
                        Core
                    </span>
                )}
            </h3>

            {tech.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {tech.description}
                </p>
            )}

            {tech.rationale && (
                <p className="mt-auto border-t border-border pt-4 text-sm italic leading-relaxed text-muted-foreground">
                    {tech.rationale}
                </p>
            )}
        </Wrapper>
    );
}

const Technologies = ({ categories, core, total, meta }) => {
    const t = useContent();
    const names = Object.keys(categories);

    return (
        <>
            <PageHero
                eyebrow={t('hero.eyebrow', 'Stack')}
                title={t('hero.title', 'What we')}
                titleAccent={t('hero.title_accent', 'build with')}
                subtitle={t(
                    'hero.subtitle',
                    'We favour boring, well-understood tools, and reach for something newer only when it solves a problem we actually have.',
                )}
                image={meta?.hero_image}
                imageAlt={meta?.hero_image_alt}
                seed="technologies"
            />

            {/* The headline stack, named up front. */}
            {core.length > 0 && (
                <section className="border-b border-border py-12 md:py-16">
                    <div className="container mx-auto px-6 lg:px-8">
                        <AnimatedSection className="flex flex-wrap items-center gap-x-10 gap-y-4">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                Core stack
                            </span>
                            {core.map((name) => (
                                <span
                                    key={name}
                                    className="text-xl font-medium tracking-tight md:text-2xl"
                                >
                                    {name}
                                </span>
                            ))}
                        </AnimatedSection>
                    </div>
                </section>
            )}

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-8">
                    {total === 0 ? (
                        <p className="py-20 text-center text-lg text-muted-foreground">
                            No technologies listed yet.
                        </p>
                    ) : (
                        <div className="space-y-20">
                            {names.map((category) => (
                                <AnimatedSection key={category}>
                                    <div className="mb-8 flex items-baseline justify-between border-b border-border pb-4">
                                        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                                            {category}
                                        </h2>
                                        <span className="text-sm text-muted-foreground">
                                            {categories[category].length}
                                        </span>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                        {categories[category].map((tech) => (
                                            <TechCard
                                                key={tech.id}
                                                tech={tech}
                                            />
                                        ))}
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="border-t border-border py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <AnimatedSection className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                        <div>
                            <h2 className="max-w-xl text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                                {t(
                                    'cta.title',
                                    'Not sure which stack fits your problem?',
                                )}
                            </h2>
                            <p className="mt-3 max-w-lg text-muted-foreground">
                                {t(
                                    'cta.subtitle',
                                    'Tell us the outcome you need. The right technology depends entirely on what the thing has to do.',
                                )}
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                        >
                            {t('cta.label', 'Talk to us')}
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
};

const TechnologiesPage = (props) => (
    <>
        <Head title={props.meta?.title || 'Technologies'}>
            {props.meta?.description && (
                <meta name="description" content={props.meta.description} />
            )}
        </Head>
        <Technologies {...props} />
    </>
);

TechnologiesPage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default TechnologiesPage;

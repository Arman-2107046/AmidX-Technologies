import PageHero from '@/Components/PageHero';
import AnimatedSection from '@/Components/AnimatedSection';
import ProjectMedia from '@/Components/ProjectMedia';
import PublicLayout from '@/Layouts/PublicLayout';
import { useContent } from '@/lib/content';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

/**
 * A card links wherever the project points — its case study or straight
 * out to the live site — so it renders as an Inertia <Link> or a plain
 * <a> accordingly.
 */
function CardShell({ project, children, className = '', ...props }) {
    if (project.external) {
        return (
            <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                className={className}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <Link href={project.url} className={className} {...props}>
            {children}
        </Link>
    );
}

function ProjectCard({ project, index, featured = false }) {
    const [hovered, setHovered] = useState(false);

    return (
        <AnimatedSection
            delay={(index % 3) * 0.08}
            className={featured ? 'md:col-span-2' : ''}
        >
            <CardShell
                project={project}
                className={`group block ${featured ? 'md:grid md:grid-cols-2 md:items-center md:gap-10' : ''}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onFocus={() => setHovered(true)}
                onBlur={() => setHovered(false)}
            >
                <div
                    className={`relative overflow-hidden rounded-3xl bg-muted ${
                        featured ? 'aspect-[16/10]' : 'aspect-[4/3]'
                    }`}
                >
                    <ProjectMedia
                        project={project}
                        active={hovered}
                        className="transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/10" />

                    <span className="pointer-events-none absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-background text-foreground opacity-0 shadow-premium-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight className="h-5 w-5" />
                    </span>
                </div>

                <div className={featured ? 'pt-6 md:pt-0' : ''}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-6 md:pt-0">
                        <div className="min-w-0">
                            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                {[project.sector, project.year]
                                    .filter(Boolean)
                                    .join(' · ') || 'Project'}
                            </p>

                            <h3
                                className={`text-balance font-semibold leading-snug tracking-tight transition-opacity duration-300 group-hover:opacity-60 ${
                                    featured ? 'text-2xl md:text-3xl' : 'text-xl'
                                }`}
                            >
                                {project.title}
                            </h3>

                            {project.client && (
                                <p className="mt-1.5 text-sm text-muted-foreground">
                                    {project.client}
                                </p>
                            )}
                        </div>

                        {project.tech?.length > 0 && !featured && (
                            <div className="flex flex-wrap gap-1.5">
                                {project.tech.slice(0, 3).map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {project.summary && (
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                            {project.summary}
                        </p>
                    )}

                    {featured && project.tech?.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-1.5">
                            {project.tech.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </CardShell>
        </AnimatedSection>
    );
}

const Portfolio = ({ projects, sectors, filters, meta }) => {
    const t = useContent();

    const go = (sector) =>
        router.get(
            '/portfolio',
            sector ? { sector } : {},
            { preserveState: true, preserveScroll: true, replace: true },
        );

    return (
        <>
            <PageHero
                eyebrow={t('hero.eyebrow', 'Portfolio')}
                title={t('hero.title', 'Work we have')}
                titleAccent={t('hero.title_accent', 'shipped')}
                subtitle={t(
                    'hero.subtitle',
                    'Products we have designed, built and deployed, from first commit to production.',
                )}
                image={meta?.hero_image}
                imageAlt={meta?.hero_image_alt}
                seed="portfolio"
            />

            {/* Sector filter */}
            {sectors.length > 0 && (
                <section className="sticky top-20 z-30 border-b border-border bg-background/85 py-4 backdrop-blur-xl">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="-mx-1 flex gap-1 overflow-x-auto px-1">
                            <button
                                onClick={() => go(null)}
                                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                                    !filters.sector
                                        ? 'bg-foreground text-background'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                            >
                                All work
                            </button>
                            {sectors.map((sector) => (
                                <button
                                    key={sector}
                                    onClick={() => go(sector)}
                                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                                        filters.sector === sector
                                            ? 'bg-foreground text-background'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                                >
                                    {sector}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Grid */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-8">
                    {projects.length === 0 ? (
                        <div className="py-20 text-center">
                            <p className="text-xl text-muted-foreground">
                                {filters.sector
                                    ? 'No projects in this category yet.'
                                    : 'No projects published yet.'}
                            </p>
                            {filters.sector && (
                                <button
                                    onClick={() => go(null)}
                                    className="mt-8 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                                >
                                    View all work
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="mb-12 flex items-baseline justify-between">
                                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                    {filters.sector ?? 'Selected work'}
                                </h2>
                                <span className="text-sm text-muted-foreground">
                                    {projects.length} project
                                    {projects.length === 1 ? '' : 's'}
                                </span>
                            </div>

                            <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
                                {projects.map((project, i) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        index={i}
                                        featured={project.is_featured}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Closing CTA */}
            <section className="border-t border-border py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <AnimatedSection className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                        <h2 className="text-balance max-w-2xl text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                            {t(
                                'cta.title',
                                'Have something you want built properly?',
                            )}
                        </h2>

                        <Link
                            href="/contact"
                            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                        >
                            {t('cta.label', 'Start a project')}
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
};

const PortfolioPage = (props) => (
    <>
        <Head title={props.meta?.title || 'Portfolio'}>
            {props.meta?.description && (
                <meta name="description" content={props.meta.description} />
            )}
        </Head>
        <Portfolio {...props} />
    </>
);

PortfolioPage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default PortfolioPage;

import AnimatedSection from '@/Components/AnimatedSection';
import ProjectMedia from '@/Components/ProjectMedia';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';

function FactRow({ label, children }) {
    if (!children) return null;

    return (
        <div className="flex flex-col gap-1 border-t border-border py-4 sm:flex-row sm:gap-6">
            <dt className="w-32 shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {label}
            </dt>
            <dd className="text-sm text-foreground">{children}</dd>
        </div>
    );
}

function MoreCard({ project }) {
    const [hovered, setHovered] = useState(false);

    const inner = (
        <>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                <ProjectMedia
                    project={project}
                    active={hovered}
                    className="transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
                />
            </div>
            <p className="mb-2 mt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {[project.sector, project.year].filter(Boolean).join(' · ') ||
                    'Project'}
            </p>
            <h3 className="text-balance font-semibold leading-snug tracking-tight transition-opacity duration-300 group-hover:opacity-60">
                {project.title}
            </h3>
        </>
    );

    const props = {
        className: 'group flex flex-col',
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
    };

    return project.external ? (
        <a href={project.url} target="_blank" rel="noreferrer noopener" {...props}>
            {inner}
        </a>
    ) : (
        <Link href={project.url} {...props}>
            {inner}
        </Link>
    );
}

const ProjectShow = ({ project, more }) => {
    const [heroHovered, setHeroHovered] = useState(false);
    const column = 'mx-auto w-full max-w-[44rem]';

    return (
        <>
            <article>
                <header className="pt-32 md:pt-44">
                    <div className="container mx-auto px-6 lg:px-8">
                        <AnimatedSection className="mx-auto max-w-5xl">
                            <Link
                                href="/portfolio"
                                className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                All work
                            </Link>

                            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                {[project.sector, project.year]
                                    .filter(Boolean)
                                    .join(' · ') || 'Project'}
                            </p>

                            <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                                {project.title}
                            </h1>

                            {project.summary && (
                                <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">
                                    {project.summary}
                                </p>
                            )}

                            {project.live_url && (
                                <a
                                    href={project.live_url}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="group mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                                >
                                    Visit live site
                                    <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </a>
                            )}
                        </AnimatedSection>
                    </div>
                </header>

                {/* Hero media */}
                <div className="container mx-auto px-6 py-12 md:py-16 lg:px-8">
                    <AnimatedSection className="mx-auto max-w-5xl">
                        <div
                            className="aspect-[16/9] overflow-hidden rounded-3xl bg-muted"
                            onMouseEnter={() => setHeroHovered(true)}
                            onMouseLeave={() => setHeroHovered(false)}
                        >
                            <ProjectMedia
                                project={project}
                                active={heroHovered}
                            />
                        </div>
                    </AnimatedSection>
                </div>

                {/* Facts */}
                <div className="container mx-auto px-6 lg:px-8">
                    <AnimatedSection className="mx-auto max-w-5xl">
                        <dl className="mb-4 grid gap-x-12 md:grid-cols-2">
                            <FactRow label="Client">{project.client}</FactRow>
                            <FactRow label="Sector">{project.sector}</FactRow>
                            <FactRow label="Year">{project.year}</FactRow>
                            <FactRow label="Stack">
                                {project.tech?.length > 0
                                    ? project.tech.join(', ')
                                    : null}
                            </FactRow>
                        </dl>
                    </AnimatedSection>
                </div>

                {/* Case study */}
                {project.html && (
                    <div className="container mx-auto px-6 lg:px-8">
                        <div
                            className={`article-body ${column} py-14 md:py-20`}
                            dangerouslySetInnerHTML={{ __html: project.html }}
                        />
                    </div>
                )}

                {/* Footer actions */}
                <div className="container mx-auto px-6 lg:px-8">
                    <div
                        className={`mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 border-t border-border py-10 ${
                            project.html ? '' : 'mt-10'
                        }`}
                    >
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            All work
                        </Link>

                        {project.live_url && (
                            <a
                                href={project.live_url}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
                            >
                                Visit live site
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        )}
                    </div>
                </div>
            </article>

            {more.length > 0 && (
                <section className="border-t border-border py-16 md:py-24">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="mb-12 flex items-baseline justify-between">
                            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                More work
                            </h2>
                            <Link
                                href="/portfolio"
                                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                View all
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                            {more.map((item) => (
                                <MoreCard key={item.id} project={item} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

const ProjectShowPage = (props) => (
    <>
        <Head
            title={props.project?.meta_title || props.project?.title || 'Project'}
        >
            {(props.project?.meta_description || props.project?.summary) && (
                <meta
                    name="description"
                    content={
                        props.project.meta_description || props.project.summary
                    }
                />
            )}
        </Head>
        <ProjectShow {...props} />
    </>
);

ProjectShowPage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default ProjectShowPage;

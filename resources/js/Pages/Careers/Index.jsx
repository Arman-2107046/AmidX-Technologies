import AnimatedSection from '@/Components/AnimatedSection';
import PageHero from '@/Components/PageHero';
import PublicLayout from '@/Layouts/PublicLayout';
import { useContent } from '@/lib/content';
import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight, Clock, MapPin } from 'lucide-react';

function Role({ job }) {
    return (
        <Link
            href={job.url}
            className="group flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-border py-7 transition-colors"
        >
            <div className="min-w-0 flex-1">
                <h3 className="text-balance text-lg font-medium leading-snug tracking-tight transition-opacity duration-300 group-hover:opacity-60 md:text-xl">
                    {job.title}
                </h3>

                {job.summary && (
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {job.summary}
                    </p>
                )}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {job.location && (
                    <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                    </span>
                )}
                {job.employment_type && (
                    <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {job.employment_type}
                    </span>
                )}
            </div>

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                <ArrowUpRight className="h-4 w-4" />
            </span>
        </Link>
    );
}

const Careers = ({ teams, total, meta }) => {
    const t = useContent();
    const teamNames = Object.keys(teams);

    return (
        <>
            <PageHero
                eyebrow={t('hero.eyebrow', 'Careers')}
                title={t('hero.title', 'Build things')}
                titleAccent={t('hero.title_accent', 'that outlast you')}
                subtitle={t(
                    'hero.subtitle',
                    'We are a small team that cares about craft. If you would rather ship something considered than something quick, we should talk.',
                )}
                image={meta?.hero_image}
                imageAlt={meta?.hero_image_alt}
                seed="careers"
            />

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="mb-12 flex items-baseline justify-between">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Open roles
                        </h2>
                        <span className="text-sm text-muted-foreground">
                            {total} position{total === 1 ? '' : 's'}
                        </span>
                    </div>

                    {total === 0 ? (
                        <AnimatedSection>
                            <div className="rounded-3xl border border-border bg-muted/40 px-8 py-20 text-center">
                                <p className="text-xl text-muted-foreground">
                                    {t(
                                        'empty.title',
                                        'No open roles right now.',
                                    )}
                                </p>
                                <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                                    {t(
                                        'empty.body',
                                        'We still read every speculative application. Tell us what you do and we will keep it on file.',
                                    )}
                                </p>
                                <Link
                                    href="/contact"
                                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                                >
                                    Get in touch
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </AnimatedSection>
                    ) : (
                        <div className="space-y-16">
                            {teamNames.map((team) => (
                                <AnimatedSection key={team}>
                                    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                        {team}
                                    </h3>
                                    <div className="border-t border-border">
                                        {teams[team].map((job) => (
                                            <Role key={job.id} job={job} />
                                        ))}
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

const CareersPage = (props) => (
    <>
        <Head title={props.meta?.title || 'Careers'}>
            {props.meta?.description && (
                <meta name="description" content={props.meta.description} />
            )}
        </Head>
        <Careers {...props} />
    </>
);

CareersPage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default CareersPage;

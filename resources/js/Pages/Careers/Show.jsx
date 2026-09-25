import AnimatedSection from '@/Components/AnimatedSection';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowUpRight, Briefcase, Clock, MapPin } from 'lucide-react';

function Fact({ icon: Icon, label, value }) {
    if (!value) return null;

    return (
        <div className="flex items-start gap-3 border-t border-border py-4">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {label}
                </p>
                <p className="mt-0.5 text-sm text-foreground">{value}</p>
            </div>
        </div>
    );
}

const JobShow = ({ job, others }) => {
    const column = 'mx-auto w-full max-w-[44rem]';

    return (
        <>
            <article>
                <header className="border-b border-border pb-12 pt-32 md:pt-44">
                    <div className="container mx-auto px-6 lg:px-8">
                        <AnimatedSection className={column}>
                            <Link
                                href="/careers"
                                className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                All roles
                            </Link>

                            {job.team && (
                                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                    {job.team}
                                </p>
                            )}

                            <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
                                {job.title}
                            </h1>

                            {job.summary && (
                                <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
                                    {job.summary}
                                </p>
                            )}

                            {!job.is_open && (
                                <p className="mt-6 inline-block rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">
                                    This role is currently closed.
                                </p>
                            )}

                            {job.is_open && job.apply_link && (
                                <a
                                    href={job.apply_link}
                                    className="group mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                                >
                                    Apply for this role
                                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </a>
                            )}
                        </AnimatedSection>
                    </div>
                </header>

                <div className="container mx-auto px-6 lg:px-8">
                    <div className={`${column} py-10`}>
                        <dl className="grid gap-x-10 sm:grid-cols-3">
                            <Fact
                                icon={MapPin}
                                label="Location"
                                value={job.location}
                            />
                            <Fact
                                icon={Clock}
                                label="Type"
                                value={job.employment_type}
                            />
                            <Fact
                                icon={Briefcase}
                                label="Experience"
                                value={job.experience}
                            />
                        </dl>
                    </div>

                    {job.html && (
                        <div
                            className={`article-body ${column} pb-16 md:pb-20`}
                            dangerouslySetInnerHTML={{ __html: job.html }}
                        />
                    )}

                    <div
                        className={`${column} flex flex-wrap items-center justify-between gap-4 border-t border-border py-10`}
                    >
                        <Link
                            href="/careers"
                            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            All roles
                        </Link>

                        {job.is_open && job.apply_link && (
                            <a
                                href={job.apply_link}
                                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                            >
                                Apply
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        )}
                    </div>
                </div>
            </article>

            {others.length > 0 && (
                <section className="border-t border-border py-16 md:py-24">
                    <div className="container mx-auto px-6 lg:px-8">
                        <h2 className="mb-10 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Other openings
                        </h2>

                        <div className="border-t border-border">
                            {others.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.url}
                                    className="group flex items-center justify-between gap-6 border-b border-border py-6"
                                >
                                    <div>
                                        <h3 className="font-medium tracking-tight transition-opacity duration-300 group-hover:opacity-60">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {[item.team, item.location]
                                                .filter(Boolean)
                                                .join(' · ')}
                                        </p>
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

const JobShowPage = (props) => (
    <>
        <Head title={props.job?.title || 'Role'}>
            {props.job?.summary && (
                <meta name="description" content={props.job.summary} />
            )}
        </Head>
        <JobShow {...props} />
    </>
);

JobShowPage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default JobShowPage;

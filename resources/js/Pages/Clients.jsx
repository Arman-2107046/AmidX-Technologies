import AnimatedSection from '@/Components/AnimatedSection';
import PageHero from '@/Components/PageHero';
import PublicLayout from '@/Layouts/PublicLayout';
import { useContent } from '@/lib/content';
import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';

/**
 * The logo slot. Renders nothing without a logo rather than repeating the
 * client name, which already appears as the row heading. The slot keeps its
 * width either way so rows stay aligned.
 */
function ClientMark({ client }) {
    if (!client.logo_url) return null;

    return (
        <img
            src={client.logo_url}
            alt={client.logo_alt}
            loading="lazy"
            className="max-h-10 w-auto max-w-[140px] object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        />
    );
}

function ClientRow({ client }) {
    const Wrapper = client.project_url ? Link : client.website ? 'a' : 'div';
    const props = client.project_url
        ? { href: client.project_url }
        : client.website
          ? {
                href: client.website,
                target: '_blank',
                rel: 'noreferrer noopener',
            }
          : {};

    const interactive = Boolean(client.project_url || client.website);

    return (
        <Wrapper
            {...props}
            className={`group flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-border py-8 ${
                interactive ? 'cursor-pointer' : ''
            }`}
        >
            <div className="flex h-12 w-[160px] shrink-0 items-center">
                <ClientMark client={client} />
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="text-balance text-lg font-medium tracking-tight transition-opacity duration-300 group-hover:opacity-60">
                    {client.name}
                </h3>
                {client.summary && (
                    <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {client.summary}
                    </p>
                )}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
                {client.industry && <span>{client.industry}</span>}
                {client.since && <span>Since {client.since}</span>}
            </div>

            {interactive && (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                    {client.project_url ? (
                        <ArrowUpRight className="h-4 w-4" />
                    ) : (
                        <ExternalLink className="h-3.5 w-3.5" />
                    )}
                </span>
            )}
        </Wrapper>
    );
}

function Quote({ item }) {
    return (
        <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-8">
            <blockquote className="flex-1 text-balance text-lg leading-relaxed text-foreground">
                “{item.quote}”
            </blockquote>

            <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                {item.logo_url ? (
                    <img
                        src={item.logo_url}
                        alt=""
                        className="h-8 w-auto max-w-[90px] object-contain opacity-70"
                    />
                ) : (
                    <span className="text-sm font-medium text-foreground">
                        {item.name}
                    </span>
                )}

                <span className="text-sm text-muted-foreground">
                    {item.author && (
                        <span className="block text-foreground">
                            {item.author}
                        </span>
                    )}
                    {[item.role, item.logo_url ? item.name : null]
                        .filter(Boolean)
                        .join(', ')}
                </span>
            </figcaption>
        </figure>
    );
}

const Clients = ({ clients, quotes, industries, meta }) => {
    const t = useContent();
    const [industry, setIndustry] = useState(null);

    const visible = industry
        ? clients.filter((c) => c.industry === industry)
        : clients;

    return (
        <>
            <PageHero
                eyebrow={t('hero.eyebrow', 'Clients')}
                title={t('hero.title', 'Who we')}
                titleAccent={t('hero.title_accent', 'build for')}
                subtitle={t(
                    'hero.subtitle',
                    'Teams who needed something built properly, and stayed with us after it shipped.',
                )}
                image={meta?.hero_image}
                imageAlt={meta?.hero_image_alt}
                seed="clients"
            />

            {/* Quotes lead, because they carry more than a logo wall does. */}
            {quotes.length > 0 && (
                <section className="border-b border-border py-16 md:py-24">
                    <div className="container mx-auto px-6 lg:px-8">
                        <AnimatedSection>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {quotes.slice(0, 3).map((item) => (
                                    <Quote key={item.id} item={item} />
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            )}

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            {industry ?? 'All clients'}
                        </h2>
                        <span className="text-sm text-muted-foreground">
                            {visible.length} client
                            {visible.length === 1 ? '' : 's'}
                        </span>
                    </div>

                    {industries.length > 1 && (
                        <div className="-mx-1 mb-10 flex gap-1 overflow-x-auto px-1">
                            <button
                                onClick={() => setIndustry(null)}
                                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                                    !industry
                                        ? 'bg-foreground text-background'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                            >
                                All
                            </button>
                            {industries.map((name) => (
                                <button
                                    key={name}
                                    onClick={() => setIndustry(name)}
                                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                                        industry === name
                                            ? 'bg-foreground text-background'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                    )}

                    {visible.length === 0 ? (
                        <p className="py-20 text-center text-lg text-muted-foreground">
                            No clients listed yet.
                        </p>
                    ) : (
                        <AnimatedSection>
                            <div className="border-t border-border">
                                {visible.map((client) => (
                                    <ClientRow
                                        key={client.id}
                                        client={client}
                                    />
                                ))}
                            </div>
                        </AnimatedSection>
                    )}
                </div>
            </section>

            <section className="border-t border-border py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <AnimatedSection className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                        <h2 className="max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                            {t('cta.title', 'Want to be on this page?')}
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

const ClientsPage = (props) => (
    <>
        <Head title={props.meta?.title || 'Clients'}>
            {props.meta?.description && (
                <meta name="description" content={props.meta.description} />
            )}
        </Head>
        <Clients {...props} />
    </>
);

ClientsPage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default ClientsPage;

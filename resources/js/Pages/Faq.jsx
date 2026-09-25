import AnimatedSection from '@/Components/AnimatedSection';
import PageHero from '@/Components/PageHero';
import PublicLayout from '@/Layouts/PublicLayout';
import { useContent } from '@/lib/content';
import { Head, Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Minus, Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

const EASE = [0.16, 1, 0.3, 1];

function Item({ faq, isOpen, onToggle }) {
    const panelId = `faq-panel-${faq.id}`;
    const buttonId = `faq-button-${faq.id}`;

    return (
        <div className="border-b border-border">
            <h3>
                <button
                    id={buttonId}
                    onClick={onToggle}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                >
                    <span
                        className={`text-balance text-lg font-medium leading-snug tracking-tight transition-colors duration-300 md:text-xl ${
                            isOpen
                                ? 'text-foreground'
                                : 'text-foreground/80 group-hover:text-foreground'
                        }`}
                    >
                        {faq.question}
                    </span>

                    <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                            isOpen
                                ? 'border-foreground bg-foreground text-background'
                                : 'border-border text-muted-foreground group-hover:border-foreground/30 group-hover:text-foreground'
                        }`}
                    >
                        {isOpen ? (
                            <Minus className="h-4 w-4" />
                        ) : (
                            <Plus className="h-4 w-4" />
                        )}
                    </span>
                </button>
            </h3>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                    >
                        <div
                            className="article-body max-w-2xl pb-8 pr-14 text-base"
                            dangerouslySetInnerHTML={{
                                __html: faq.answer || '',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const Faq = ({ groups, meta }) => {
    const t = useContent();
    const groupNames = Object.keys(groups);

    const [activeGroup, setActiveGroup] = useState(groupNames[0] ?? null);
    const [query, setQuery] = useState('');
    const [openId, setOpenId] = useState(null);

    const stripTags = (html = '') => html.replace(/<[^>]*>/g, ' ');

    // Searching looks across every group, since a visitor does not know
    // which topic their question was filed under.
    const results = useMemo(() => {
        const term = query.trim().toLowerCase();
        if (!term) return null;

        return Object.values(groups)
            .flat()
            .filter(
                (f) =>
                    f.question.toLowerCase().includes(term) ||
                    stripTags(f.answer ?? '')
                        .toLowerCase()
                        .includes(term),
            );
    }, [query, groups]);

    const visible = results ?? groups[activeGroup] ?? [];

    return (
        <>
            <PageHero
                eyebrow={t('hero.eyebrow', 'Support')}
                title={t('hero.title', 'Questions,')}
                titleAccent={t('hero.title_accent', 'answered')}
                subtitle={t(
                    'hero.subtitle',
                    'The things clients ask us most often, about how we work, what we charge and what happens after launch.',
                )}
                image={meta?.hero_image}
                imageAlt={meta?.hero_image_alt}
                seed="faq"
            />

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-20">
                        {/* Topics + search */}
                        <div className="lg:sticky lg:top-28 lg:self-start">
                            <div className="relative mb-8">
                                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="search"
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setOpenId(null);
                                    }}
                                    placeholder="Search questions"
                                    aria-label="Search questions"
                                    className="w-full rounded-full border-border bg-background py-2.5 pl-11 pr-4 text-sm text-foreground focus:border-foreground focus:ring-0"
                                />
                            </div>

                            {!results && groupNames.length > 1 && (
                                <nav className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                                    {groupNames.map((name) => (
                                        <button
                                            key={name}
                                            onClick={() => {
                                                setActiveGroup(name);
                                                setOpenId(null);
                                            }}
                                            className={`rounded-full px-4 py-2 text-left text-sm font-medium transition-all duration-300 lg:rounded-lg ${
                                                activeGroup === name
                                                    ? 'bg-foreground text-background'
                                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                            }`}
                                        >
                                            {name}
                                            <span className="ml-2 opacity-50">
                                                {groups[name].length}
                                            </span>
                                        </button>
                                    ))}
                                </nav>
                            )}
                        </div>

                        {/* Questions */}
                        <div>
                            {results && (
                                <p className="mb-6 text-sm text-muted-foreground">
                                    {results.length} result
                                    {results.length === 1 ? '' : 's'} for “
                                    {query}”
                                </p>
                            )}

                            {visible.length === 0 ? (
                                <p className="py-16 text-center text-muted-foreground">
                                    Nothing matches that yet. Try another
                                    wording, or{' '}
                                    <Link
                                        href="/contact"
                                        className="text-foreground underline underline-offset-4"
                                    >
                                        ask us directly
                                    </Link>
                                    .
                                </p>
                            ) : (
                                <AnimatedSection>
                                    <div className="border-t border-border">
                                        {visible.map((faq) => (
                                            <Item
                                                key={faq.id}
                                                faq={faq}
                                                isOpen={openId === faq.id}
                                                onToggle={() =>
                                                    setOpenId(
                                                        openId === faq.id
                                                            ? null
                                                            : faq.id,
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                </AnimatedSection>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Still stuck */}
            <section className="border-t border-border py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <AnimatedSection className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                        <div>
                            <h2 className="text-balance max-w-xl text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                                {t('cta.title', 'Still have a question?')}
                            </h2>
                            <p className="mt-3 max-w-lg text-muted-foreground">
                                {t(
                                    'cta.subtitle',
                                    'Tell us what you are building and we will come back within 24 hours.',
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

const FaqPage = (props) => (
    <>
        <Head title={props.meta?.title || 'FAQ'}>
            {props.meta?.description && (
                <meta name="description" content={props.meta.description} />
            )}
        </Head>
        <Faq {...props} />
    </>
);

FaqPage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default FaqPage;

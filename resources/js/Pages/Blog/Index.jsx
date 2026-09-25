import PageHero from '@/Components/PageHero';
import AnimatedSection from '@/Components/AnimatedSection';
import PostCover from '@/Components/PostCover';
import PublicLayout from '@/Layouts/PublicLayout';
import { useContent } from '@/lib/content';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { useState } from 'react';

function Meta({ post, className = '' }) {
    return (
        <div
            className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground ${className}`}
        >
            {post.author && (
                <>
                    <span className="text-foreground">{post.author}</span>
                    <span aria-hidden="true">&middot;</span>
                </>
            )}
            <time dateTime={post.published_at}>{post.published_label}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.reading_minutes} min read</span>
        </div>
    );
}

function Filters({ categories, filters }) {
    const [search, setSearch] = useState(filters.search ?? '');

    const go = (params) =>
        router.get('/blog', params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });

    const submit = (e) => {
        e.preventDefault();
        go({
            search: search || undefined,
            category: filters.category || undefined,
        });
    };

    const clearSearch = () => {
        setSearch('');
        go({ category: filters.category || undefined });
    };

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 md:overflow-visible md:pb-0">
                <button
                    onClick={() =>
                        go({ search: filters.search || undefined })
                    }
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        !filters.category
                            ? 'bg-foreground text-background'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                >
                    All
                </button>

                {categories.map((category) => (
                    <button
                        key={category.slug}
                        onClick={() =>
                            go({
                                category: category.slug,
                                search: filters.search || undefined,
                            })
                        }
                        className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                            filters.category === category.slug
                                ? 'bg-foreground text-background'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <form onSubmit={submit} className="relative shrink-0">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search articles"
                    aria-label="Search articles"
                    className="w-full rounded-full border-border bg-background py-2.5 pl-11 pr-10 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-foreground focus:ring-0 md:w-72"
                />
                {search && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        aria-label="Clear search"
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                )}
            </form>
        </div>
    );
}

function FeaturedPost({ post }) {
    return (
        <AnimatedSection>
            <Link
                href={post.url}
                className="group grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
            >
                <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-muted lg:aspect-[4/3]">
                    <PostCover
                        post={post}
                        className="transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
                        sizes="(min-width: 1024px) 55vw, 100vw"
                    />
                </div>

                <div className="lg:py-4">
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-foreground px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-background">
                            Featured
                        </span>
                        {post.categories?.slice(0, 2).map((c) => (
                            <span
                                key={c.slug}
                                className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
                            >
                                {c.name}
                            </span>
                        ))}
                    </div>

                    <h2 className="text-balance text-3xl font-bold leading-[1.1] tracking-tight transition-opacity duration-300 group-hover:opacity-60 md:text-4xl lg:text-5xl">
                        {post.title}
                    </h2>

                    {post.excerpt && (
                        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                            {post.excerpt}
                        </p>
                    )}

                    <Meta post={post} className="mt-7" />

                    <span className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-semibold text-foreground">
                        Read article
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                </div>
            </Link>
        </AnimatedSection>
    );
}

function PostCard({ post, index }) {
    return (
        <AnimatedSection delay={(index % 3) * 0.08} className="h-full">
            <Link href={post.url} className="group flex h-full flex-col">
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-muted">
                    <PostCover
                        post={post}
                        className="transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                </div>

                <div className="flex flex-1 flex-col pt-6">
                    <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {post.categories?.[0]?.name ?? 'Article'}
                    </p>

                    <h3 className="text-balance text-xl font-semibold leading-snug tracking-tight transition-opacity duration-300 group-hover:opacity-60">
                        {post.title}
                    </h3>

                    {post.excerpt && (
                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                            {post.excerpt}
                        </p>
                    )}

                    {/* mt-auto pins the meta line to the bottom so cards in a
                        row align regardless of title or excerpt length. */}
                    <div className="mt-auto flex items-center gap-2 pt-6 text-xs text-muted-foreground">
                        <time dateTime={post.published_at}>
                            {post.published_label}
                        </time>
                        <span aria-hidden="true">&middot;</span>
                        <span>{post.reading_minutes} min read</span>
                    </div>
                </div>
            </Link>
        </AnimatedSection>
    );
}

const Blog = ({ featured, posts, categories, filters, meta }) => {
    const t = useContent();
    const isFiltered = Boolean(filters.search || filters.category);
    const hasPosts = featured || posts.data.length > 0;

    return (
        <>
            <PageHero
                eyebrow={t('hero.eyebrow', 'Insights')}
                title={t('hero.title', 'Engineering')}
                titleAccent={t('hero.title_accent', 'notes & perspectives')}
                subtitle={t(
                    'hero.subtitle',
                    'Deep dives on software architecture, cloud infrastructure and product design from the AmidX team.',
                )}
                image={meta?.hero_image}
                imageAlt={meta?.hero_image_alt}
                seed="blog"
            />

            {/* Filters */}
            <section className="sticky top-20 z-30 border-b border-border bg-background/85 py-4 backdrop-blur-xl">
                <div className="container mx-auto px-6 lg:px-8">
                    <Filters categories={categories} filters={filters} />
                </div>
            </section>

            {!hasPosts ? (
                <section className="py-28 md:py-40">
                    <div className="container mx-auto px-6 text-center lg:px-8">
                        <p className="text-xl text-muted-foreground">
                            {isFiltered
                                ? 'No articles match that search yet.'
                                : 'No articles published yet. Check back soon.'}
                        </p>
                        {isFiltered && (
                            <button
                                onClick={() => router.get('/blog')}
                                className="mt-8 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                </section>
            ) : (
                <>
                    {featured && (
                        <section className="border-b border-border py-16 md:py-24">
                            <div className="container mx-auto px-6 lg:px-8">
                                <FeaturedPost post={featured} />
                            </div>
                        </section>
                    )}

                    {posts.data.length > 0 && (
                        <section className="py-16 md:py-24">
                            <div className="container mx-auto px-6 lg:px-8">
                                <div className="mb-12 flex items-baseline justify-between">
                                    <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                        {isFiltered
                                            ? 'Results'
                                            : 'Latest articles'}
                                    </h2>
                                    <span className="text-sm text-muted-foreground">
                                        {posts.total} article
                                        {posts.total === 1 ? '' : 's'}
                                    </span>
                                </div>

                                <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                                    {posts.data.map((post, i) => (
                                        <PostCard
                                            key={post.id}
                                            post={post}
                                            index={i}
                                        />
                                    ))}
                                </div>

                                {posts.last_page > 1 && (
                                    <div className="mt-20 flex flex-wrap justify-center gap-2">
                                        {posts.links.map((link, i) => (
                                            <button
                                                key={i}
                                                disabled={!link.url}
                                                onClick={() =>
                                                    link.url &&
                                                    router.get(
                                                        link.url,
                                                        {},
                                                        { preserveState: true },
                                                    )
                                                }
                                                className={`min-w-10 rounded-full px-4 py-2 text-sm transition-colors ${
                                                    link.active
                                                        ? 'bg-foreground text-background'
                                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent'
                                                }`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </>
            )}
        </>
    );
};

const BlogPage = (props) => (
    <>
        <Head title={props.meta?.title || 'Blog'}>
            {props.meta?.description && (
                <meta name="description" content={props.meta.description} />
            )}
        </Head>
        <Blog {...props} />
    </>
);

BlogPage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default BlogPage;

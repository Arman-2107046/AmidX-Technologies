import AnimatedSection from '@/Components/AnimatedSection';
import PublicLayout from '@/Layouts/PublicLayout';
import { useContent } from '@/lib/content';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowUpRight, Search } from 'lucide-react';
import { useState } from 'react';

function CategoryPills({ categories, active }) {
    const go = (slug) =>
        router.get(
            '/blog',
            slug ? { category: slug } : {},
            { preserveState: true, preserveScroll: true },
        );

    if (categories.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={() => go(null)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    !active
                        ? 'bg-foreground text-background'
                        : 'border border-border text-muted-foreground hover:text-foreground'
                }`}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category.slug}
                    onClick={() => go(category.slug)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        active === category.slug
                            ? 'bg-foreground text-background'
                            : 'border border-border text-muted-foreground hover:text-foreground'
                    }`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}

function FeaturedPost({ post }) {
    return (
        <AnimatedSection>
            <Link
                href={post.url}
                className="group grid gap-8 lg:grid-cols-2 lg:items-center"
            >
                <div className="aspect-[16/10] overflow-hidden rounded-3xl bg-muted">
                    {post.cover_url ? (
                        <img
                            src={post.cover_url}
                            alt={post.cover_alt}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-muted to-border" />
                    )}
                </div>

                <div>
                    <div className="mb-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        <span className="border border-border px-3 py-1.5 font-semibold">
                            Featured
                        </span>
                        {post.categories?.slice(0, 2).map((c) => (
                            <span key={c.slug}>{c.name}</span>
                        ))}
                    </div>

                    <h2 className="text-3xl font-bold leading-tight tracking-tight transition-opacity group-hover:opacity-70 md:text-5xl">
                        {post.title}
                    </h2>

                    {post.excerpt && (
                        <p className="mt-4 text-lg text-muted-foreground">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                        {post.author && <span>{post.author}</span>}
                        {post.author && <span>&middot;</span>}
                        <time dateTime={post.published_at}>
                            {post.published_label}
                        </time>
                        <span>&middot;</span>
                        <span>{post.reading_minutes} min read</span>
                    </div>

                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
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
        <AnimatedSection delay={(index % 3) * 0.08}>
            <Link href={post.url} className="group flex h-full flex-col">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
                    {post.cover_url ? (
                        <img
                            src={post.cover_url}
                            alt={post.cover_alt}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-muted to-border" />
                    )}
                </div>

                <div className="flex flex-1 flex-col pt-5">
                    {post.categories?.length > 0 && (
                        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {post.categories[0].name}
                        </p>
                    )}

                    <h3 className="text-xl font-semibold leading-snug tracking-tight transition-opacity group-hover:opacity-70">
                        {post.title}
                    </h3>

                    {post.excerpt && (
                        <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="mt-auto flex items-center gap-2 pt-5 text-xs text-muted-foreground">
                        <time dateTime={post.published_at}>
                            {post.published_label}
                        </time>
                        <span>&middot;</span>
                        <span>{post.reading_minutes} min read</span>
                    </div>
                </div>
            </Link>
        </AnimatedSection>
    );
}

const Blog = ({ featured, posts, categories, filters }) => {
    const t = useContent();
    const [search, setSearch] = useState(filters.search ?? '');

    const submitSearch = (e) => {
        e.preventDefault();
        router.get(
            '/blog',
            { search: search || undefined, category: filters.category || undefined },
            { preserveState: true },
        );
    };

    const hasPosts = featured || posts.data.length > 0;

    return (
        <>
            {/* Hero */}
            <section className="border-b border-border py-20 md:py-32">
                <div className="container mx-auto px-6 lg:px-8">
                    <AnimatedSection className="max-w-4xl">
                        <span className="mb-6 inline-block rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
                            {t('hero.eyebrow', 'Insights')}
                        </span>

                        <h1 className="mb-8 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                            {t('hero.title', 'Engineering')}
                            <br />
                            <span className="text-muted-foreground">
                                {t('hero.title_accent', 'notes & perspectives')}
                            </span>
                        </h1>

                        <p className="max-w-2xl text-xl text-muted-foreground">
                            {t(
                                'hero.subtitle',
                                'Deep dives on software architecture, cloud infrastructure and product design from the AmidX team.',
                            )}
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Filters */}
            <section className="border-b border-border py-8">
                <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-6 lg:px-8">
                    <CategoryPills
                        categories={categories}
                        active={filters.category}
                    />

                    <form onSubmit={submitSearch} className="relative">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search articles"
                            className="w-full rounded-full border-border bg-background py-2.5 pl-11 pr-4 text-sm text-foreground focus:border-foreground focus:ring-0 sm:w-64"
                        />
                    </form>
                </div>
            </section>

            {!hasPosts ? (
                <section className="py-32">
                    <div className="container mx-auto px-6 text-center lg:px-8">
                        <p className="text-lg text-muted-foreground">
                            {filters.search || filters.category
                                ? 'No articles match that search yet.'
                                : 'No articles published yet. Check back soon.'}
                        </p>
                        {(filters.search || filters.category) && (
                            <button
                                onClick={() => router.get('/blog')}
                                className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                </section>
            ) : (
                <>
                    {featured && (
                        <section className="border-b border-border py-16 md:py-20">
                            <div className="container mx-auto px-6 lg:px-8">
                                <FeaturedPost post={featured} />
                            </div>
                        </section>
                    )}

                    <section className="py-16 md:py-20">
                        <div className="container mx-auto px-6 lg:px-8">
                            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                                {posts.data.map((post, i) => (
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                        index={i}
                                    />
                                ))}
                            </div>

                            {posts.last_page > 1 && (
                                <div className="mt-16 flex flex-wrap justify-center gap-2">
                                    {posts.links.map((link, i) => (
                                        <button
                                            key={i}
                                            disabled={!link.url}
                                            onClick={() =>
                                                link.url &&
                                                router.get(link.url, {}, {
                                                    preserveState: true,
                                                })
                                            }
                                            className={`rounded-full px-4 py-2 text-sm transition-colors ${
                                                link.active
                                                    ? 'bg-foreground text-background'
                                                    : 'border border-border text-muted-foreground hover:text-foreground disabled:opacity-30'
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

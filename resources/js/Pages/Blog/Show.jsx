import AnimatedSection from '@/Components/AnimatedSection';
import PostCover from '@/Components/PostCover';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowUpRight, Check, Link2 } from 'lucide-react';
import { useEffect, useState } from 'react';

/** Thin progress bar showing how far through the article the reader is. */
function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollable =
                document.documentElement.scrollHeight - window.innerHeight;
            setProgress(
                scrollable > 0
                    ? Math.min(100, (window.scrollY / scrollable) * 100)
                    : 0,
            );
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div
            className="fixed left-0 right-0 top-0 z-[60] h-0.5 bg-transparent"
            role="progressbar"
            aria-label="Reading progress"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div
                className="h-full bg-foreground"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}

function CopyLinkButton() {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard blocked (insecure context or denied permission);
            // stay silent rather than throwing at the reader.
        }
    };

    return (
        <button
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
        >
            {copied ? (
                <Check className="h-4 w-4" />
            ) : (
                <Link2 className="h-4 w-4" />
            )}
            {copied ? 'Link copied' : 'Copy link'}
        </button>
    );
}

/** Initials avatar — the author has no uploaded image. */
function AuthorMark({ name }) {
    const initials = (name || '?')
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();

    return (
        <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background"
            aria-hidden="true"
        >
            {initials}
        </span>
    );
}

function RelatedCard({ post }) {
    return (
        <Link href={post.url} className="group flex flex-col">
            <div className="aspect-[3/2] overflow-hidden rounded-2xl bg-muted">
                <PostCover
                    post={post}
                    className="transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                />
            </div>

            <p className="mb-2 mt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {post.categories?.[0]?.name ?? 'Article'}
            </p>

            <h3 className="text-balance font-semibold leading-snug tracking-tight transition-opacity duration-300 group-hover:opacity-60">
                {post.title}
            </h3>

            <p className="mt-2 text-xs text-muted-foreground">
                {post.published_label} &middot; {post.reading_minutes} min read
            </p>
        </Link>
    );
}

const BlogShow = ({ post, related }) => {
    // One measure for the whole article column, so the header, body and
    // footer all share the same left edge.
    const column = 'mx-auto w-full max-w-[44rem]';

    return (
        <>
            <ReadingProgress />

            <article>
                <header className="pt-32 md:pt-44">
                    <div className="container mx-auto px-6 lg:px-8">
                        <AnimatedSection className={column}>
                            <Link
                                href="/blog"
                                className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                All articles
                            </Link>

                            {post.categories?.length > 0 && (
                                <div className="mb-6 flex flex-wrap gap-4">
                                    {post.categories.map((c) => (
                                        <Link
                                            key={c.slug}
                                            href={`/blog?category=${c.slug}`}
                                            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {c.name}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-[3.5rem]">
                                {post.title}
                            </h1>

                            {post.excerpt && (
                                <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
                                    {post.excerpt}
                                </p>
                            )}

                            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-border py-5">
                                <div className="flex items-center gap-3">
                                    {post.author && (
                                        <AuthorMark name={post.author} />
                                    )}
                                    <div className="text-sm leading-tight">
                                        {post.author && (
                                            <p className="font-medium text-foreground">
                                                {post.author}
                                            </p>
                                        )}
                                        <p className="text-muted-foreground">
                                            <time dateTime={post.published_at}>
                                                {post.published_label}
                                            </time>
                                            {' · '}
                                            {post.reading_minutes} min read
                                        </p>
                                    </div>
                                </div>

                                <CopyLinkButton />
                            </div>
                        </AnimatedSection>
                    </div>
                </header>

                {/* Cover — wider than the text column for a deliberate break */}
                {post.cover_url && (
                    <div className="container mx-auto px-6 py-12 md:py-16 lg:px-8">
                        <AnimatedSection className="mx-auto max-w-5xl">
                            <div className="aspect-[2/1] overflow-hidden rounded-3xl bg-muted">
                                <PostCover post={post} sizes="100vw" />
                            </div>
                        </AnimatedSection>
                    </div>
                )}

                <div className="container mx-auto px-6 lg:px-8">
                    <div
                        className={`article-body ${column} ${post.cover_url ? 'pb-20 md:pb-28' : 'py-12 pb-20 md:py-16 md:pb-28'}`}
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />

                    {/* Footer shares the article measure so nothing shifts */}
                    <div className={`${column} border-t border-border py-10`}>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                All articles
                            </Link>
                            <CopyLinkButton />
                        </div>
                    </div>
                </div>
            </article>

            {related.length > 0 && (
                <section className="border-t border-border py-16 md:py-24">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="mb-12 flex items-baseline justify-between">
                            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                Keep reading
                            </h2>
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                View all
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                            {related.map((item) => (
                                <RelatedCard key={item.id} post={item} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

const BlogShowPage = (props) => (
    <>
        <Head title={props.post?.meta_title || props.post?.title || 'Article'}>
            {(props.post?.meta_description || props.post?.excerpt) && (
                <meta
                    name="description"
                    content={
                        props.post.meta_description || props.post.excerpt
                    }
                />
            )}
        </Head>
        <BlogShow {...props} />
    </>
);

BlogShowPage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default BlogShowPage;

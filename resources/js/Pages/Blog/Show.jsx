import AnimatedSection from '@/Components/AnimatedSection';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Check, Link2 } from 'lucide-react';
import { useEffect, useState } from 'react';

/** Thin progress bar showing how far through the article the reader is. */
function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollable =
                document.documentElement.scrollHeight - window.innerHeight;
            setProgress(
                scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0,
            );
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="fixed left-0 right-0 top-0 z-[60] h-0.5 bg-transparent">
            <div
                className="h-full bg-foreground transition-[width] duration-150"
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
            // leave the button silent rather than throwing at the reader.
        }
    };

    return (
        <button
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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

function RelatedCard({ post }) {
    return (
        <Link href={post.url} className="group flex flex-col">
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
            <h3 className="mt-4 font-semibold leading-snug tracking-tight transition-opacity group-hover:opacity-70">
                {post.title}
            </h3>
            <p className="mt-2 text-xs text-muted-foreground">
                {post.published_label} &middot; {post.reading_minutes} min read
            </p>
        </Link>
    );
}

const BlogShow = ({ post, related }) => {
    return (
        <>
            <ReadingProgress />

            <article>
                {/* Header */}
                <header className="pt-20 md:pt-32">
                    <div className="container mx-auto px-6 lg:px-8">
                        <AnimatedSection className="mx-auto max-w-3xl">
                            <Link
                                href="/blog"
                                className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                All articles
                            </Link>

                            {post.categories?.length > 0 && (
                                <div className="mb-6 flex flex-wrap gap-2">
                                    {post.categories.map((c) => (
                                        <Link
                                            key={c.slug}
                                            href={`/blog?category=${c.slug}`}
                                            className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {c.name}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
                                {post.title}
                            </h1>

                            {post.excerpt && (
                                <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
                                    {post.excerpt}
                                </p>
                            )}

                            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-8 text-sm text-muted-foreground">
                                {post.author && (
                                    <>
                                        <span className="font-medium text-foreground">
                                            {post.author}
                                        </span>
                                        <span>&middot;</span>
                                    </>
                                )}
                                <time dateTime={post.published_at}>
                                    {post.published_label}
                                </time>
                                <span>&middot;</span>
                                <span>{post.reading_minutes} min read</span>

                                <div className="ml-auto">
                                    <CopyLinkButton />
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </header>

                {/* Cover */}
                {post.cover_url && (
                    <div className="container mx-auto px-6 py-12 lg:px-8 md:py-16">
                        <AnimatedSection className="mx-auto max-w-5xl">
                            <div className="aspect-[21/9] overflow-hidden rounded-3xl bg-muted">
                                <img
                                    src={post.cover_url}
                                    alt={post.cover_alt}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </AnimatedSection>
                    </div>
                )}

                {/* Body */}
                <div className="container mx-auto px-6 pb-20 lg:px-8 md:pb-28">
                    <div
                        className="prose prose-neutral prose-lg mx-auto max-w-3xl
                                   prose-headings:font-bold prose-headings:tracking-tight
                                   prose-a:text-foreground prose-a:underline-offset-4
                                   prose-blockquote:border-l-foreground prose-blockquote:not-italic
                                   prose-img:rounded-2xl
                                   prose-pre:rounded-2xl prose-pre:bg-foreground prose-pre:text-background"
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                </div>
            </article>

            {/* Related */}
            {related.length > 0 && (
                <section className="border-t border-border py-16 md:py-24">
                    <div className="container mx-auto px-6 lg:px-8">
                        <h2 className="mb-10 text-2xl font-bold tracking-tight md:text-3xl">
                            Keep reading
                        </h2>

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

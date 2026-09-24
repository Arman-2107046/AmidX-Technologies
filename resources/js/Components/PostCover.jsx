/**
 * Cover art for a post.
 *
 * Posts without an uploaded image used to fall back to a near-white
 * gradient, which read as a broken image on a white page. Instead we
 * draw a deterministic monochrome placeholder from the post's title, so
 * a coverless post still looks deliberate and no two look alike.
 */

const PATTERNS = ['grid', 'rings', 'diagonals', 'dots'];

/** Stable hash so the same post always gets the same artwork. */
function hash(text = '') {
    let h = 0;
    for (let i = 0; i < text.length; i++) {
        h = (h << 5) - h + text.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h);
}

function Placeholder({ title, className = '' }) {
    const seed = hash(title);
    const pattern = PATTERNS[seed % PATTERNS.length];
    const initials = (title || '?')
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();

    return (
        <div
            className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-foreground ${className}`}
            aria-hidden="true"
        >
            <svg
                className="absolute inset-0 h-full w-full text-background/[0.14]"
                preserveAspectRatio="xMidYMid slice"
                viewBox="0 0 400 250"
            >
                {pattern === 'grid' && (
                    <g stroke="currentColor" strokeWidth="1">
                        {Array.from({ length: 13 }, (_, i) => (
                            <line
                                key={`v${i}`}
                                x1={i * 32}
                                y1="0"
                                x2={i * 32}
                                y2="250"
                            />
                        ))}
                        {Array.from({ length: 9 }, (_, i) => (
                            <line
                                key={`h${i}`}
                                x1="0"
                                y1={i * 32}
                                x2="400"
                                y2={i * 32}
                            />
                        ))}
                    </g>
                )}

                {pattern === 'rings' && (
                    <g fill="none" stroke="currentColor" strokeWidth="1">
                        {Array.from({ length: 9 }, (_, i) => (
                            <circle
                                key={i}
                                cx="330"
                                cy="40"
                                r={30 + i * 34}
                            />
                        ))}
                    </g>
                )}

                {pattern === 'diagonals' && (
                    <g stroke="currentColor" strokeWidth="1">
                        {Array.from({ length: 22 }, (_, i) => (
                            <line
                                key={i}
                                x1={i * 30 - 250}
                                y1="250"
                                x2={i * 30}
                                y2="0"
                            />
                        ))}
                    </g>
                )}

                {pattern === 'dots' && (
                    <g fill="currentColor">
                        {Array.from({ length: 10 }, (_, r) =>
                            Array.from({ length: 16 }, (_, c) => (
                                <circle
                                    key={`${r}-${c}`}
                                    cx={c * 26 + 13}
                                    cy={r * 26 + 13}
                                    r="1.8"
                                />
                            )),
                        )}
                    </g>
                )}
            </svg>

            <span className="relative select-none text-4xl font-bold tracking-tight text-background/90">
                {initials}
            </span>
        </div>
    );
}

export default function PostCover({ post, className = '', sizes }) {
    if (post.cover_url) {
        return (
            <img
                src={post.cover_url}
                alt={post.cover_alt || post.title}
                loading="lazy"
                sizes={sizes}
                className={`h-full w-full object-cover ${className}`}
            />
        );
    }

    return <Placeholder title={post.title} className={className} />;
}

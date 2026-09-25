/**
 * Deterministic monochrome artwork for anything without a real image.
 *
 * The pattern is chosen by hashing the supplied text, so the same post or
 * project always draws the same cover, and neighbouring cards differ.
 * Shared by the blog and the portfolio so the two read as one system.
 */

const PATTERNS = ['grid', 'rings', 'diagonals', 'dots'];

function hash(text = '') {
    let h = 0;
    for (let i = 0; i < text.length; i++) {
        h = (h << 5) - h + text.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h);
}

export function initialsOf(text = '?') {
    return text
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();
}

export default function GenerativeCover({
    seed = '',
    label,
    className = '',
    markClass = 'text-4xl',
}) {
    const n = hash(seed);
    const pattern = PATTERNS[n % PATTERNS.length];

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
                            <circle key={i} cx="330" cy="40" r={30 + i * 34} />
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

            <span
                className={`relative select-none font-bold tracking-tight text-background/90 ${markClass}`}
            >
                {label}
            </span>
        </div>
    );
}

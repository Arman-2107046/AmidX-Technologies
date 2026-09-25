import GenerativeCover from '@/Components/GenerativeCover';
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.16, 1, 0.3, 1];

/**
 * A line of type rising out of a mask.
 *
 * Clipped by the parent rather than faded, which reads as print coming off
 * a press instead of a generic fade-in.
 */
function MaskedLine({ children, delay = 0, className = '' }) {
    const reduced = useReducedMotion();

    if (reduced) {
        return <span className={`block ${className}`}>{children}</span>;
    }

    return (
        <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
                className={`block ${className}`}
                initial={{ y: '112%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay, ease: EASE }}
            >
                {children}
            </motion.span>
        </span>
    );
}

function Fade({ children, delay = 0, className = '' }) {
    const reduced = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={reduced ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    );
}

/**
 * Shared hero band.
 *
 * Composition, not decoration: a hairline index rule, display type that
 * rises out of a mask, and media that wipes open rather than fading in.
 * Everything renders statically under prefers-reduced-motion.
 */
export default function PageHero({
    eyebrow,
    title,
    titleAccent,
    subtitle,
    image,
    imageAlt,
    seed,
    meta,
    children,
    align = 'split',
}) {
    const ref = useRef(null);
    const reduced = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    // The media drifts slower than the page, and the type lifts away.
    const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
    const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
    const textFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const hasMedia = align !== 'text';

    return (
        <section
            ref={ref}
            className="relative overflow-hidden border-b border-border pb-20 pt-32 md:pb-28 md:pt-40"
        >
            <div className="container relative mx-auto px-6 lg:px-8">
                {/* Index rule — the eyebrow sits on a hairline rather than
                    floating above the headline like a generic tag. */}
                <Fade delay={0.04}>
                    <div className="mb-12 flex items-center gap-6 md:mb-16">
                        {eyebrow && (
                            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                                {eyebrow}
                            </span>
                        )}
                        <span className="h-px flex-1 bg-border" />
                        {meta && (
                            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                {meta}
                            </span>
                        )}
                    </div>
                </Fade>

                <div
                    className={
                        hasMedia
                            ? 'grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20'
                            : ''
                    }
                >
                    <motion.div
                        style={
                            reduced ? undefined : { y: textY, opacity: textFade }
                        }
                        className={hasMedia ? '' : 'max-w-4xl'}
                    >
                        <h1 className="text-balance text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.035em]">
                            <MaskedLine delay={0.1}>{title}</MaskedLine>
                            {titleAccent && (
                                <MaskedLine
                                    delay={0.22}
                                    className="text-muted-foreground"
                                >
                                    {titleAccent}
                                </MaskedLine>
                            )}
                        </h1>

                        {subtitle && (
                            <Fade delay={0.44}>
                                <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
                                    {subtitle}
                                </p>
                            </Fade>
                        )}

                        {children && <Fade delay={0.56}>{children}</Fade>}
                    </motion.div>

                    {hasMedia && (
                        <motion.div
                            // A wipe rather than a fade: the frame opens from
                            // the bottom, so the image arrives composed.
                            initial={
                                reduced
                                    ? false
                                    : { clipPath: 'inset(100% 0 0 0)' }
                            }
                            animate={
                                reduced ? false : { clipPath: 'inset(0% 0 0 0)' }
                            }
                            transition={{
                                duration: 1.25,
                                delay: 0.25,
                                ease: EASE,
                            }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-muted lg:aspect-square">
                                <motion.div
                                    style={
                                        reduced
                                            ? undefined
                                            : { y: mediaY, scale: mediaScale }
                                    }
                                    className="absolute inset-0 h-full w-full"
                                >
                                    {image ? (
                                        <img
                                            src={image}
                                            alt={imageAlt || ''}
                                            className="h-full w-full object-cover grayscale"
                                        />
                                    ) : (
                                        <GenerativeCover
                                            seed={seed || title || 'amidx'}
                                            label=""
                                        />
                                    )}
                                </motion.div>
                            </div>

                            {/* Caption rule, tying the media back to the grid */}
                            {imageAlt && image && (
                                <Fade delay={0.9}>
                                    <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                                        {imageAlt}
                                    </p>
                                </Fade>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Scroll cue — a line that breathes rather than a bouncing arrow */}
            {!reduced && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-1/2 hidden -translate-x-1/2 lg:block"
                >
                    <motion.span
                        animate={{ scaleY: [0.25, 1, 0.25] }}
                        transition={{
                            repeat: Infinity,
                            duration: 2.6,
                            ease: 'easeInOut',
                        }}
                        className="block h-14 w-px origin-bottom bg-foreground/25"
                    />
                </motion.div>
            )}
        </section>
    );
}

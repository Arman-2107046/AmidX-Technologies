import GenerativeCover from '@/Components/GenerativeCover';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.16, 1, 0.3, 1];

/**
 * A line of type that rises out of a mask.
 *
 * The mask is the parent's overflow-hidden, so the text is clipped rather
 * than faded — the effect reads as print coming off a press instead of a
 * generic fade-in.
 */
function MaskedLine({ children, delay = 0, className = '' }) {
    const reduced = useReducedMotion();

    if (reduced) {
        return <span className={`block ${className}`}>{children}</span>;
    }

    return (
        <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
                className={`block ${className}`}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay, ease: EASE }}
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
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={reduced ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    );
}

/**
 * Shared hero band for the secondary pages.
 *
 * Text rises out of a mask in a stagger, while the image settles from a
 * slight over-scale and then drifts on scroll. Everything collapses to a
 * static render when the visitor prefers reduced motion.
 */
export default function PageHero({
    eyebrow,
    title,
    titleAccent,
    subtitle,
    image,
    imageAlt,
    seed,
    children,
    align = 'split',
}) {
    const ref = useRef(null);
    const reduced = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    // Gentle parallax: the image drifts slower than the page.
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

    const hasMedia = align !== 'text';

    return (
        <section
            ref={ref}
            className="relative overflow-hidden border-b border-border pb-16 pt-32 md:pb-24 md:pt-44"
        >
            {/* Faint grid, anchored to the hero, fading out at the baseline */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.55] [mask-image:linear-gradient(to_bottom,black,transparent)]"
            >
                <div className="dot-bg h-full w-full" />
            </div>

            <div className="container relative mx-auto px-6 lg:px-8">
                <div
                    className={
                        hasMedia
                            ? 'grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16'
                            : ''
                    }
                >
                    <div className={hasMedia ? '' : 'max-w-4xl'}>
                        {eyebrow && (
                            <Fade delay={0.05}>
                                <span className="mb-6 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                                    {eyebrow}
                                </span>
                            </Fade>
                        )}

                        <h1 className="text-balance text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
                            <MaskedLine delay={0.12}>{title}</MaskedLine>
                            {titleAccent && (
                                <MaskedLine
                                    delay={0.24}
                                    className="text-muted-foreground"
                                >
                                    {titleAccent}
                                </MaskedLine>
                            )}
                        </h1>

                        {subtitle && (
                            <Fade delay={0.42}>
                                <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                                    {subtitle}
                                </p>
                            </Fade>
                        )}

                        {children && <Fade delay={0.54}>{children}</Fade>}
                    </div>

                    {hasMedia && (
                        <motion.div
                            initial={reduced ? false : { opacity: 0, scale: 1.06 }}
                            animate={reduced ? false : { opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
                            className="relative"
                        >
                            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-muted lg:aspect-[4/3]">
                                <motion.div
                                    style={reduced ? undefined : { y, scale }}
                                    className="absolute inset-0 h-full w-full"
                                >
                                    {image ? (
                                        <img
                                            src={image}
                                            alt={imageAlt || ''}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <GenerativeCover
                                            seed={seed || title || 'amidx'}
                                            label=""
                                        />
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}

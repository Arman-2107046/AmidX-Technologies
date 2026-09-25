import GenerativeCover, { initialsOf } from '@/Components/GenerativeCover';
import { useEffect, useRef, useState } from 'react';

/**
 * Card media for a project.
 *
 * Shows the cover image, and when a video exists plays it muted on hover.
 * The video is only attached to the DOM once the card is first hovered, so
 * a grid of twelve projects does not download twelve videos on page load.
 *
 * Falls back in order: video (on hover) -> cover image -> generative mark.
 */
export default function ProjectMedia({ project, active = false, className = '' }) {
    const videoRef = useRef(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [canPlay, setCanPlay] = useState(false);

    const hasVideo = Boolean(project.video_src);

    useEffect(() => {
        if (active && hasVideo) {
            setShouldLoad(true);
        }
    }, [active, hasVideo]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Respect a reader who has asked for less motion.
        const reduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        if (active && !reduced) {
            // play() rejects if the element is detached mid-transition.
            video.play().catch(() => {});
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }, [active, shouldLoad]);

    return (
        <div className={`relative h-full w-full overflow-hidden ${className}`}>
            {/* Poster / fallback */}
            {project.cover_url ? (
                <img
                    src={project.cover_url}
                    alt={project.cover_alt || project.title}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-opacity duration-500 ${
                        canPlay && active ? 'opacity-0' : 'opacity-100'
                    }`}
                />
            ) : (
                <GenerativeCover
                    seed={project.slug || project.title}
                    label={initialsOf(project.client || project.title)}
                    markClass="text-3xl"
                />
            )}

            {hasVideo && shouldLoad && (
                <video
                    ref={videoRef}
                    src={project.video_src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onCanPlay={() => setCanPlay(true)}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                        canPlay && active ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            )}

            {/* Small marker so it is obvious a card holds motion */}
            {hasVideo && (
                <span
                    className={`absolute bottom-3 right-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground transition-opacity duration-300 ${
                        active ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                    Video
                </span>
            )}
        </div>
    );
}

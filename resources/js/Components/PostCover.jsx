import GenerativeCover, { initialsOf } from '@/Components/GenerativeCover';

/**
 * Cover art for a post: the uploaded image, or generative artwork drawn
 * from the title so a coverless post still looks deliberate.
 */
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

    return (
        <GenerativeCover
            seed={post.title}
            label={initialsOf(post.title)}
            className={className}
        />
    );
}

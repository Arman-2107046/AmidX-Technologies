import { usePage } from '@inertiajs/react';

/**
 * Reads CMS content for the current page.
 *
 * Every lookup takes a fallback, which is the copy already hard-coded in
 * the component. If the CMS has no value for a key - because the admin
 * database is empty, unreachable, or the field was cleared - the page
 * renders its original text instead of a blank space.
 *
 *   const t = useContent();
 *   <h1>{t('hero.title', 'Build.')}</h1>
 */
export function useContent() {
    const { content } = usePage().props;

    return (key, fallback = '') => {
        const value = content?.[key];

        if (value === undefined || value === null || value === '') {
            return fallback;
        }

        return value;
    };
}

/**
 * Reads a global site setting (contact details, social links, ...).
 *
 *   const s = useSetting();
 *   <a href={`mailto:${s('contact.email', 'business@amidx.net')}`}>
 */
export function useSetting() {
    const { settings } = usePage().props;

    return (key, fallback = '') => {
        const value = settings?.[key];

        if (value === undefined || value === null || value === '') {
            return fallback;
        }

        return value;
    };
}

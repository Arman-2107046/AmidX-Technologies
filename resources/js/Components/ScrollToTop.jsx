import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

const ScrollToTop = () => {
    // Inertia exposes the current URL where react-router used useLocation().
    const { url } = usePage();
    const pathname = url.split('?')[0];

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth', // change to "auto" if you want instant
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;

import CustomCursor from '@/Components/CustomCursor';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import ScrollToTop from '@/Components/ScrollToTop';
import { Toaster } from '@/Components/ui/toaster';

/**
 * Mirrors the shell that App.tsx provided in the standalone AmidX app:
 * a global cursor, scroll-reset on navigation, and the Navbar/Footer
 * wrapper around the routed page.
 */
export default function PublicLayout({ children }) {
    return (
        <>
            <Toaster />
            <CustomCursor />
            <ScrollToTop />

            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </>
    );
}

import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/Components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  const { url } = usePage();
  const pathname = url.split('?')[0];

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center pt-20">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="text-[12rem] font-bold leading-none text-muted-foreground/10 mb-8">
            404
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 -mt-20">
            Page not found
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="premium" size="lg" asChild>
              <Link href="/">
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </Button>
            <Button variant="premiumOutline" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const NotFoundPage = (props) => (
    <>
        <Head title="Page Not Found" />
        <NotFound {...props} />
    </>
);

NotFoundPage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default NotFoundPage;

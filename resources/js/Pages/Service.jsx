import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import AnimatedSection from '@/Components/AnimatedSection';

const Service = () => {
  return (
    <div className="min-h-screen bg-background pt-20">

      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <AnimatedSection className="max-w-4xl">
            <span className="inline-block px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-full mb-6">
              Legal
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
              Terms of
              <br />
              <span className="text-muted-foreground">Service</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl">
              These terms govern your use of our website and services. By accessing or using
              our services, you agree to comply with these terms.
            </p>

            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl space-y-12">

            <AnimatedSection>
              <div>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using our website or services, you agree to be bound by these Terms
                  of Service. If you do not agree, please do not use our services.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">2. Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AmidX Technologies provides software development, UI/UX design, cloud solutions,
                  and related digital services. We reserve the right to modify or discontinue any
                  service at any time.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Do not attempt to disrupt or misuse the platform</li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">4. Payments & Billing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All payments for services must be made according to agreed terms.
                  Late or failed payments may result in suspension or termination of services.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content, designs, code, and materials provided by AmidX remain our intellectual
                  property unless otherwise agreed in writing. Clients retain rights to their own content.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We are not liable for any indirect, incidental, or consequential damages arising
                  from the use or inability to use our services.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to suspend or terminate access to our services if users violate
                  these terms or engage in harmful activities.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.7}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update these Terms of Service at any time. Continued use of our services
                  after changes means you accept the updated terms.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.8}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions regarding these Terms, please contact us:
                  <br /><br />
                  Email: business@amidx.net<br />
                  Phone: +880 1306-789067
                </p>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

    </div>
  );
};

const ServicePage = (props) => (
    <>
        <Head title="Terms of Service" />
        <Service {...props} />
    </>
);

ServicePage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default ServicePage;

import PageHero from '@/Components/PageHero';
import PublicLayout from '@/Layouts/PublicLayout';
import { useContent } from '@/lib/content';
import { Head } from '@inertiajs/react';
import AnimatedSection from '@/Components/AnimatedSection';

const Privacy = ({ meta }) => {
  const t = useContent();

  return (
    <div className="min-h-screen bg-background pt-20">

      <PageHero
                eyebrow={t('hero.eyebrow', 'Legal')}
                title={t('hero.title', 'Privacy')}
                titleAccent={t('hero.title_accent', 'Policy')}
                subtitle={t(
                    'hero.subtitle',
                    'We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information.',
                )}
                image={meta?.hero_image}
                imageAlt={meta?.hero_image_alt}
                seed="privacy"
            />

      {/* Content */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl space-y-12">

            <AnimatedSection>
              <div>
                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may collect personal information such as your name, email address, phone number,
                  company details, and any other information you provide through forms on our website.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">2. How We Use Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use the information to provide services, respond to inquiries, improve our website,
                  and communicate important updates or offers.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">3. Data Sharing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell your personal data. We may share information with trusted third-party
                  providers only when necessary to operate our services.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">4. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website uses cookies to enhance user experience and analyze traffic.
                  You can disable cookies through your browser settings.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate security measures to protect your data.
                  However, no method of transmission over the internet is completely secure.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You have the right to access, update, or request deletion of your personal data.
                  You may also withdraw consent at any time.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us:
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

const PrivacyPage = (props) => (
    <>
        <Head title={props.meta?.title || 'Privacy Policy'}>
            {props.meta?.description && (
                <meta name="description" content={props.meta.description} />
            )}
        </Head>
        <Privacy {...props} />
    </>
);

PrivacyPage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default PrivacyPage;

import AnimatedSection from '@/Components/AnimatedSection';
import PageHero from '@/Components/PageHero';
import PublicLayout from '@/Layouts/PublicLayout';
import { useContent } from '@/lib/content';
import { Head, Link } from '@inertiajs/react';

const Cookies = ({ meta }) => {
    const t = useContent();

    return (
        <>
            <PageHero
                eyebrow={t('hero.eyebrow', 'Legal')}
                title={t('hero.title', 'Cookie')}
                titleAccent={t('hero.title_accent', 'Policy')}
                subtitle={t(
                    'hero.subtitle',
                    'How this site uses cookies, what they store, and how to control them.',
                )}
                image={meta?.hero_image}
                imageAlt={meta?.hero_image_alt}
                seed="cookies"
                align="text"
            />

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <AnimatedSection className="article-body mx-auto w-full max-w-[44rem]">
                        <p>
                            {t(
                                'body.intro',
                                'Cookies are small text files a site stores in your browser. We use as few as we can, and none of them build an advertising profile of you.',
                            )}
                        </p>

                        <h2>{t('body.h1', 'What we use')}</h2>
                        <p>
                            {t(
                                'body.p1',
                                'Strictly necessary cookies keep you signed in and protect forms against cross-site request forgery. The site does not work correctly without them, so they cannot be switched off.',
                            )}
                        </p>

                        <h2>{t('body.h2', 'What we do not use')}</h2>
                        <p>
                            {t(
                                'body.p2',
                                'We do not set advertising cookies, and we do not share browsing data with third-party ad networks.',
                            )}
                        </p>

                        <h2>{t('body.h3', 'Managing cookies')}</h2>
                        <p>
                            {t(
                                'body.p3',
                                'Every major browser lets you view, block and delete cookies from its privacy settings. Blocking the necessary ones will sign you out and may stop forms submitting.',
                            )}
                        </p>

                        <h2>{t('body.h4', 'Changes to this policy')}</h2>
                        <p>
                            {t(
                                'body.p4',
                                'If we change what we store, we will update this page and the date below.',
                            )}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>

                        <p>
                            Questions about any of this?{' '}
                            <Link href="/contact">Get in touch</Link>. You can
                            also read our <Link href="/privacy">privacy policy</Link>{' '}
                            and <Link href="/service">terms of service</Link>.
                        </p>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
};

const CookiesPage = (props) => (
    <>
        <Head title={props.meta?.title || 'Cookie Policy'}>
            {props.meta?.description && (
                <meta name="description" content={props.meta.description} />
            )}
        </Head>
        <Cookies {...props} />
    </>
);

CookiesPage.layout = (page) => <PublicLayout>{page}</PublicLayout>;

export default CookiesPage;

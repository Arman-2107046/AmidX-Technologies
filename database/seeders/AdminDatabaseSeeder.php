<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\ContentBlock;
use App\Models\Page;
use App\Models\Setting;
use Illuminate\Database\Seeder;

class AdminDatabaseSeeder extends Seeder
{
    /**
     * Seeds the admin account, the CMS page records and the editable
     * content blocks. Values mirror the copy currently hard-coded in the
     * React pages, so seeding changes nothing visually until an admin
     * edits something.
     *
     * Safe to re-run: everything is upserted on a natural key.
     */
    public function run(): void
    {
        $this->seedAdmin();
        $this->seedSettings();
        $this->seedPages();
    }

    protected function seedAdmin(): void
    {
        $email = env('ADMIN_SEED_EMAIL', 'admin@amidx.net');
        $password = env('ADMIN_SEED_PASSWORD', 'ChangeMe!2026');

        $admin = Admin::firstOrNew(['email' => $email]);
        $admin->name = env('ADMIN_SEED_NAME', 'AmidX Admin');
        $admin->is_active = true;

        // Only set the password when creating, so re-seeding never
        // clobbers a password the admin has since changed.
        if (! $admin->exists) {
            $admin->password = $password;
            $this->command?->info("Admin created: {$email} / {$password}");
            $this->command?->warn('Change this password after first login.');
        } else {
            $this->command?->info("Admin already exists: {$email} (password left unchanged)");
        }

        $admin->save();
    }

    protected function seedSettings(): void
    {
        $settings = [
            ['contact', 'contact.email', 'Email address', 'text', 'business@amidx.net'],
            ['contact', 'contact.phone', 'Phone numbers', 'text', '+880 1306-789067, +880 1988-008844'],
            ['contact', 'contact.phone_link', 'Phone (dial link)', 'text', '+8801306789067'],
            ['contact', 'contact.address', 'Office address', 'textarea', 'House 11, Road 18, Sector 4, Uttara, Dhaka, Bangladesh'],
            ['company', 'company.name', 'Company name', 'text', 'AmidX'],
            ['company', 'company.tagline', 'Footer tagline', 'textarea', 'Premium software, UI/UX, and cloud infrastructure, from domain to deployment.'],
            ['company', 'company.availability', 'Footer availability line', 'text', 'Available for new projects'],
            ['social', 'social.linkedin', 'LinkedIn URL', 'text', '#'],
            ['social', 'social.twitter', 'Twitter URL', 'text', '#'],
            ['social', 'social.github', 'GitHub URL', 'text', '#'],
        ];

        foreach ($settings as $i => [$group, $key, $label, $type, $value]) {
            Setting::updateOrCreate(
                ['key' => $key],
                [
                    'group' => $group,
                    'label' => $label,
                    'type' => $type,
                    'sort_order' => $i,
                    // Preserve an existing value on re-seed.
                    'value' => Setting::where('key', $key)->value('value') ?? $value,
                ]
            );
        }
    }

    protected function seedPages(): void
    {
        foreach ($this->pageDefinitions() as $i => $definition) {
            $page = Page::updateOrCreate(
                ['slug' => $definition['slug']],
                [
                    'name' => $definition['name'],
                    'route' => $definition['route'],
                    'meta_title' => $definition['meta_title'],
                    'meta_description' => $definition['meta_description'],
                    'is_published' => true,
                    'sort_order' => $i,
                ]
            );

            foreach ($definition['blocks'] as $j => $block) {
                [$section, $key, $label, $type, $value] = $block;

                $existing = ContentBlock::where('page_id', $page->id)
                    ->where('key', $key)
                    ->first();

                ContentBlock::updateOrCreate(
                    ['page_id' => $page->id, 'key' => $key],
                    [
                        'section' => $section,
                        'label' => $label,
                        'type' => $type,
                        'sort_order' => $j,
                        // Never overwrite content an admin has edited.
                        'value' => $existing?->value ?? $value,
                    ]
                );
            }
        }
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    protected function pageDefinitions(): array
    {
        return [
            [
                'slug' => 'home',
                'name' => 'Home',
                'route' => '/',
                'meta_title' => 'AmidX Technologies',
                'meta_description' => 'AmidX Technologies engineers full-cycle digital products built for the enterprises of tomorrow.',
                'blocks' => [
                    ['hero', 'hero.line1', 'Hero line 1', 'text', 'Build.'],
                    ['hero', 'hero.line2', 'Hero line 2 (outlined)', 'text', 'Scale.'],
                    ['hero', 'hero.line3', 'Hero line 3', 'text', 'Dominate.'],
                    ['hero', 'hero.subtitle', 'Hero subtitle', 'textarea', 'AmidX Technologies engineers full-cycle digital products built for the enterprises of tomorrow.'],
                ],
            ],
            [
                'slug' => 'solutions',
                'name' => 'Solutions',
                'route' => '/solutions',
                'meta_title' => 'Solutions',
                'meta_description' => 'Engineering services spanning software, design, cloud and infrastructure.',
                'blocks' => [
                    ['hero', 'hero.eyebrow', 'Eyebrow label', 'text', 'Solutions'],
                    ['hero', 'hero.title', 'Hero title', 'text', 'Solutions'],
                    ['hero', 'hero.subtitle', 'Hero subtitle', 'textarea', 'Engineering services spanning software, design, cloud and infrastructure.'],
                ],
            ],
            [
                'slug' => 'about',
                'name' => 'About',
                'route' => '/about',
                'meta_title' => 'About',
                'meta_description' => 'We design, build, and scale modern digital solutions.',
                'blocks' => [
                    ['hero', 'hero.eyebrow', 'Eyebrow label', 'text', 'About Us'],
                    ['hero', 'hero.title', 'Hero title', 'text', 'Building digital products'],
                    ['hero', 'hero.title_accent', 'Hero title (muted line)', 'text', 'with purpose and precision'],
                    ['hero', 'hero.subtitle', 'Hero subtitle', 'textarea', 'We design, build, and scale modern digital solutions, from software development to cloud infrastructure, helping businesses grow with confidence.'],
                    ['hero', 'hero.cta_label', 'Hero button label', 'text', 'Work With Us'],
                    ['hero', 'hero.cta_href', 'Hero button link', 'text', '/contact'],
                ],
            ],
            [
                'slug' => 'contact',
                'name' => 'Contact',
                'route' => '/contact',
                'meta_title' => 'Contact',
                'meta_description' => 'Tell us about your product or idea.',
                'blocks' => [
                    ['hero', 'hero.eyebrow', 'Eyebrow label', 'text', 'Contact'],
                    ['hero', 'hero.title', 'Hero title', 'text', 'Let’s build something'],
                    ['hero', 'hero.title_accent', 'Hero title (muted line)', 'text', 'exceptional'],
                    ['hero', 'hero.subtitle', 'Hero subtitle', 'textarea', 'Tell us about your product or idea. We’ll review your requirements and respond within 24 hours.'],
                    ['form', 'form.success_title', 'Submit toast title', 'text', 'Message received'],
                    ['form', 'form.success_body', 'Submit toast body', 'textarea', 'Our team will get back to you within 24 hours.'],
                ],
            ],
            [
                'slug' => 'pricing',
                'name' => 'Pricing',
                'route' => '/pricing',
                'meta_title' => 'Pricing',
                'meta_description' => 'Engagement models designed to match your ambitions.',
                'blocks' => [
                    ['hero', 'hero.eyebrow', 'Eyebrow label', 'text', 'Premium Engagement Models'],
                    ['hero', 'hero.title', 'Hero title', 'text', 'Tailored Digital Solutions'],
                    ['hero', 'hero.title_accent', 'Hero title (muted line)', 'text', 'for Every Stage of Growth'],
                    ['hero', 'hero.subtitle', 'Hero subtitle', 'textarea', 'From rapid MVPs to enterprise-grade systems, our engagement models are designed to match your ambitions, technical requirements, and long-term vision.'],
                ],
            ],
            [
                'slug' => 'portfolio',
                'name' => 'Portfolio',
                'route' => '/portfolio',
                'meta_title' => 'Portfolio',
                'meta_description' => 'Products we have designed, built and deployed, from first commit to production.',
                'blocks' => [
                    ['hero', 'hero.eyebrow', 'Eyebrow label', 'text', 'Portfolio'],
                    ['hero', 'hero.title', 'Hero title', 'text', 'Work we have'],
                    ['hero', 'hero.title_accent', 'Hero title (muted line)', 'text', 'shipped'],
                    ['hero', 'hero.subtitle', 'Hero subtitle', 'textarea', 'Products we have designed, built and deployed, from first commit to production.'],
                    ['cta', 'cta.title', 'Closing CTA heading', 'text', 'Have something you want built properly?'],
                    ['cta', 'cta.label', 'Closing CTA button', 'text', 'Start a project'],
                ],
            ],
            [
                'slug' => 'blog',
                'name' => 'Blog',
                'route' => '/blog',
                'meta_title' => 'Blog',
                'meta_description' => 'Deep dives on software architecture, cloud infrastructure and product design from the AmidX team.',
                'blocks' => [
                    ['hero', 'hero.eyebrow', 'Eyebrow label', 'text', 'Insights'],
                    ['hero', 'hero.title', 'Hero title', 'text', 'Engineering'],
                    ['hero', 'hero.title_accent', 'Hero title (muted line)', 'text', 'notes & perspectives'],
                    ['hero', 'hero.subtitle', 'Hero subtitle', 'textarea', 'Deep dives on software architecture, cloud infrastructure and product design from the AmidX team.'],
                ],
            ],
            [
                'slug' => 'clients',
                'name' => 'Clients',
                'route' => '/clients',
                'meta_title' => 'Clients',
                'meta_description' => 'Teams who needed something built properly, and stayed with us after it shipped.',
                'blocks' => [
                    ['hero', 'hero.eyebrow', 'Eyebrow label', 'text', 'Clients'],
                    ['hero', 'hero.title', 'Hero title', 'text', 'Who we'],
                    ['hero', 'hero.title_accent', 'Hero title (muted line)', 'text', 'build for'],
                    ['hero', 'hero.subtitle', 'Hero subtitle', 'textarea', 'Teams who needed something built properly, and stayed with us after it shipped.'],
                    ['cta', 'cta.title', 'Closing CTA heading', 'text', 'Want to be on this page?'],
                    ['cta', 'cta.label', 'Closing CTA button', 'text', 'Start a project'],
                ],
            ],
            [
                'slug' => 'technologies',
                'name' => 'Technologies',
                'route' => '/technologies',
                'meta_title' => 'Technologies',
                'meta_description' => 'The stack we build on, and why we reach for each part of it.',
                'blocks' => [
                    ['hero', 'hero.eyebrow', 'Eyebrow label', 'text', 'Stack'],
                    ['hero', 'hero.title', 'Hero title', 'text', 'What we'],
                    ['hero', 'hero.title_accent', 'Hero title (muted line)', 'text', 'build with'],
                    ['hero', 'hero.subtitle', 'Hero subtitle', 'textarea', 'We favour boring, well-understood tools, and reach for something newer only when it solves a problem we actually have.'],
                    ['cta', 'cta.title', 'Closing CTA heading', 'text', 'Not sure which stack fits your problem?'],
                    ['cta', 'cta.subtitle', 'Closing CTA body', 'textarea', 'Tell us the outcome you need. The right technology depends entirely on what the thing has to do.'],
                    ['cta', 'cta.label', 'Closing CTA button', 'text', 'Talk to us'],
                ],
            ],
            [
                'slug' => 'faq',
                'name' => 'FAQ',
                'route' => '/faq',
                'meta_title' => 'Frequently asked questions',
                'meta_description' => 'The things clients ask us most often, about how we work, what we charge and what happens after launch.',
                'blocks' => [
                    ['hero', 'hero.eyebrow', 'Eyebrow label', 'text', 'Support'],
                    ['hero', 'hero.title', 'Hero title', 'text', 'Questions,'],
                    ['hero', 'hero.title_accent', 'Hero title (muted line)', 'text', 'answered'],
                    ['hero', 'hero.subtitle', 'Hero subtitle', 'textarea', 'The things clients ask us most often, about how we work, what we charge and what happens after launch.'],
                    ['cta', 'cta.title', 'Closing CTA heading', 'text', 'Still have a question?'],
                    ['cta', 'cta.subtitle', 'Closing CTA body', 'textarea', 'Tell us what you are building and we will come back within 24 hours.'],
                    ['cta', 'cta.label', 'Closing CTA button', 'text', 'Talk to us'],
                ],
            ],
            [
                'slug' => 'careers',
                'name' => 'Careers',
                'route' => '/careers',
                'meta_title' => 'Careers',
                'meta_description' => 'Open roles at AmidX Technologies.',
                'blocks' => [
                    ['hero', 'hero.eyebrow', 'Eyebrow label', 'text', 'Careers'],
                    ['hero', 'hero.title', 'Hero title', 'text', 'Build things'],
                    ['hero', 'hero.title_accent', 'Hero title (muted line)', 'text', 'that outlast you'],
                    ['hero', 'hero.subtitle', 'Hero subtitle', 'textarea', 'We are a small team that cares about craft. If you would rather ship something considered than something quick, we should talk.'],
                    ['empty', 'empty.title', 'No-roles heading', 'text', 'No open roles right now.'],
                    ['empty', 'empty.body', 'No-roles body', 'textarea', 'We still read every speculative application. Tell us what you do and we will keep it on file.'],
                ],
            ],
            [
                'slug' => 'sitemap',
                'name' => 'Sitemap',
                'route' => '/sitemap',
                'meta_title' => 'Sitemap',
                'meta_description' => 'Every page on this site.',
                'blocks' => [
                    ['hero', 'hero.eyebrow', 'Eyebrow label', 'text', 'Index'],
                    ['hero', 'hero.title', 'Hero title', 'text', 'Everything'],
                    ['hero', 'hero.title_accent', 'Hero title (muted line)', 'text', 'in one place'],
                    ['hero', 'hero.subtitle', 'Hero subtitle', 'textarea', 'Every page on this site, generated from what is actually published.'],
                ],
            ],
            [
                'slug' => 'cookies',
                'name' => 'Cookie Policy',
                'route' => '/cookies',
                'meta_title' => 'Cookie Policy',
                'meta_description' => 'How this site uses cookies, what they store, and how to control them.',
                'blocks' => [
                    ['hero', 'hero.eyebrow', 'Eyebrow label', 'text', 'Legal'],
                    ['hero', 'hero.title', 'Hero title', 'text', 'Cookie'],
                    ['hero', 'hero.title_accent', 'Hero title (muted line)', 'text', 'Policy'],
                    ['hero', 'hero.subtitle', 'Hero subtitle', 'textarea', 'How this site uses cookies, what they store, and how to control them.'],
                    ['body', 'body.intro', 'Intro paragraph', 'textarea', 'Cookies are small text files a site stores in your browser. We use as few as we can, and none of them build an advertising profile of you.'],
                    ['body', 'body.h1', 'Section 1 heading', 'text', 'What we use'],
                    ['body', 'body.p1', 'Section 1 body', 'textarea', 'Strictly necessary cookies keep you signed in and protect forms against cross-site request forgery. The site does not work correctly without them, so they cannot be switched off.'],
                    ['body', 'body.h2', 'Section 2 heading', 'text', 'What we do not use'],
                    ['body', 'body.p2', 'Section 2 body', 'textarea', 'We do not set advertising cookies, and we do not share browsing data with third-party ad networks.'],
                    ['body', 'body.h3', 'Section 3 heading', 'text', 'Managing cookies'],
                    ['body', 'body.p3', 'Section 3 body', 'textarea', 'Every major browser lets you view, block and delete cookies from its privacy settings. Blocking the necessary ones will sign you out and may stop forms submitting.'],
                    ['body', 'body.h4', 'Section 4 heading', 'text', 'Changes to this policy'],
                    ['body', 'body.p4', 'Section 4 body', 'textarea', 'If we change what we store, we will update this page and the date below.'],
                ],
            ],
            [
                'slug' => 'privacy',
                'name' => 'Privacy Policy',
                'route' => '/privacy',
                'meta_title' => 'Privacy Policy',
                'meta_description' => 'How we collect, use, and safeguard your information.',
                'blocks' => [
                    ['hero', 'hero.eyebrow', 'Eyebrow label', 'text', 'Legal'],
                    ['hero', 'hero.title', 'Hero title', 'text', 'Privacy'],
                    ['hero', 'hero.title_accent', 'Hero title (muted line)', 'text', 'Policy'],
                    ['hero', 'hero.subtitle', 'Hero subtitle', 'textarea', 'We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information.'],
                    ['body', 'body.sections', 'Policy sections', 'list', json_encode([
                        ['heading' => '1. Information We Collect', 'body' => 'We collect information you provide directly to us, such as when you contact us or request a quote.'],
                    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)],
                ],
            ],
            [
                'slug' => 'service',
                'name' => 'Terms of Service',
                'route' => '/service',
                'meta_title' => 'Terms of Service',
                'meta_description' => 'These terms govern your use of our website and services.',
                'blocks' => [
                    ['hero', 'hero.eyebrow', 'Eyebrow label', 'text', 'Legal'],
                    ['hero', 'hero.title', 'Hero title', 'text', 'Terms of'],
                    ['hero', 'hero.title_accent', 'Hero title (muted line)', 'text', 'Service'],
                    ['hero', 'hero.subtitle', 'Hero subtitle', 'textarea', 'These terms govern your use of our website and services. By accessing or using our services, you agree to comply with these terms.'],
                ],
            ],
        ];
    }
}

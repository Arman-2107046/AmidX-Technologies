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

<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Project;
use App\Models\Technology;
use Illuminate\Database\Seeder;

class ClientTechSeeder extends Seeder
{
    /**
     * Sample clients and the technology stack.
     * Safe to re-run: rows are matched on slug and never duplicated.
     */
    public function run(): void
    {
        foreach ($this->clients() as $i => $client) {
            if (Client::where('slug', $client['slug'])->exists()) {
                continue;
            }

            // Link a client to its case study where one exists.
            $projectId = isset($client['project_slug'])
                ? Project::where('slug', $client['project_slug'])->value('id')
                : null;

            Client::create([
                ...collect($client)->except('project_slug')->all(),
                'project_id' => $projectId,
                'status' => 'published',
                'sort_order' => $i,
            ]);
        }

        foreach ($this->technologies() as $i => $tech) {
            if (Technology::where('slug', $tech['slug'])->exists()) {
                continue;
            }

            Technology::create([
                ...$tech,
                'status' => 'published',
                'sort_order' => $i,
            ]);
        }

        $this->command?->info(
            'Seeded '.Client::count().' clients and '.Technology::count().' technologies.'
        );
    }

    /** @return array<int, array<string, mixed>> */
    protected function clients(): array
    {
        return [
            [
                'name' => 'Hockerty',
                'slug' => 'hockerty',
                'industry' => 'E-commerce',
                'location' => 'Barcelona, Spain',
                'since' => '2024',
                'summary' => 'Made-to-measure clothing, configured by the customer and manufactured to their measurements.',
                'website' => 'https://www.hockerty.com',
                'project_slug' => 'hockerty-commerce-platform',
                'quote' => 'They rebuilt the configurator so the preview, the price and the production spec finally agree with each other. That had been broken for years.',
                'quote_author' => 'Head of Engineering',
                'quote_role' => 'Hockerty',
                'is_featured' => true,
            ],
            [
                'name' => 'Sooth',
                'slug' => 'sooth',
                'industry' => 'Healthcare',
                'location' => 'Dhaka, Bangladesh',
                'since' => '2025',
                'summary' => 'Multi-site clinic group running scheduling, reminders and patient records in one place.',
                'project_slug' => 'sooth-booking-platform',
                'quote' => 'Double bookings stopped the week we went live. Adding a new site is now a settings change rather than a project.',
                'quote_author' => 'Operations Director',
                'quote_role' => 'Sooth',
                'is_featured' => true,
            ],
            [
                'name' => 'Gumbazar',
                'slug' => 'gumbazar',
                'industry' => 'Marketplace',
                'location' => 'Dhaka, Bangladesh',
                'since' => '2025',
                'summary' => 'Multi-vendor marketplace with seller onboarding, split payments and moderation built for volume.',
                'project_slug' => 'gumbazar-marketplace',
                'quote' => 'Payouts reconcile themselves now. We went from a day a week of manual finance work to none.',
                'quote_author' => 'Founder',
                'quote_role' => 'Gumbazar',
            ],
            [
                'name' => 'AirConnect',
                'slug' => 'airconnect',
                'industry' => 'Cloud',
                'location' => 'Remote',
                'since' => '2024',
                'summary' => 'Fleet telemetry from distributed hardware, aggregated into a dashboard operators use during incidents.',
                'project_slug' => 'airconnect-telemetry',
            ],
        ];
    }

    /** @return array<int, array<string, mixed>> */
    protected function technologies(): array
    {
        return [
            // Backend
            ['name' => 'Laravel', 'slug' => 'laravel', 'category' => 'Backend', 'website' => 'https://laravel.com', 'is_core' => true, 'description' => 'The PHP framework we build most server-side work on.', 'rationale' => 'Mature, well-documented, and its conventions mean a new engineer is productive in days rather than weeks.'],
            ['name' => 'PHP', 'slug' => 'php', 'category' => 'Backend', 'website' => 'https://www.php.net', 'is_core' => true, 'description' => 'Modern PHP, typed and tested.', 'rationale' => 'PHP 8 is a genuinely good language now. The version people remember is not the one we write.'],
            ['name' => 'Node.js', 'slug' => 'nodejs', 'category' => 'Backend', 'website' => 'https://nodejs.org', 'description' => 'For realtime services and tooling.', 'rationale' => 'Reached for when a workload is I/O bound and event-driven, not as a default.'],

            // Frontend
            ['name' => 'React', 'slug' => 'react', 'category' => 'Frontend', 'website' => 'https://react.dev', 'is_core' => true, 'description' => 'The component library behind our interfaces.', 'rationale' => 'The ecosystem is deep enough that most problems already have a well-travelled answer.'],
            ['name' => 'Inertia.js', 'slug' => 'inertia', 'category' => 'Frontend', 'website' => 'https://inertiajs.com', 'is_core' => true, 'description' => 'Connects a Laravel backend to a React frontend without a separate API.', 'rationale' => 'Removes an entire API layer, and with it a whole category of things that drift out of sync.'],
            ['name' => 'Tailwind CSS', 'slug' => 'tailwind-css', 'category' => 'Frontend', 'website' => 'https://tailwindcss.com', 'description' => 'Utility-first styling.', 'rationale' => 'Keeps styling next to the markup it applies to, so deleting a component deletes its CSS.'],
            ['name' => 'TypeScript', 'slug' => 'typescript', 'category' => 'Frontend', 'website' => 'https://www.typescriptlang.org', 'description' => 'Typed JavaScript, on projects that warrant it.', 'rationale' => 'Worth the overhead once a frontend outgrows one person holding it in their head.'],

            // Data
            ['name' => 'PostgreSQL', 'slug' => 'postgresql', 'category' => 'Data', 'website' => 'https://www.postgresql.org', 'is_core' => true, 'description' => 'Our default relational database.', 'rationale' => 'Correct by default, and it has an answer for almost everything before you need a second datastore.'],
            ['name' => 'MySQL', 'slug' => 'mysql', 'category' => 'Data', 'website' => 'https://www.mysql.com', 'description' => 'Where a client already runs it.', 'rationale' => 'Migrating a working database is rarely the highest-value thing we could be doing.'],
            ['name' => 'Redis', 'slug' => 'redis', 'category' => 'Data', 'website' => 'https://redis.io', 'description' => 'Caching, queues and sessions.', 'rationale' => 'One dependency covering three needs, all of which it does well.'],

            // Cloud
            ['name' => 'AWS', 'slug' => 'aws', 'category' => 'Cloud', 'website' => 'https://aws.amazon.com', 'description' => 'Where most client infrastructure runs.', 'rationale' => 'Boring in the good sense: the failure modes are documented and someone has hit them before you.'],
            ['name' => 'Docker', 'slug' => 'docker', 'category' => 'Cloud', 'website' => 'https://www.docker.com', 'description' => 'Reproducible environments, local and deployed.', 'rationale' => 'Ends the argument about whether it works on someone else\'s machine.'],
            ['name' => 'Terraform', 'slug' => 'terraform', 'category' => 'Cloud', 'website' => 'https://www.terraform.io', 'description' => 'Infrastructure as code.', 'rationale' => 'Infrastructure nobody can rebuild from source is infrastructure nobody can safely change.'],
            ['name' => 'GitHub Actions', 'slug' => 'github-actions', 'category' => 'Cloud', 'website' => 'https://github.com/features/actions', 'description' => 'Continuous integration and deployment.', 'rationale' => 'Lives next to the code it tests, so the pipeline is reviewed like everything else.'],
        ];
    }
}

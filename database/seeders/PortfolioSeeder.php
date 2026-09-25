<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    /**
     * Sample projects so the portfolio has something to show.
     * Safe to re-run: projects are matched on slug and never duplicated.
     */
    public function run(): void
    {
        $author = Admin::first();

        foreach ($this->projects() as $i => $definition) {
            if (Project::where('slug', $definition['slug'])->exists()) {
                continue;
            }

            Project::create([
                'admin_id' => $author?->id,
                'title' => $definition['title'],
                'slug' => $definition['slug'],
                'client' => $definition['client'],
                'sector' => $definition['sector'],
                'year' => $definition['year'],
                'summary' => $definition['summary'],
                'body' => Str::markdown($definition['body']),
                'tech' => $definition['tech'],
                'live_url' => $definition['live_url'],
                'link_mode' => 'auto',
                'status' => 'published',
                'is_featured' => $i === 0,
                'sort_order' => $i,
                'published_at' => now()->subDays($i * 20 + 3),
                'meta_description' => $definition['summary'],
            ]);
        }

        $this->command?->info('Portfolio seeded: '.Project::count().' project(s).');
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    protected function projects(): array
    {
        return [
            [
                'title' => 'Hockerty, made-to-measure commerce',
                'slug' => 'hockerty-commerce-platform',
                'client' => 'Hockerty',
                'sector' => 'E-commerce',
                'year' => '2026',
                'summary' => 'A configurator-led storefront where every garment is built to the customer measurements and rendered live as they choose.',
                'tech' => ['Laravel', 'React', 'Inertia', 'Tailwind', 'MySQL'],
                'live_url' => 'https://www.hockerty.com',
                'body' => <<<'MD'
A made-to-measure retailer needs something a catalogue storefront cannot
give it: a product that does not exist until the customer describes it.

## The problem

Every garment is assembled from dozens of independent choices, fabric,
lining, lapel, buttons, monogram, and each combination has to price
correctly, render accurately and reach the workshop without ambiguity.

## What we built

A configurator that holds the whole garment in one state tree, so a
change to the fabric updates the preview, the price and the production
spec in a single pass. Orders leave the checkout as a manufacturing
instruction rather than a line item.

## The result

Configuration steps that used to take multiple page loads now resolve
instantly, and the production file is generated from the same source of
truth the customer saw.
MD,
            ],
            [
                'title' => 'Sooth, clinical booking platform',
                'slug' => 'sooth-booking-platform',
                'client' => 'Sooth',
                'sector' => 'Web App',
                'year' => '2025',
                'summary' => 'Appointment scheduling for a multi-site clinic, with practitioner availability, reminders and a patient portal.',
                'tech' => ['Laravel', 'Livewire', 'PostgreSQL', 'Redis'],
                'live_url' => null,
                'body' => <<<'MD'
Scheduling across several sites means one shared calendar with very
different local rules.

## The problem

Each site had its own opening hours, room constraints and practitioner
mix. The previous system treated them as one, so double bookings were a
weekly occurrence.

## What we built

An availability engine that resolves a bookable slot from practitioner,
room and site rules at query time, rather than storing pre-computed slots
that drift out of date.

## The result

Double bookings stopped, and adding a new site became a configuration
change rather than a release.
MD,
            ],
            [
                'title' => 'Gumbazar, marketplace infrastructure',
                'slug' => 'gumbazar-marketplace',
                'client' => 'Gumbazar',
                'sector' => 'Marketplace',
                'year' => '2025',
                'summary' => 'A multi-vendor marketplace with seller onboarding, split payments and a moderation queue built for volume.',
                'tech' => ['Laravel', 'Vue', 'MySQL', 'Stripe Connect'],
                'live_url' => null,
                'body' => <<<'MD'
Marketplaces fail on their operational edges long before they fail on
traffic.

## The problem

Seller payouts, refunds and disputes were handled manually. Every new
seller added support load rather than revenue.

## What we built

Onboarding that verifies a seller and opens a connected payment account
in one flow, with split payments handled at capture so no money sits in
an intermediary balance.

## The result

Payouts reconcile automatically, and a refund reverses both sides of the
split in a single operation.
MD,
            ],
            [
                'title' => 'AirConnect, fleet telemetry dashboard',
                'slug' => 'airconnect-telemetry',
                'client' => 'AirConnect',
                'sector' => 'Cloud',
                'year' => '2024',
                'summary' => 'Live telemetry from distributed hardware, aggregated into a dashboard operators can act on during an incident.',
                'tech' => ['Laravel', 'React', 'TimescaleDB', 'WebSockets'],
                'live_url' => null,
                'body' => <<<'MD'
Telemetry is only useful if it answers a question fast enough to act on.

## The problem

Readings arrived faster than the dashboard could render them, so
operators watched a view that was minutes behind the hardware.

## What we built

A time-series store with pre-rolled aggregates for the common windows,
and a socket layer that pushes only what changed rather than re-sending
the whole series.

## The result

The dashboard holds a live view of the fleet under full ingest, and an
operator can narrow from fleet to a single unit without a page load.
MD,
            ],
        ];
    }
}

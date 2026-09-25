<?php

namespace Database\Seeders;

use App\Models\Faq;
use App\Models\JobOpening;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ContentSeeder extends Seeder
{
    /**
     * Sample FAQ entries and job openings.
     * Safe to re-run: rows are matched on a natural key.
     */
    public function run(): void
    {
        foreach ($this->faqs() as $i => [$group, $question, $answer]) {
            Faq::firstOrCreate(
                ['question' => $question],
                [
                    'answer' => Str::markdown($answer),
                    'group' => $group,
                    'is_published' => true,
                    'sort_order' => $i,
                ]
            );
        }

        foreach ($this->jobs() as $i => $job) {
            if (JobOpening::where('slug', $job['slug'])->exists()) {
                continue;
            }

            JobOpening::create([
                ...$job,
                'body' => Str::markdown($job['body']),
                'status' => 'published',
                'is_open' => true,
                'sort_order' => $i,
            ]);
        }

        $this->command?->info(
            'Seeded '.Faq::count().' FAQ entries and '.JobOpening::count().' roles.'
        );
    }

    /** @return array<int, array{0:string,1:string,2:string}> */
    protected function faqs(): array
    {
        return [
            ['Working together', 'How does a project usually start?', 'Every engagement opens with a scoping conversation. We want to understand the outcome you are after before we talk about technology, because the right stack depends entirely on what the thing has to do. You leave that conversation with a written scope, a timeline and a fixed price for the first phase.'],
            ['Working together', 'How long does a typical build take?', 'A focused MVP usually runs six to ten weeks. A larger platform is phased, with something usable in production at the end of each phase rather than one long build with a single delivery at the end.'],
            ['Working together', 'Do you work with existing codebases?', 'Often. We start with a short audit so we can tell you honestly what is worth keeping, what needs replacing and what it will cost either way. We would rather turn down work than quietly rewrite something that did not need it.'],
            ['Pricing', 'How do you price work?', 'Fixed price per phase, agreed before the phase begins. You know the cost before we write code, and a change in scope is a conversation rather than a surprise on the invoice.'],
            ['Pricing', 'What does ongoing support cost?', 'Support is a monthly retainer sized to the system. It covers monitoring, security patching, dependency updates and a response-time commitment. We will size it honestly rather than sell you more than the system needs.'],
            ['After launch', 'What happens once the project ships?', 'You own the code and the infrastructure from day one. Handover includes documentation, a walkthrough with your team and the credentials for everything. If you want us to keep running it, that is a retainer; if you want to take it in-house, we will help you do that.'],
            ['After launch', 'Who owns the code?', 'You do, completely, including the repository history. There is no licence to renew and nothing is held back to keep you tied to us.'],
            ['Technical', 'Which technologies do you use?', 'Mostly Laravel and React, with PostgreSQL or MySQL, deployed to cloud infrastructure we manage as code. We favour boring, well-understood tools and reach for something newer only when it solves a problem we actually have.'],
            ['Technical', 'How do you handle security?', 'Security is part of the build rather than a pass at the end. That means dependency scanning in CI, least-privilege access, encrypted secrets, audited authentication flows and a tested backup restore, not just a backup.'],
        ];
    }

    /** @return array<int, array<string, mixed>> */
    protected function jobs(): array
    {
        return [
            [
                'title' => 'Senior Laravel Engineer',
                'slug' => 'senior-laravel-engineer',
                'team' => 'Engineering',
                'location' => 'Dhaka / Remote',
                'employment_type' => 'Full-time',
                'experience' => '4+ years',
                'summary' => 'Own the backend of client platforms end to end, from schema design through to the deploy that puts it in front of users.',
                'apply_email' => null,
                'apply_url' => null,
                'body' => <<<'MD'
You will take responsibility for the server side of the products we build,
working directly with the client rather than through a layer of project
management.

## What the role involves

- Designing schemas and APIs that will still make sense in two years
- Writing tests that fail for the right reasons
- Reviewing other people's code generously and carefully
- Being on the call when something breaks, and writing the fix up afterwards

## What we are looking for

- Deep Laravel experience, including queues, events and the parts of
  Eloquent that bite at scale
- Comfort with SQL beyond the query builder
- A habit of measuring before optimising

## What we offer

Fixed working hours, no weekend delivery culture, a budget for whatever
you need to do the job properly, and code you will not be embarrassed by.
MD,
            ],
            [
                'title' => 'Product Designer',
                'slug' => 'product-designer',
                'team' => 'Design',
                'location' => 'Dhaka / Remote',
                'employment_type' => 'Full-time',
                'experience' => '3+ years',
                'summary' => 'Design interfaces that ask less of the people using them, and see them through to what actually ships.',
                'apply_email' => null,
                'apply_url' => null,
                'body' => <<<'MD'
We are looking for a designer who cares what the build looks like in the
browser, not only in the file.

## What the role involves

- Taking a problem from ambiguity to a designed, tested solution
- Working in the same repository as the engineers, reviewing the front end
- Maintaining and extending the design system

## What we are looking for

- A portfolio of shipped product work, not only concepts
- Fluency with type, spacing and hierarchy
- Enough comfort with HTML and CSS to have an opinion about feasibility

## What we offer

Real ownership of the work, direct contact with the people using it, and
a team that treats design as part of engineering rather than a service to it.
MD,
            ],
            [
                'title' => 'DevOps Engineer',
                'slug' => 'devops-engineer',
                'team' => 'Engineering',
                'location' => 'Remote',
                'employment_type' => 'Contract',
                'experience' => '3+ years',
                'summary' => 'Keep client infrastructure boring: reproducible, observable and quiet at three in the morning.',
                'apply_email' => null,
                'apply_url' => null,
                'body' => <<<'MD'
Our infrastructure should be unremarkable. This role keeps it that way.

## What the role involves

- Infrastructure as code across client environments
- CI pipelines that catch problems before they reach production
- Monitoring and alerting that tells someone the right thing at the right time
- Backup and restore that has actually been tested

## What we are looking for

- Terraform or equivalent, in anger
- Container orchestration experience
- A bias towards fixing the cause rather than the symptom

## What we offer

A contract sized around outcomes rather than hours, and the authority to
say no to infrastructure nobody can operate.
MD,
            ],
        ];
    }
}

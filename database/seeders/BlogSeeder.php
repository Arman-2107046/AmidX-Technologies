<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Seeds a few demo articles so the blog has something to show.
     * Safe to re-run: posts are matched on slug and never duplicated.
     */
    public function run(): void
    {
        $author = Admin::first();

        $categories = collect([
            ['name' => 'Engineering', 'description' => 'Architecture, code and delivery practice.'],
            ['name' => 'Cloud', 'description' => 'Infrastructure, scaling and reliability.'],
            ['name' => 'Design', 'description' => 'Product design and user experience.'],
        ])->map(fn (array $c) => Category::firstOrCreate(
            ['slug' => Category::uniqueSlug($c['name'])],
            ['name' => $c['name'], 'description' => $c['description']]
        ));

        foreach ($this->posts() as $i => $definition) {
            $slug = $definition['slug'];

            if (Post::where('slug', $slug)->exists()) {
                continue;
            }

            $post = Post::create([
                'admin_id' => $author?->id,
                'title' => $definition['title'],
                'slug' => $slug,
                'excerpt' => $definition['excerpt'],
                'body' => $definition['body'],
                'status' => 'published',
                'is_featured' => $i === 0,
                'published_at' => now()->subDays($i * 6 + 1),
                'reading_minutes' => Post::estimateReadingMinutes($definition['body']),
                'meta_description' => $definition['excerpt'],
            ]);

            $post->categories()->sync(
                $categories->whereIn('name', $definition['categories'])->pluck('id')
            );
        }

        $this->command?->info('Blog seeded: '.Post::count().' post(s), '.Category::count().' categories.');
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    protected function posts(): array
    {
        return [
            [
                'title' => 'Designing systems that survive their first 10x',
                'slug' => 'designing-systems-that-survive-their-first-10x',
                'excerpt' => 'Most architectures do not fail at launch. They fail the first time traffic multiplies, and the cracks were laid down months earlier.',
                'categories' => ['Engineering', 'Cloud'],
                'body' => <<<'MD'
Most systems do not fall over on launch day. They fall over the first time
demand multiplies, and almost always the cause was decided long before —
in a schema, a queue, or a synchronous call that should never have been
synchronous.

## Where the cracks form

Scaling problems are rarely exotic. In our experience they concentrate in
four places:

- **The database.** Unbounded queries that were fine at a thousand rows
  become table scans at a million.
- **Synchronous work.** Anything a request waits on that it did not need
  to wait on.
- **Shared mutable state.** Caches and counters that were correct with one
  process and wrong with twenty.
- **Retries without backoff.** A dependency slows down, every client
  retries at once, and the slowdown becomes an outage.

> The useful question is not "will this scale?" but "what breaks first,
> and how will we know?"

## Design for the second order

The habits that matter compound quietly:

1. Put a boundary around every external call, with a timeout.
2. Make writes idempotent so a retry is always safe.
3. Measure the p95, not the average — averages hide the failures.
4. Load-test the path you expect to be slowest before you need to.

None of this is glamorous. All of it is cheaper than discovering the
problem under real load.

## Instrument before you optimise

Optimising without measurement is guessing with extra steps. Before
touching a line of code, make sure you can answer: which endpoint is
slow, for which users, and at which percentile. A system you cannot
observe is a system you cannot safely change.
MD,
            ],
            [
                'title' => 'The case for boring infrastructure',
                'slug' => 'the-case-for-boring-infrastructure',
                'excerpt' => 'Novel infrastructure is a loan against your future attention. Here is how we decide when the interest is worth paying.',
                'categories' => ['Cloud'],
                'body' => <<<'MD'
Every new piece of infrastructure is a promise to operate it — to patch it,
monitor it, debug it at three in the morning, and explain it to whoever
joins next year. That cost is real and it is recurring.

## Boring is a feature

A technology is boring when its failure modes are documented, its edges
are well travelled, and the answer to your problem already exists in a
thread from 2019. That is not a lack of ambition. It is an ambition
pointed somewhere more useful than your own plumbing.

## When novelty earns its place

We reach for something newer when it clears three bars:

- It solves a problem we **actually have**, not one we anticipate.
- The failure modes are understood well enough to monitor.
- Someone on the team is willing to own it for the long term.

If a choice cannot clear all three, the boring option usually wins — and
the attention it saves gets spent on the product instead.
MD,
            ],
            [
                'title' => 'Interfaces that respect attention',
                'slug' => 'interfaces-that-respect-attention',
                'excerpt' => 'Good product design is mostly subtraction. A short field guide to interfaces that ask less of the people using them.',
                'categories' => ['Design'],
                'body' => <<<'MD'
Attention is the scarcest resource in any interface. Every element on a
screen spends a little of it, and most screens spend far more than they
earn back.

## Subtract first

Before adding an affordance, ask what it replaces. A well-designed screen
usually has fewer things on it than the version before, not more. The
discipline is not in what you can add — it is in what you are willing to
remove.

## Defaults are decisions

Most people never change a default. That makes every default a decision
you have taken on someone's behalf, so it is worth taking deliberately:

- Choose the option that is safest to get wrong.
- Make the reversible path the obvious one.
- Never make destructive actions the easiest thing to click.

## Motion should explain

Animation earns its place when it tells the user where something came
from or where it went. When it exists to be noticed, it is decoration —
and decoration is a tax on attention.
MD,
            ],
            [
                'title' => 'Shipping with confidence: our review checklist',
                'slug' => 'shipping-with-confidence-our-review-checklist',
                'excerpt' => 'The questions we ask of every change before it reaches production, and why each one has earned its place.',
                'categories' => ['Engineering'],
                'body' => <<<'MD'
A review checklist is only useful if every item on it has been paid for by
a real incident. Ours is short for that reason.

## What we ask

**Does it fail safely?** If this breaks, does it break loudly and in a way
that leaves data intact?

**Is it reversible?** A change we can roll back in a minute is a change we
can ship on a Friday.

**Is it observable?** If it misbehaves next month, will the logs and
metrics say so before a customer does?

**Is it the smallest change that works?** Large diffs hide defects, and
reviewers skim in proportion to length.

## What we do not ask

We do not ask whether the code matches a personal style preference. That
is what formatters are for, and arguing about it in review spends
goodwill that the important questions need.
MD,
            ],
        ];
    }
}

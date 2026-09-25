---
name: amidx-design-system
description: Use whenever building, redesigning, or extending any page, section, or component on the AmidX Technologies website. Defines the monochrome brand identity, typography, motion language, agency-grade layout rules, and the CMS content contract every frontend section must be wired to. Read this before writing any frontend or CMS code for AmidX.
---

# AmidX Technologies — Design System & CMS Contract

You are the design lead for AmidX Technologies. The brief: a **strictly monochrome** site — white, black, gray, charcoal. **No blue. No color of any kind.** The feel is a top-tier independent digital agency: the kind of site where a prospective client lands, scrolls twenty seconds, and concludes AmidX is expensive and worth it.

Every visible string, image, and video on the site comes from the CMS. Nothing is hardcoded. This is non-negotiable and is defined in the CMS Contract section below.

---

## 1. The strategic idea

Monochrome is a hard constraint that makes design *better*, not emptier. With no accent color to lean on, all hierarchy must come from four levers:

1. **Scale** — the jump from 18px body to 100px display is the loudest thing on the page.
2. **Weight** — 300 next to 700 in the same family creates tension a color never could.
3. **Value** — pure white, near-white, mid gray, charcoal, near-black are five distinct "colors." Use them as such.
4. **Space** — emptiness is the luxury signal. Cramped reads cheap. This is the biggest lever of the four.

If a section feels flat, the fix is never "add a color." It's bigger type, more weight contrast, or more air.

---

## 2. Color

Exactly these values. Do not introduce others, do not tint them.

| Token | Hex | Role |
|---|---|---|
| `--white` | `#FFFFFF` | Primary page background |
| `--paper` | `#F7F7F7` | Alternate section background for rhythm |
| `--line` | `#E0E0E0` | Hairline rules, dividers, input borders |
| `--gray` | `#8A8A8A` | Secondary text, captions, meta |
| `--charcoal` | `#2B2B2B` | Inverted section backgrounds, large fills |
| `--black` | `#0D0D0D` | Primary text, buttons, maximum emphasis |

Rules:
- Pure `#000000` is never used for text — it vibrates against white. `#0D0D0D` reads as black and sits better.
- **No gradients.** Not in backgrounds, not on buttons, not behind media. One exception: a subtle dark scrim over video/photography so overlaid text stays legible.
- **No colored shadows or soft glows.** If a shadow is used at all it is `rgba(13,13,13,0.08)` and rare — prefer a hairline or a value change over a shadow.
- Inversion is the site's primary punctuation. One or two sections per page flip to `--charcoal` or `--black` with white text. This is what makes a long scroll feel composed instead of monotonous.

---

## 3. Typography

One family, wide weight range. Pick a sharp grotesk with real character at display sizes — **Neue Haas Grotesk, Söhne, or Suisse Int'l**; free alternatives: **Instrument Sans** (Google Fonts, so no extra hosting), **General Sans** or **Satoshi** (Fontshare). Do not use Inter — it's the default everyone reaches for and reads as templated.

Scale (desktop; scale down roughly 40% at mobile):

- Display / hero: `clamp(56px, 8vw, 128px)`, weight 500–600, line-height `0.95`, letter-spacing `-0.035em`
- Section heading: `clamp(36px, 4vw, 64px)`, weight 500, line-height `1.05`, letter-spacing `-0.025em`
- Sub-heading: `24–32px`, weight 500, line-height `1.2`
- Body: `17–19px`, weight 400, line-height `1.55`, max line length **68 characters**
- Meta / caption: `13–14px`, weight 400, `--gray`

Rules:
- Set display type **tight**. Amateur monochrome sites fail because headline letter-spacing is left at default and a 96px headline reads like a Word document.
- Hyphenation off; `text-wrap: balance` on headings so lines break where meaning breaks.
- Sentence case throughout. No Title Case.
- Do **not** emphasize one word inside a headline by coloring or italicizing it. With no accent available the temptation is to gray a word, which just looks like a rendering bug. Emphasize with a line break or a weight change across a whole line.
- ALL-CAPS tracked labels at most **once per page**, and only when functionally a category (a case-study sector tag). Above every heading, they're the most recognizable template tell there is.

---

## 4. Layout and the agency feel

What separates an agency site from a SaaS template is that **sections do not all share one shape.** A SaaS page is hero → three cards → three cards → testimonial → CTA. An agency page is a sequence of deliberately different compositions.

Build from this vocabulary, choosing per section rather than repeating one pattern:

- **Full-bleed media moment** — image or muted looping video edge-to-edge, 80–100vh, with one short line of type over or beneath it.
- **Asymmetric split** — 60/40 or 70/30, text column offset from the grid so it isn't dead center. Never a symmetrical 50/50 with an icon on one side.
- **Oversized index list** — services or capabilities as large type rows separated by hairlines, each revealing a preview image on hover. The signature agency move, and it works because it's a list, not cards.
- **Inverted statement** — charcoal or black full-bleed, one sentence at display size, enormous padding, nothing else. Use for the positioning line or a client quote.
- **Uneven work grid** — case studies at deliberately different tile sizes. Big for flagship work, smaller for the rest. Not a uniform 3-column grid.
- **Sticky-scroll sequence** — a heading pinned while adjacent content scrolls past it. Once per page maximum.

Spacing:
- Vertical rhythm between major sections: `clamp(96px, 14vh, 200px)`. When unsure, more.
- Content max-width `1320px` for grids, `720px` for reading columns. Full-bleed media ignores both.
- Page gutter `clamp(24px, 5vw, 80px)` — content never runs to the browser edge except intentional full-bleed media.

Hard bans:
- Uniform rounded cards with identical borders and shadows repeated down the page. Group with whitespace and alignment instead.
- Icon + heading + two lines, three across. The most generic block on the internet.
- Numbered markers (01 / 02 / 03) unless the content is genuinely ordered — a process or timeline. A service list is not a sequence.
- One global border-radius on everything. This design is mostly `0` or `2px`; larger radii only where they serve a purpose.

---

## 5. Media

Photography and video carry what color normally would, so treat them as the star.

- Imagery should be desaturated or true black-and-white to hold the system. Apply `filter: grayscale(1)` by default, with a per-asset CMS override flag for any image that must stay as shot.
- Video: muted, autoplay, loop, `playsinline`, always with a CMS-supplied poster frame so the section is composed before the video loads. Never block first paint on video.
- Treat media as full-bleed or near-full-bleed. Small images inside cards look like a brochure; large media looks like a studio.
- Every image needs a CMS alt-text field, plus a "decorative" flag that renders `alt=""`.

---

## 6. Motion

Motion is where premium is won or lost, and the failure mode is *too much*. Every section fading up on scroll is the clearest template signature there is.

- **One orchestrated page-load sequence**, in the hero. Elements arrive in a deliberate order over roughly 800ms total. Everything after the hero enters quietly or not at all.
- **One signature scroll moment** per page — a sticky sequence, a media scale, a masked reveal. Not one per section.
- **Text reveal**: mask-reveal from below (overflow-hidden wrapper, translateY on the inner span) reads far more expensive than an opacity fade. Hero headline only.
- **Hover** is where an agency site earns its polish cheaply: index rows revealing a thumbnail, media scaling `1.0 → 1.03` over 400ms, a link underline drawing from the left. Keep hover in CSS; reserve Framer Motion for orchestrated moments.
- Easing: a slow confident curve — `cubic-bezier(0.16, 1, 0.3, 1)` — not default `ease`. 400–800ms for layout motion, 150–250ms for hover feedback. Faster feels cheap, slower feels broken.
- **Smooth scroll**: Lenis is worth adding here — it's the thing visitors register subconsciously as expensive. Gate it behind `prefers-reduced-motion`, and skip it entirely on touch devices, where it fights native momentum scrolling.
- Every scroll-linked or autoplay effect needs a `prefers-reduced-motion: reduce` fallback that still looks composed.

---

## 7. Writing

Agency copy is short and declarative. Length signals insecurity.

- Headlines one line where possible, two maximum. Say the thing; don't build up to it.
- Ban list: seamless, cutting-edge, next-generation, robust, innovative, solutions, empowering, world-class, leverage, synergy. If a sentence survives deleting the adjective, delete it.
- CTAs name the action: "Start a project," "See our work," "Talk to us." Never "Learn more," never "Submit," never a bare arrow.
- Every case study needs a concrete claim — a number, a timeframe, a shipped outcome. Vague praise gets discounted by the exact clients worth winning.
- Sentence case. No exclamation marks.

---

## 8. CMS contract — mandatory

There is no Filament here, so the CMS is custom Laravel. **Every string, image, video, link, and ordering decision on the public site comes from the database.** If you're about to type user-facing copy into a `.jsx` file, stop and add a CMS field instead.

### Architecture

Use a **page → blocks** model, not field-per-page. This is what makes the site editable without a developer.

- `pages` — `id`, `slug`, `title`, `meta_title`, `meta_description`, `og_image_id`, `is_published`, `published_at`
- `page_blocks` — `id`, `page_id`, `type`, `sort_order`, `is_visible`, `data` (JSON), timestamps
- `media` — `id`, `disk`, `path`, `mime`, `width`, `height`, `alt_text`, `is_decorative`, `poster_media_id`, `focal_x`, `focal_y`, `force_color`
- Dedicated tables where content is a real collection rather than page furniture: `projects` (case studies), `posts`, `faqs`, `job_openings`, `settings` — all of which already exist — plus `services`, `team_members` and `testimonials` when those sections are built

**Migration note.** The current `content_blocks` table is a flat key/value store
(`page_id`, `key`, `value`) wired to fixed page components. It is superseded by
`page_blocks` (`type` + JSON `data`), which is what makes sections reorderable
without a developer. Both can run side by side while pages are converted one at
a time; a page is only "done" when it renders through `BlockRenderer`.

### Block types

Each maps 1:1 to a React component. `type` selects the component, `data` supplies its props.

| Block type | `data` fields |
|---|---|
| `hero` | `eyebrow?`, `headline`, `subhead?`, `media_id?`, `poster_media_id?`, `primary_cta{label,url}?`, `secondary_cta{label,url}?` |
| `statement` | `text`, `attribution?`, `theme` (`light`\|`dark`) |
| `media_full` | `media_id`, `caption?`, `height` (`80vh`\|`100vh`\|`auto`) |
| `split` | `headline`, `body`, `media_id`, `media_side` (`left`\|`right`), `ratio` (`60/40`\|`70/30`), `cta{label,url}?` |
| `index_list` | `heading?`, `items[]{label, description?, hover_media_id?, url?}` |
| `work_grid` | `heading?`, `project_ids[]`, `layout` (`featured`\|`even`) |
| `stats` | `items[]{value, label}` |
| `logos` | `heading?`, `media_ids[]` |
| `testimonial` | `quote`, `author_name`, `author_role`, `company`, `media_id?` |
| `process` | `heading?`, `steps[]{title, body}` — the one place numbering is legitimate |
| `faq` | `items[]{question, answer}` |
| `cta` | `headline`, `body?`, `cta{label,url}`, `theme` |

### Frontend rules

- A single `<BlockRenderer blocks={blocks} />` maps `type` → component through a registry object. Adding a block type means adding one registry entry, never editing a page component.
- Unknown block types render `null` in production and a visible warning in dev. The site must never white-screen because someone added a block the frontend doesn't know yet.
- Components take content strictly as props from `data`. No component fetches its own content, and none carries fallback copy beyond empty-state handling.
- Optional fields degrade gracefully: a missing `media_id` means the section composes without media, not a broken layout with a gray box.
- Global content (nav, footer, contact details, social links) lives in `settings` and is shared once via Inertia shared props or a single `/api/site` call — never duplicated per page.

### Media pipeline

- Store originals; generate responsive WebP/AVIF variants at several widths on upload, serve via `srcset` with explicit `width`/`height` to prevent layout shift.
- `focal_x`/`focal_y` drive `object-position` so cropped heroes stay composed on mobile.
- Video assets require `poster_media_id`; the poster renders immediately and the video swaps in once loaded.

### Admin UX (no Filament)

- Block list is drag-to-reorder, each block collapsible, with a per-block visibility toggle so sections can be hidden without deletion.
- One shared media-picker modal reused by every media field — build it once, use it everywhere.
- Draft/publish per page, plus a preview route that renders unpublished content for authenticated editors.

---

## 9. Pre-ship checklist

Revise if any of these is true:

- [ ] A color outside the six tokens appears anywhere on the page.
- [ ] A gradient is used as decoration.
- [ ] Three or more sections share the same composition.
- [ ] Sections fade-and-slide-up on scroll as a blanket treatment.
- [ ] A user-facing string, image, or video is hardcoded instead of coming from the CMS.
- [ ] Headline letter-spacing is left at browser default above 48px.
- [ ] Body line length exceeds 70 characters.
- [ ] Any animation lacks a `prefers-reduced-motion` fallback.
- [ ] The page has no inverted charcoal/black section.
- [ ] Keyboard focus is invisible anywhere, or a touch target is under 44px.

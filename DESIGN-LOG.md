# Learn CSS: design log (DADA, Adaptive, Lite)

## Traversal Plan
- **Mode:** Adaptive (beginners are the audience). **Run type:** Lite, stated: one move (the whole redesign), one panel round, because the person asked for "a dada lite run".
- **R0 premortem of the inherited site:** `animations.html` was linked from every page and did not exist; the box-model page pointed at a missing `box-model.png`; the footer was `position: fixed` and covered content; `.container` and `.item` demos were unstyled, so Flexbox and Grid showed nothing; four stray stylesheets were unlinked; every page was one grey template with no interaction.
- **Seed and Breaker:** the page teaches with the properties it is built from. Breaker: the first screen is six specimens each drawn with the CSS it teaches, not a headline.
- **First screen rule (measured):** the board's bottom edge is at y=746 at 1280x800 and y=768 at 375x812, both above the fold; no horizontal scroll on any of seven pages at either width.
- **Frontier:** (closed after one round) nothing left OPEN; DEFERRED items carry reasons below.

## Decision Record (the one move)
Rebuilt the site as seven pages under shared navigation: the board; a live box-model lab; a path; and per lesson a playground (sliders, selects, a selector tester, a sandboxed editor) that prints the CSS it writes. Deleted the unlinked stylesheets. Added the missing animations lesson. Tokens: warm paper on a drafting grid, ink navy, and the devtools colours for the four box layers. Dark mode, reduced motion and forced colours handled.

## Panel Report (R1, WHOLE, five seats, one agent per reference, three at a time)
| Seat | Observed | Verdict |
|---|---|---|
| Debord | the Basics tile said `color: coral` over a three-colour specimen; "ten minutes" unsourced; the path list repeated one sentence six times; grid printed a rule the learner never chose | OBJECT |
| Shklovsky | six identical cards are the habitual feature row; every lesson opens with the same title block; specimens are still frames; the textarea cut off mid-rule; the nav truncated at 375 | OBJECT |
| Holmes | nav hid three lessons on a phone; printed CSS clipped at 375; Flexbox and Grid announced nothing; the wrap checkbox label contradicted the printed value | OBJECT |
| Mace | forced colours merged the box layers; the sandbox iframe had no visible focus; generated-CSS blocks had no name; the checkbox was 22px | OBJECT |
| Cairo | the arithmetic matched the rendered boxes at four settings; the figure was 240px not 236px (a stray border); the minmax values disagreed with the prose; "ten minutes" | OBJECT |

## Resolutions
- Debord: ADAPT all. Tile captions are plain promises; "live" is claimed only for the labs; "a few minutes"; the repeat is cut; the grid's span is a checkbox and the rule prints only when it is on.
- Shklovsky 2, 3, 5: ADAPT. Each lesson header carries its own enlarged specimen; the specimens move on hover and focus; the textarea shows the whole starting rule; the nav wraps. Shklovsky 1 (drop the card chrome): OVERRULE in part, because the card is the tap target and a link needs a visible edge; the specimens were enlarged instead. Shklovsky 4 (print the CSS on the stage): DEFERRED, the stage was enlarged.
- Holmes: ADAPT all. Nav wraps under 40rem; printed CSS wraps; Flexbox and Grid have a polite one-line summary; the label is "Wrap items". On phones the plain-language caption is hidden so the board stays above the fold: that is the First screen rule winning over a caption.
- Mace: ADAPT all (forced-colours borders, iframe focus ring, `role=region` names, 24px checkbox, per-slider outputs no longer announce).
- Cairo: ADAPT all (figure border removed; total line says "default content-box sizing"; minmax values aligned; the Columns slider is disabled in minmax mode).

## Anchor Ledger
Debord: the spectacle. Shklovsky: art as technique. Holmes: mismatch. Mace: universal design. Cairo: how charts lie.

## Step 2g: figures re-measured at the final state
Box lab at four settings: printed total equals the measured width (140/16/8 gives 188, 200/20/8 gives 256). Selector counts (.done 2, invalid selector message) and flex and grid summaries match the DOM. Board bottom 746 and 768. 0 console errors, 0 page errors.

## Stop test (Lite)
- **S1** Frontier: no OPEN items. Met. **S2** Every seat objected and every finding was adopted or deferred with a reason; the objecting seats were **not re-judged**: not met. **S3** Not run (Lite: one round). **S4** Not run. **S5** Dotted pair Debord-Shklovsky seated; findings adopted or deferred: met.
The run is incomplete against the full stop conditions by the Lite choice. Resume point: re-seat Shklovsky and Holmes on the final build.

## Carry-Forward Ledger
- A caption names a property the picture must literally use, or the caption is the claim.
- A printed total must be re-measured against the rendered box after the figure's own chrome is counted (a 2px border added 4px).
- A phone nav that scrolls sideways hides lessons; wrap it.
- A fix that adds a line to the first screen has to be re-measured against the fold.

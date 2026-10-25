# Website audit and local improvements

Date: 2026-10-25

Scope: published homepage at https://www.davymartinez.com/es, local Next.js 16 app,
shared components, English and Spanish homepages, contact flow and route generation.
Stack preserved: React 19, Next.js App Router, Tailwind CSS 3.4, existing dictionaries.

## Findings and changes

| Area | Evidence before the changes | Local change |
| --- | --- | --- |
| Navigation | All navigation links hidden below 768px without a replacement menu. Client dictionary loading also delayed the header. | Server supplies translated labels. Full screen native dialog supplies all destinations, focus containment, Escape dismissal, focus restoration and scroll locking. Desktop navigation appears when space permits. |
| Typography | System font stack; hero weight 800; long occupational heading wrapped across many lines. | Locally hosted Manrope in 400, 500 and 600; shorter localized homepage copy; paired Tailwind type sizes and line heights; balanced headings. |
| Surfaces | Navy surfaces, radial glow, teal to blue text and portrait gradients. | Neutral charcoal palette, existing teal accent, approved monochrome heading gradient and unfiltered portrait. |
| Page hierarchy | Three hero actions and five badges; identical services repeated in two sections. | One filled primary action, a secondary text link, two service rows and separate article navigation. |
| Client experience | Existing client names appeared after services in bordered badge boxes. | Client names now appear immediately after the introduction in a two column section. No additional client claims or metrics. |
| Availability | Homepage always said two openings in October. | Homepage uses an evergreen project inquiry instead of the fixed availability message. The reusable availability component remains available for confirmed future use. |
| Interaction | Default transition curves, short hover effects and inconsistent focus styles. | Shared 700ms easing, visible focus outline, pressed button feedback and active navigation including nested pages. |
| Motion | No progressive section entrance or reduced motion policy. | Lower homepage sections use IntersectionObserver and 800ms entrances. Content renders without JavaScript. Reduced motion disables animation and keeps content visible. |
| Form accessibility | Labels had no input associations; dictionary loaded during render; feedback vanished after four seconds. | Labels supplied by server, connected IDs, autocomplete, themed fields and persistent live status messages. Required fields and email validation remain active. |
| Form reliability | Email provider error responses were ignored before returning success. | Provider rejection returns HTTP 502; malformed email addresses return HTTP 400. Existing recipient, endpoint and tracking event remain in place. |
| Footer | Navigation pointed to the web manifest and robots file. | Footer offers services, about and contact; copyright retained. Machine files remain at their existing paths. |
| Sharing | Metadata referenced an absent local og-image.jpg asset. | Sharing metadata references the existing portrait with its actual dimensions. Added a branded SVG favicon. |
| Homepage SEO | Homepages inherited generic title/description and Spanish canonical used the site root. | Homepages use localized titles, descriptions and their explicit locale URLs. |
| Case URLs | Static params retained .en and .es suffixes; page loader then appended another locale suffix. | Static params deduplicate base slugs and build one case URL per locale. |

These changes fix observable navigation, accessibility and response handling problems.
Visual choices remain design judgments. Conversion gains, ranking changes and runtime
performance improvements require measurement after release.

## Items that need a separate decision

- Privacy and terms pages are absent. Supply policies that match the business and its data use before adding legal links.
- GTM loads when configured. Cookie and consent behavior needs a separate check against the tags in the actual container and the intended audience.
- CV introductions still contain a placeholder about an optional PDF. Replace this with approved CV content.
- The blog contains a Hello World setup post. Approve a real article or an unpublished state.
- Existing case results need source evidence before they can support stronger homepage claims. The audit does not validate those results.
- Inner pages inherit canonical and sharing metadata. Audit each route before an SEO release; this change explicitly corrects homepage canonicals only.
- The email provider still uses its existing onboarding sender. Confirm the sender configuration and delivery with an authorized real message before relying on the form in production.
- Build output reports the existing deprecated middleware convention and old browser support datasets. Dependency maintenance is outside this design pass.

No new metrics, guarantees, availability quotas, client names, testimonials or legal text were invented.
Existing article dates were retained. The existing custom 404 and route back links remain.
Loading and empty product states do not apply to this static portfolio; the contact form retains its sending state.

## Validation

- `npm run build`: passes compilation, TypeScript and static page generation.
- `npm run lint`: passes.
- `node --test tests/contact-route.test.cjs`: three tests pass using a fake provider. Covers provider rejection, accepted mail, malformed input and honeypot blocking.
- Browser: desktop visual check; mobile checks at 320px and 390px; tablet check at 768px. No horizontal overflow in checked homepage layouts.
- Mobile menu: all destinations visible; Escape closes dialog and restores trigger focus.
- English contact page: labels resolve to inputs; empty submission triggers native required-field validation.
- Lower page sections become visible on scroll; reduced motion handling checked in source.
- Final build generates `/en/seo-portfolio/caso-seo-120` and `/es/seo-portfolio/caso-seo-120`.
- No real email was sent. No live deployment or analytics experiment was performed.

The local development preview runs at http://127.0.0.1:3000/es.

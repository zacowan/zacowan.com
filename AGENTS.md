# Repository guidance

## Design

All user-facing changes must follow [Vercel's published design guidelines](https://vercel.com/design.md). Preserve this site's established Geist typography and terminal-inspired identity while applying the guidelines' core principles: precise hierarchy, semantic HTML, readable prose, shared alignment, monochrome restraint, purposeful boundaries, stillness by default, accessible focus states, ordered headings, and responsive reflow. Do not introduce decorative gradients, glows, textures, ornamental shadows, generic card grids, arbitrary icons, or unnecessary animation.

Whenever the site's visual identity or profile content changes, review and update the shared Open Graph and Twitter image in `app/og.tsx` so social previews stay visually and factually current. Preserve the 1200×630 output, embedded Geist font treatment, and matching metadata routes.

Keep the site server-rendered and useful without client-side JavaScript. Any content change must keep the HTML and Markdown representations consistent, preserve a real 404 status for missing routes, and retain correct `Vary: Accept` content negotiation.

# A little warmth

A buildless, responsive winter escape made with HTML, CSS, SVG, and JavaScript. Click the igloo to meet a waddling penguin and receive an affirmation. Click again, close the note, or press Escape to send the penguin home. Each visit offers a new reminder.

The penguin is the user-supplied reference image. The landscape and igloo are original SVG illustrations. Google Fonts supplies DM Sans and Lora, with local font fallbacks.

Run `npm run dev` for a local preview at http://127.0.0.1:4173. Run `npm run check` to check JavaScript syntax. The `dist` directory is ready to serve without a build or dependency installation.

Keyboard: Tab to the igloo, then Enter or Space to toggle. Escape dismisses a visit. Reduced-motion preferences replace the walking animation with immediate state changes. Animations handle repeated clicks without overlapping visits.

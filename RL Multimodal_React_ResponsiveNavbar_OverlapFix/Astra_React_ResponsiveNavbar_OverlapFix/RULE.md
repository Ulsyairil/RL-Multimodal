# UI Fix Evaluation Rules

Use these rules to score any UI fix submission. Score the actual rendered result
and evidence, not the claimed intent.

1. **Understanding the UI request and screenshot.** Does the model correctly identify
   the visible defect, affected component, and requested outcome? Judge against the
   prompt and reference image; do not reward an unsolicited redesign.
2. **Layout, alignment, and spacing.** Does the result fix the requested positioning,
   sizing, alignment, padding, margins, or grid/flex behavior? Check for unintended gaps,
   overlaps, clipping, and overflow.
3. **Typography and visual hierarchy.** Are font family, size, weight, line height,
   wrapping, and text emphasis consistent with the prompt or reference and the existing
   UI? Check that headings, labels, and body text remain readable.
4. **Colors and component styling.** Do colors, backgrounds, borders, radii, shadows,
   and control styles match the requested appearance and surrounding design system?
   Check consistency across affected components.
5. **Images, icons, and visual assets.** Are the required images and icons present,
   correctly sized, aligned, and cropped, with appropriate aspect ratios? Check for missing,
   distorted, or incorrectly substituted assets.
6. **Responsive and adaptive behavior.** Does the fix behave correctly at the viewport
   shown in the prompt and other relevant screen sizes? Check reflow, navigation,
   wrapping, scrolling, and touch-target sizing without introducing breakpoint-specific
   defects.
7. **UI interactions and state behavior.** Do affected buttons, links, forms, menus, tabs,
   or dialogs work as requested? Check relevant hover, focus, selected, disabled, loading,
   empty, error, and success states; do not infer working behavior from a static screenshot.
8. **Accessibility and usability.** Does the affected UI remain usable with keyboard
   navigation, visible focus, meaningful labels, readable contrast, and appropriate
   semantic controls? Assess applicable accessibility behavior alongside the requested
   visual change.
9. **UI fix completeness and regression avoidance.** Does the patch resolve all UI
   requirements in the prompt while preserving unaffected components, content, and user
   flows? Check that it fixes the cause rather than hiding the symptom or hard-coding a
   single screenshot.
10. **Rendered verification and visual evidence.** Does the transcript show the updated
    UI actually rendered and checked against the request? Look for before/after
    screenshots at comparable viewport and state, interaction checks where relevant, and
    accurate disclosure of untested behavior. A claimed fix or code diff alone does not prove
    visual success.
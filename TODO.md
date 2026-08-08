# Fix Broken Asset References & Layout

## Part 1: Asset References (Done)
- [x] Create `src/assets/index.js` to import and export all gifs + background
- [x] Fix `src/index.css` background to use relative path `./assets/background.png`
- [x] Update all pages to use imported gifs
- [x] Verified build bundles all assets

## Part 2: Content Centering & NO Button (Done)
- [x] Restore `.app` and `.app-content` centering rules in `src/App.css`
- [x] Optimize NO button movement in `WelcomePage.jsx`:
  - Measure button size from actual button element (`noButtonInnerRef`)
  - Clamp random position strictly within viewport (`MARGIN = 15`)
  - Ensure button never exceeds width/height of the user's screen
- [x] Add `.no-button-inner` CSS rule for accurate measurement
- [x] Verified build succeeds

## Result
All assets render correctly, content is centered, and the NO button stays within the viewport when it moves.

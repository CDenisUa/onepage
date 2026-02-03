![OnePage Logo](public/images/onepage_logo.png)

# Onepage Tagline Editor

Interactive Tagline element editor for the Onepage no‑code website builder test task.

![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![MobX](https://img.shields.io/badge/MobX-FF9955?logo=mobx&logoColor=white)

## Links

- Demo: https://onepage-bice.vercel.app
- Repository: https://github.com/CDenisUa/onepage

## Overview

This project implements an interactive editor for the **Tagline** element based on the provided Figma design. The editor includes a preview area and a settings panel to create, edit, and style tags, with immediate UI updates.

## Key Requirements Covered

- Tagline preview with tags rendered as buttons/chips and wrapping layout
- Main panel with tag list, add item, and styles navigation
- Create/Edit item panels for label and link
- Styles panel with variants, size, radius, and alignment controls
- Simulated persistence of changes to the server

## Tech Stack

- React
- TypeScript
- MobX (state management)
- Vite (build tool)
- CSS Modules (styling)

## Important

### Setup & Run

1. Install dependencies:
```bash
npm install
```
2. Start dev server:
```bash
npm run dev
```
3. Production build:
```bash
npm run build
```

### UX Improvements Applied

- Menu behavior updated: opens as a context menu (right click).
- Validation on item creation.
- Duplicate names are not allowed.
- Name (label) field is required.
- Drag handles/icons added to the item list in the context menu.
- Drag & drop works in both the menu list and the Tagline preview.
- Long tag labels are truncated with ellipsis in the menu list and preview chips.
- Empty states are shown in the preview and menu when no tags exist.

### Requirements Coverage

- Preview area with heading and wrap behavior
- Main panel with list, add item, and styles navigation
- Create/Edit item panels with label and link
- Styles: variants, size, radius, alignment
- Instant preview updates
- Simulated persistence on changes
- Drag & drop sorting (optional requirement)

### Simulated API Calls (UX Triggers)

The app simulates saving changes by logging `POST http://api/tagline` to the console. It is triggered on:

- Typing in the Item panel (Label/Link) with a short debounce.
- Pressing Enter or closing the Item panel (when the draft is valid).
- Deleting an item.
- Reordering items via drag & drop (menu list or preview).
- Changing any Style settings (variant, size, radius, alignment).
- Resetting styles.

## Notes

If any Figma details are ambiguous, reasonable defaults are chosen and can be adjusted easily.

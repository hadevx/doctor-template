# Doctor Notes Template

A clean, browser-based ophthalmology clinical note-taking template designed for fast data entry and one-click copy-to-clipboard export.

## Features

- **Presented With** — chief complaint / presenting history
- **KCO & O/E** — known case of and on-examination findings side by side
- **UAVA** — unaided visual acuity for OD (right eye) and OS (left eye) with a fraction display
- **Slit Lamp Examination** — editable table for Cornea, AC, Iris, Pupil, and Lens with default normal values pre-filled
- **Clinical Findings** — Fundus, Orthoptic, FP, Abnormal Head Posture, Nystagmus, EOM
- **ARCT** — arc/reflex/cover test notes
- **Impression & Plan** — diagnosis and management side by side
- **Copy All** — formats all fields into plain text and copies to clipboard
- **Print** — hides the action bar for a clean printout
- **Clear** — resets all fields and restores slit-lamp defaults

## Project Structure

```
bhr-doctor-template/
├── index.html   # Markup / page structure
├── style.css    # All styling (CSS variables, layout, components, print & responsive)
├── script.js    # Slit-lamp table builder, copy, clear, toast, and date logic
└── README.md    # This file
```

## Usage

Open `index.html` directly in any modern browser — no build step or server required.

## Fonts

Uses [DM Sans](https://fonts.google.com/specimen/DM+Sans) and [DM Mono](https://fonts.google.com/specimen/DM+Mono) loaded from Google Fonts. An internet connection is required for the fonts; the page is otherwise fully offline-capable.

## Color Conventions

| Token | Color | Meaning |
|-------|-------|---------|
| `--od` | Blue `#2563eb` | OD — right eye |
| `--os` | Green `#059669` | OS — left eye |
| `--accent` | Indigo `#4f46e5` | Focus / interactive states |
| `--danger` | Red `#dc2626` | Clear / destructive action |

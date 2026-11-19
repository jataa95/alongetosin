# Alonge Tosin — portfolio

Website for Alonge Tosin (@tosin_xp), a Nigerian artist making hyperrealist drawings and paintings.

Built with Next.js 16 (App Router), React 19 and Tailwind CSS 4.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

- `/`: name over a collage, scroll statement, selected work, studio reels, process, footer
- `/works`: every work
- `/works/[slug]`: one work with process photos, details, its reel, and a WhatsApp enquiry button
- `/about`
- `/contact`: commission steps, plus a form that opens WhatsApp or email with the message already written

## Editing content

Copy, contact details and the list of works are all in `data/site.js`.
To add a work, put its images in `public/works/` (and a reel in `public/videos/` if there is one), then add an entry to `works`.
Each entry has `year` and `dimensions` fields. They're blank for now and show up on the site once filled in.

## Deploy

Import the repo into Vercel. No environment variables are needed.

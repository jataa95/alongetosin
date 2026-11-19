// Everything the site says about the artist and the work lives here.
// Edit this file to add works, change copy, or fill in details
// (year, size) that are left blank for now.

export const artist = {
  name: "Alonge Tosin",
  wordmark: "alongetosin",
  short: "Tosin",
  handle: "tosin_xp",
  discipline: "Visual artist — graphite, charcoal & paint",
  base: "Nigeria",
  email: "alongetosin43@gmail.com",
  whatsapp: "+234 703 435 2210",
  whatsappLink: "https://wa.me/2347034352210",
  instagram: "https://www.instagram.com/tosin_xp/",
  facebook: "https://www.facebook.com/search/top?q=Tosin%20xp",
  tagline: "Alonge Tosin. Hyperrealist drawing & painting from Nigeria.",
};

// width/height are the real pixel sizes of the files in /public.
const img = (src, w, h, alt) => ({ src, width: w, height: h, alt });
const TALL = [720, 1280];
const CROP = [720, 960];

export const works = [
  {
    slug: "my-serenity",
    title: "My Serenity",
    subtitle: "(Graphite)",
    medium: "Graphite & charcoal pencil on paper",
    kind: "Drawing",
    year: null,
    dimensions: null,
    status: "Original",
    lede: "Here I am, walking free — carrying your stars in my vein.",
    text: [
      "Every breath I take feels borrowed, because it’s built on what you gave.",
      "A winged mother, haloed and crowned in braids, holds a sleeping son against her knees. Every pattern on the cloth, every feather and every strand of beads is rendered by hand in pencil.",
      "You showed me how to hold my head high, even when the world tries to bend it low. You turn scraps into meals, moans into melodies, and cotton into courage.",
    ],
    image: img("/works/my-serenity.jpg", ...TALL, "My Serenity — pencil drawing of a winged, haloed mother cradling her sleeping son"),
    gallery: [
      img("/works/process-serenity-pencil.jpg", ...TALL, "Tosin drawing the wing and robe of My Serenity"),
      img("/works/process-serenity-wing.jpg", ...TALL, "Close detail of the wing and spear in My Serenity"),
    ],
    video: { src: "/videos/my-serenity.mp4", poster: "/videos/my-serenity.jpg" },
  },
  {
    slug: "golden-hour",
    title: "Untitled",
    subtitle: "(Black Wings, Gold Sun)",
    medium: "Paint on canvas",
    kind: "Painting",
    year: null,
    dimensions: null,
    status: "Original",
    lede: "A figure in a cream agbada bows his head before a gold sun as black feathers fall.",
    text: [
      "Built from the first pencil line, through a warm ochre underpainting, to the last falling feather.",
      "Still waiting on its name — Tosin put the question to Instagram: what would you call it?",
    ],
    image: img("/works/golden-hour.jpg", ...TALL, "Painting of a winged figure in a cream robe before a gold sun, black feathers falling"),
    gallery: [
      img("/works/process-sketch.jpg", ...CROP, "The first line drawing on a blank canvas"),
      img("/works/process-underpainting.jpg", ...TALL, "Ochre underpainting with the face blocked in"),
      img("/works/studio.jpg", ...TALL, "Tosin painting the robe at the easel"),
    ],
    video: { src: "/videos/golden-hour.mp4", poster: "/videos/golden-hour.jpg" },
  },
  {
    slug: "the-warmth-that-outlived-the-dark",
    title: "The Warmth",
    subtitle: "(That Outlived the Dark)",
    medium: "Charcoal & graphite on paper",
    kind: "Drawing",
    year: null,
    dimensions: null,
    status: "Original",
    lede: "Two people holding on, long after the night has passed.",
    text: [
      "An embrace drawn in soft charcoal, the figures rising out of bare white paper.",
      "Finished with brushes and a kneaded eraser — the light is lifted out, not drawn in.",
    ],
    image: img("/works/warmth-that-outlived-the-dark.jpg", ...TALL, "Charcoal drawing of a man with an afro embracing a woman"),
    gallery: [
      img("/works/process-brushes.jpg", ...CROP, "A handful of the brushes used to blend the charcoal"),
      img("/works/process-charcoal.jpg", ...TALL, "Blending the shoulder with a fine brush"),
    ],
    video: { src: "/videos/warmth.mp4", poster: "/videos/warmth.jpg" },
  },
  {
    slug: "muhammad-ali",
    title: "Muhammad Ali",
    subtitle: "(On Canvas)",
    medium: "Paint on canvas",
    kind: "Painting",
    year: null,
    dimensions: null,
    status: "Original",
    lede: "The roar, the ropes, the flashbulbs — one moment of boxing history, on canvas.",
    text: [
      "A study in muscle, sweat and satin, painted large against a black ring and a raw gold ground.",
    ],
    image: img("/works/muhammad-ali.jpg", 1440, 1909, "Painting of Muhammad Ali standing over a fallen opponent in the ring"),
    gallery: [
      img("/works/process-ali-detail.jpg", ...TALL, "Painting the fallen boxer’s glove"),
      img("/works/process-palette.jpg", ...TALL, "Mixing white on the palette"),
    ],
    video: { src: "/videos/muhammad-ali.mp4", poster: "/videos/muhammad-ali.jpg" },
  },
  {
    slug: "adigun-ati-akanni",
    title: "Adigun ati Akanni",
    subtitle: "(Pe Odun Kan)",
    medium: "Charcoal & graphite on paper, framed",
    kind: "Commissioned portrait",
    year: null,
    dimensions: null,
    status: "Private collection",
    lede: "Adigun and Akanni turn one.",
    text: [
      "A first-birthday portrait of twin boys in agbada and fila, seated among a talking drum, carved stools and a woven fan.",
      "Every pleat, bead and letter on the board drawn by hand from the family’s photograph.",
    ],
    image: img("/works/adigun-ati-akanni.jpg", 1440, 1416, "Framed charcoal portrait of twin boys in agbada and fila"),
    gallery: [
      img("/works/adigun-ati-akanni-detail.jpg", 1440, 1416, "Detail of one twin on a carved chair beside a drum"),
    ],
    video: null,
  },
];

export const getWork = (slug) => works.find((w) => w.slug === slug);

// Studio reels shown in the dark "From the studio" section.
export const reels = works
  .filter((w) => w.video)
  .map((w) => ({ slug: w.slug, title: w.title, subtitle: w.subtitle, ...w.video }));

// Full title for alt text, metadata and links, e.g. "My Serenity (Graphite)".
export const fullTitle = (w) => (w.subtitle ? `${w.title} ${w.subtitle}` : w.title);

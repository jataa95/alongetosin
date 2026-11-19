"use client";

import { useState } from "react";
import { artist } from "@/data/site";
import Pill from "./Pill";

// No backend: the form composes a message and opens WhatsApp or email with it filled in.
export default function CommissionForm() {
  const [f, setF] = useState({ name: "", subject: "", medium: "Pencil / charcoal", size: "", deadline: "", notes: "" });
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const message = [
    `Hello Tosin, my name is ${f.name || "—"}.`,
    `I'd like to commission a ${f.medium.toLowerCase()} piece.`,
    f.subject && `Subject: ${f.subject}`,
    f.size && `Size: ${f.size}`,
    f.deadline && `Needed by: ${f.deadline}`,
    f.notes && `Notes: ${f.notes}`,
  ]
    .filter(Boolean)
    .join("\n");

  const send = (via) => (e) => {
    e.preventDefault();
    const text = encodeURIComponent(message);
    const url =
      via === "whatsapp"
        ? `${artist.whatsappLink}?text=${text}`
        : `mailto:${artist.email}?subject=${encodeURIComponent("Commission enquiry")}&body=${text}`;
    window.open(url, via === "whatsapp" ? "_blank" : "_self");
  };

  const field = "w-full border-b border-ink/25 bg-transparent py-2 text-[15px] outline-none transition-colors focus:border-ink";

  return (
    <form onSubmit={send("whatsapp")} className="space-y-6">
      <label className="block">
        <span className="label text-mute">Your name</span>
        <input required value={f.name} onChange={set("name")} className={field} autoComplete="name" />
      </label>
      <label className="block">
        <span className="label text-mute">Who or what should be in it?</span>
        <input value={f.subject} onChange={set("subject")} placeholder="e.g. my parents on their wedding day" className={field} />
      </label>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="label text-mute">Medium</span>
          <select value={f.medium} onChange={set("medium")} className={field}>
            <option>Pencil / charcoal</option>
            <option>Painting on canvas</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label className="block">
          <span className="label text-mute">Size (approx.)</span>
          <input value={f.size} onChange={set("size")} placeholder="e.g. A2, 24 × 36 in" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="label text-mute">Needed by</span>
        <input value={f.deadline} onChange={set("deadline")} placeholder="Birthday, anniversary, date…" className={field} />
      </label>
      <label className="block">
        <span className="label text-mute">Anything else</span>
        <textarea rows={4} value={f.notes} onChange={set("notes")} className={`${field} resize-none`} />
      </label>

      <p className="text-[12px] text-mute">Reference photos can be attached once the chat or email opens.</p>

      <div className="flex flex-wrap items-center gap-5">
        <Pill as="button" type="submit">Send on WhatsApp</Pill>
        <button type="button" onClick={send("email")} className="label link-line">
          Or send by email
        </button>
      </div>
    </form>
  );
}

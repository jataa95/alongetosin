import { artist } from "@/data/site";

// Small two-column table of a work's details. Blank fields are skipped.
export default function WorkFacts({ work }) {
  const rows = [
    ["Year", work.year],
    ["Medium", work.medium],
    ["Artist", artist.name],
    ["Dimensions", work.dimensions],
    ["Edition", work.status],
  ].filter(([, v]) => v);

  return (
    <dl className="grid grid-cols-[100px_1fr] gap-y-1.5 border-t border-line pt-4 text-[12px]">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="label pt-0.5 text-mute">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

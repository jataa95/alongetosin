// Small two-column table of a work's details. Blank fields are skipped.
export default function WorkFacts({ work, dark = false }) {
  const rows = [
    ["Year", work.year],
    ["Medium", work.medium],
    ["Type", work.kind],
    ["Dimensions", work.dimensions],
    ["Status", work.status],
  ].filter(([, v]) => v);

  return (
    <dl className={`grid grid-cols-[110px_1fr] gap-y-2 border-t pt-4 text-[13px] ${dark ? "border-paper/15" : "border-line"}`}>
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className={`label pt-0.5 ${dark ? "text-paper/50" : "text-mute"}`}>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

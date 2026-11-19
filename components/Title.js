// Work title with its muted second part, e.g. "My Serenity (Graphite)".
export default function Title({ work, as: Tag = "span", stacked = false, className = "" }) {
  return (
    <Tag className={className}>
      {work.title}
      {work.subtitle && (
        <>
          {stacked ? <br /> : " "}
          <span className="text-mute">{work.subtitle}</span>
        </>
      )}
    </Tag>
  );
}

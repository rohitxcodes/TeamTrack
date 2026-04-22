function PageHeader({
  title,
  subtitle,
  level = "page",
  actions = null,
  className = "",
}) {
  const titleClass =
    level === "display"
      ? "tt-heading-display"
      : level === "section"
        ? "tt-heading-section"
        : "tt-heading-page";

  return (
    <div
      className={`flex items-start justify-between gap-4 flex-wrap ${className}`.trim()}
    >
      <div>
        <h1 className={titleClass}>{title}</h1>
        {subtitle ? <p className="tt-muted mt-2">{subtitle}</p> : null}
      </div>
      {actions ? (
        <div className="flex items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}

export default PageHeader;

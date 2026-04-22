function PageHeader({
  title,
  subtitle,
  level = "page",
  actions = null,
  className = "",
}) {
  const titleClass =
    level === "display"
      ? "text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight font-extrabold text-slate-900 dark:text-slate-100"
      : level === "section"
        ? "text-xl md:text-2xl leading-snug font-bold text-slate-900 dark:text-slate-100"
        : "text-3xl md:text-4xl leading-tight tracking-tight font-extrabold text-slate-900 dark:text-slate-100";

  return (
    <div
      className={`flex items-start justify-between gap-4 flex-wrap ${className}`.trim()}
    >
      <div>
        <h1 className={titleClass}>{title}</h1>
        {subtitle ? (
          <p className="mt-2 text-slate-600 dark:text-slate-300">{subtitle}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}

export default PageHeader;

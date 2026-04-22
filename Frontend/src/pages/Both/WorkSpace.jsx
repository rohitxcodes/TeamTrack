import { useState } from "react";
import { getMyGroups } from "../../api/groups";
import PageHeader from "../../components/Common/PageHeader";

function WorkSpace() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchGroups() {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const response = await getMyGroups();
      const normalized =
        typeof response === "string"
          ? response
          : JSON.stringify(response, null, 2);
      setResult(normalized);
    } catch (err) {
      setError(err.message || "Failed to load groups");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_6px_24px_rgba(15,23,42,0.06)] md:p-8 dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_8px_26px_rgba(2,6,23,0.5)]">
      <PageHeader
        title="Workspace"
        subtitle="Group context hook-up. This currently calls /api/groups/my."
        className="mb-4"
      />

      <button
        type="button"
        onClick={fetchGroups}
        className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-blue-600 dark:text-slate-50 dark:hover:bg-blue-500"
      >
        {loading ? "Loading..." : "Load my groups"}
      </button>

      {result ? (
        <pre className="mt-4 text-xs bg-slate-950 text-slate-100 p-4 rounded-xl overflow-x-auto">
          {result}
        </pre>
      ) : null}
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
    </section>
  );
}

export default WorkSpace;

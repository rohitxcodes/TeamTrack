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
    <section className="tt-card p-6 md:p-8">
      <PageHeader
        title="Workspace"
        subtitle="Group context hook-up. This currently calls /api/groups/my."
        className="mb-4"
      />

      <button type="button" onClick={fetchGroups} className="tt-btn-primary">
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

import { useState } from "react";
import { getMyGroups } from "../../api/groups";

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
    <section className="rounded-2xl bg-white border border-slate-200 p-6">
      <h1 className="text-2xl font-bold mb-2">Workspace</h1>
      <p className="text-slate-600 mb-4">
        Group context hook-up. This currently calls <code>/api/groups/my</code>.
      </p>

      <button
        type="button"
        onClick={fetchGroups}
        className="rounded-lg bg-slate-900 text-white px-4 py-2 hover:bg-slate-700"
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

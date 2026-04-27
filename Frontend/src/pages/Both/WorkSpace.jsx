import { useState } from "react";
import PageHeader from "../../components/Common/PageHeader";

function WorkSpace() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchGroups() {
    setLoading(true);
    setError("");
    setResult(
      JSON.stringify(
        {
          message: "Logic removed: implement group fetch here.",
          hint: "Call your own API and replace this sample payload.",
        },
        null,
        2,
      ),
    );
    setLoading(false);
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

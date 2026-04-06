import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="grid md:grid-cols-2 gap-4">
      <article className="rounded-2xl bg-white border border-slate-200 p-6">
        <h2 className="text-xl font-bold mb-2">Frontend wiring complete</h2>
        <p className="text-slate-600 mb-4">
          Routing, auth context, API utilities, protected pages, and layout are
          now connected.
        </p>
        <Link to="/dashboard" className="text-slate-900 underline">
          Open dashboard
        </Link>
      </article>

      <article className="rounded-2xl bg-white border border-slate-200 p-6">
        <h2 className="text-xl font-bold mb-2">Backend endpoints in use</h2>
        <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
          <li>/api/auth/register</li>
          <li>/api/auth/login</li>
          <li>/api/auth/logout</li>
          <li>/api/auth/me</li>
          <li>/api/admin/tasks</li>
          <li>/api/groups/my</li>
        </ul>
      </article>
    </section>
  );
}

export default HomePage;

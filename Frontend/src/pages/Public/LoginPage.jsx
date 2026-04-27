import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/Common/PageHeader";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function onChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    setMessage("Logic removed: implement login submit flow yourself.");
    setSubmitting(false);
  }

  return (
    <section className="tt-card max-w-lg mx-auto p-6 md:p-8">
      <PageHeader
        title="Login"
        subtitle="Access your TeamTrack workspace."
        className="mb-6"
      />

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block space-y-1">
          <span className="text-sm font-medium">Email</span>
          <input
            className="tt-input"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={onChange}
          />
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Password</span>
          <input
            className="tt-input"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={onChange}
          />
        </label>

        <button
          disabled={submitting}
          className="tt-btn-primary w-full disabled:opacity-70"
          type="submit"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      {message ? (
        <p className="mt-4 text-emerald-700 text-sm">{message}</p>
      ) : null}
      <p className="mt-6 text-sm tt-muted">
        No account yet?{" "}
        <Link
          to="/register"
          className="text-slate-900 underline decoration-teal-500"
        >
          Register here
        </Link>
      </p>
    </section>
  );
}

export default LoginPage;

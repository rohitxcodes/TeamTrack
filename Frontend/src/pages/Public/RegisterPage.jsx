import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import PageHeader from "../../components/Common/PageHeader";

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function onChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const response = await register(formData);
      setMessage(
        typeof response === "string" ? response : "Registration successful",
      );
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 700);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_6px_24px_rgba(15,23,42,0.06)] md:p-8 dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_8px_26px_rgba(2,6,23,0.5)]">
      <PageHeader
        title="Register"
        subtitle="Create your TeamTrack account."
        className="mb-6"
      />

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block space-y-1">
          <span className="text-sm font-medium">Name</span>
          <input
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 transition focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            name="name"
            required
            value={formData.name}
            onChange={onChange}
          />
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Email</span>
          <input
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 transition focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
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
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 transition focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={onChange}
          />
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Role</span>
          <select
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 transition focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            name="role"
            value={formData.role}
            onChange={onChange}
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <button
          disabled={submitting}
          className="w-full rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-70 dark:bg-blue-600 dark:text-slate-50 dark:hover:bg-blue-500"
          type="submit"
        >
          {submitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      {message ? (
        <p className="mt-4 text-emerald-700 text-sm">{message}</p>
      ) : null}
      {error ? <p className="mt-4 text-red-600 text-sm">{error}</p> : null}

      <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">
        Already registered?{" "}
        <Link
          to="/login"
          className="text-slate-900 underline decoration-teal-500 dark:text-slate-100"
        >
          Login here
        </Link>
      </p>
    </section>
  );
}

export default RegisterPage;

import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/Common/PageHeader";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
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

    setMessage("Logic removed: implement registration flow yourself.");
    setSubmitting(false);
  }

  return (
    <section className="tt-card max-w-lg mx-auto p-6 md:p-8">
      <PageHeader
        title="Register"
        subtitle="Create your TeamTrack account."
        className="mb-6"
      />

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block space-y-1">
          <span className="text-sm font-medium">Name</span>
          <input
            className="tt-input"
            name="name"
            required
            value={formData.name}
            onChange={onChange}
          />
        </label>

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

        <label className="block space-y-1">
          <span className="text-sm font-medium">Role</span>
          <select
            className="tt-input"
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
          className="tt-btn-primary w-full disabled:opacity-70"
          type="submit"
        >
          {submitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      {message ? (
        <p className="mt-4 text-emerald-700 text-sm">{message}</p>
      ) : null}
      <p className="mt-6 text-sm tt-muted">
        Already registered?{" "}
        <Link
          to="/login"
          className="text-slate-900 underline decoration-teal-500"
        >
          Login here
        </Link>
      </p>
    </section>
  );
}

export default RegisterPage;

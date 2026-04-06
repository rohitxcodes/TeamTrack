import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

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
    <section className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h1 className="text-2xl font-semibold mb-2">Register</h1>
      <p className="text-slate-600 mb-6">Create your TeamTrack account.</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block space-y-1">
          <span className="text-sm font-medium">Name</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            name="name"
            required
            value={formData.name}
            onChange={onChange}
          />
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Email</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
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
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
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
            className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
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
          className="w-full rounded-lg bg-slate-900 text-white py-2.5 font-medium disabled:opacity-70"
          type="submit"
        >
          {submitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      {message ? (
        <p className="mt-4 text-emerald-700 text-sm">{message}</p>
      ) : null}
      {error ? <p className="mt-4 text-red-600 text-sm">{error}</p> : null}

      <p className="mt-6 text-sm text-slate-600">
        Already registered?{" "}
        <Link to="/login" className="text-slate-900 underline">
          Login here
        </Link>
      </p>
    </section>
  );
}

export default RegisterPage;

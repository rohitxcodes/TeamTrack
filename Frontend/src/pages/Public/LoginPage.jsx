import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../../components/Common/PageHeader";
import { useAuth } from "../../context/useAuth";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/workspace", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function onChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setMessageType("info");

    try {
      await login(formData);
      navigate("/workspace", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        err?.error ||
        "Login failed";
      setMessageType("error");
      setMessage(msg);
    } finally {
      setSubmitting(false);
    }
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
        <p
          className={`mt-4 text-sm ${
            messageType === "error" ? "text-rose-700" : "text-emerald-700"
          }`}
        >
          {message}
        </p>
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

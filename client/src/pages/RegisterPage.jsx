import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { registerUser } from "../api";

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await registerUser(form);
      setSuccess(response.message || "Registration successful");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Create Account"
      footerText="Already have an account?"
      footerLinkText="Sign in now."
      footerLinkTo="/login"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          placeholder="Name"
          className="w-full rounded bg-zinc-800 px-4 py-3 text-white outline-none ring-1 ring-zinc-700 focus:ring-netflix-red"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="w-full rounded bg-zinc-800 px-4 py-3 text-white outline-none ring-1 ring-zinc-700 focus:ring-netflix-red"
          required
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="w-full rounded bg-zinc-800 px-4 py-3 text-white outline-none ring-1 ring-zinc-700 focus:ring-netflix-red"
          required
        />
        <input
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          type="password"
          placeholder="Confirm Password"
          className="w-full rounded bg-zinc-800 px-4 py-3 text-white outline-none ring-1 ring-zinc-700 focus:ring-netflix-red"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-netflix-red px-4 py-3 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      {success && <p className="mt-4 text-sm text-green-400">{success}</p>}
    </AuthShell>
  );
}

export default RegisterPage;

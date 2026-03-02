import { useState } from "react";
import AuthShell from "../components/AuthShell";
import { loginUser } from "../api";

const DEFAULT_REDIRECT_URL = "https://kodflix-flax.vercel.app/";

function resolveRedirectUrl() {
  const configuredUrl = import.meta.env.VITE_POST_LOGIN_REDIRECT_URL?.trim();
  const candidate = configuredUrl || DEFAULT_REDIRECT_URL;

  try {
    return new URL(candidate).toString();
  } catch {
    return DEFAULT_REDIRECT_URL;
  }
}

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    try {
      await loginUser(form);
      window.location.replace(resolveRedirectUrl());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Sign In"
      footerText="New to Kodflix?"
      footerLinkText="Create an account."
      footerLinkTo="/register"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
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
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-netflix-red px-4 py-3 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
    </AuthShell>
  );
}

export default LoginPage;

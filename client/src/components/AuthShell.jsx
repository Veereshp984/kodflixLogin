import { Link } from "react-router-dom";

function AuthShell({ title, children, footerText, footerLinkText, footerLinkTo }) {
  const movieWallBg = "/bgImage.jpg";

  return (
    <div className="min-h-screen bg-black text-white">
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${movieWallBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/90" />
        <div className="absolute inset-0 bg-black/25" />

        <header className="relative z-10 px-6 py-5 md:px-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-netflix-red">KODFLIX</h1>
        </header>

        <main className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-md items-center px-4 pb-10">
          <section className="w-full rounded-md bg-netflix-panel p-8 shadow-2xl md:p-10">
            <h2 className="mb-6 text-3xl font-semibold">{title}</h2>
            {children}
            <p className="mt-6 text-sm text-zinc-300">
              {footerText}{" "}
              <Link to={footerLinkTo} className="font-medium text-white hover:underline">
                {footerLinkText}
              </Link>
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AuthShell;

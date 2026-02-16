import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-20">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <div className="grid gap-10 md:grid-cols-[1fr_320px] md:items-center">
          {/* Left: message + actions */}
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">
              404 — Page not found
            </p>

            <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              This page doesn’t exist.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-700">
              The link may be outdated, or the page may have moved. Use the buttons
              below to get back to a valid section of the site.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/" className="btn-sweep">
                Back to Home
              </Link>

              <Link href="/projects" className="btn-sweep">
                Projects
              </Link>

              <Link href="/research" className="btn-sweep">
                Research
              </Link>

              <Link href="/internships" className="btn-sweep">
                Internships
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700">
              <Link href="/leadership" className="link-sweep">
                Leadership
              </Link>
              <Link href="/awards" className="link-sweep">
                Awards
              </Link>
              <Link href="/skills" className="link-sweep">
                Skills
              </Link>
              <Link href="/interests" className="link-sweep">
                Interests
              </Link>
            </div>
          </div>

          {/* Right: simple “display room” illustration area */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <div className="flex h-56 items-center justify-center md:h-72">
              <div className="text-center">
                <p className="font-heading text-2xl font-semibold text-slate-900">
                  Boyang Gong
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Navigate using the links
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: "var(--accent-fill)" }}
                  />
                  <span>Yellow indicates active/hover</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 bg-white px-5 py-4 text-xs text-slate-600">
              Tip: check your URL spelling or use the navbar.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

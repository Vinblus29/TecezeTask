import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image + soft gradient overlay */}
      <div className="absolute inset-0 -z-20 bg-[url('/images/retro-paper.jpg')] bg-cover bg-center bg-fixed animate-pan-slow" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-100/70 via-rose-100/60 to-emerald-100/70" />

      {/* Navigation */}
      <header className="px-4 py-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-700 to-rose-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-stone-900">Teceze Pricebook</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-stone-700 hover:text-stone-900 font-medium transition-colors">
              Home
            </Link>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-700 to-rose-600 text-white px-5 py-2.5 font-medium shadow-md hover:from-amber-800 hover:to-rose-700 transition-all"
            >
              Get Quote
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-12 sm:px-6 lg:py-16 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 mb-6">
              Global • Fast • Consistent
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              Instant, region-aware pricing for{" "}
              <span className="text-rose-600 underline decoration-rose-400/60 decoration-4 underline-offset-4">
                L1–L5
              </span>{" "}
              services.
            </h1>
            <p className="mt-6 text-xl text-stone-700 leading-8">
              Pick a region & country, choose a service level and engagement type—get a precise quote in seconds.
              Backfill options, monthly short/long-term, and yearly plans supported.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-700 to-rose-600 text-white px-8 py-4 text-base font-semibold shadow-md hover:from-amber-800 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-700 transition-all transform hover:scale-105 active:scale-95"
              >
                Get a Quote
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <a href="#how-it-works" className="text-stone-800 hover:text-stone-900 font-medium transition-colors">
                How it works
              </a>
            </div>
          </div>

          {/* Hero card */}
          <div className="animate-slide-up">
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-amber-200/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-emerald-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-stone-900">Region & Currency aware</h3>
              </div>
              <p className="text-stone-700 mb-8">
                We auto-align currency and valid supplier/payment terms for each country to avoid mismatches.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <Stat label="Countries" value="100+" />
                <Stat label="Service levels" value="L1–L5" />
                <Stat label="Engagements" value="Yearly / Monthly" />
                <Stat label="Backfill" value="Optional" />
              </div>

              <div>
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 rounded-lg bg-stone-900 text-white px-5 py-2.5 font-medium shadow hover:bg-stone-800 transition-all"
                >
                  Start quoting
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="px-4 py-16 sm:px-6 lg:py-24 lg:px-8 bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-stone-900 sm:text-4xl">Built for accuracy & speed</h2>
            <p className="mt-4 text-xl text-stone-700">
              Your selections map directly to the global pricebook to return a single, reliable total.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Feature
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              title="Region aware"
              text="Countries are filtered by region, and currency auto-fills from valid combos."
            />
            <Feature
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              title="Currency correct"
              text="Quotes return a single total amount in the correct currency."
            />
            <Feature
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              title="Engagement types"
              text="Yearly (with/without backfill) or Monthly (short/long-term)."
            />
            <Feature
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
              title="Backfill ready"
              text="Toggle backfill for yearly engagements when needed."
            />
          </div>

          {/* Service Levels Section */}
          <div className="mt-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h3 className="text-2xl font-extrabold text-stone-900 sm:text-3xl">Service Levels Available</h3>
              <p className="mt-4 text-lg text-stone-700">
                From basic support to complex architecture solutions, we cover all service levels.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  level: "L1",
                  title: "Basic Support",
                  desc: "Network connectivity, password resets, equipment installation",
                },
                { level: "L2", title: "Advanced Support", desc: "Network logs analysis, router/switch configuration" },
                { level: "L3", title: "Complex Resolution", desc: "Packet captures, network design, optimization" },
                { level: "L4", title: "Infrastructure", desc: "Network management, monitoring, security coordination" },
                {
                  level: "L5",
                  title: "Architecture",
                  desc: "Design, critical support, optimization, project leadership",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-amber-200/50 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-gradient-to-r from-amber-700 to-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {service.level}
                    </div>
                    <h4 className="font-semibold text-stone-900">{service.title}</h4>
                  </div>
                  <p className="text-sm text-stone-700">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-amber-700 to-rose-600 rounded-2xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Ready to get a price?</h3>
              <p className="text-rose-100/90 max-w-xl">
                Generate a quote in under 30 seconds with our streamlined pricing tool.
              </p>
            </div>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-amber-800 px-6 py-3 text-base font-semibold shadow-md hover:bg-stone-50 transition-all whitespace-nowrap"
            >
              Get Quote
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 sm:px-6 lg:px-8 bg-white/80 backdrop-blur border-t border-amber-200/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-stone-700">
          <p>© {new Date().getFullYear()} Teceze. All rights reserved.</p>
          <p className="text-sm">Professional pricing solutions for global businesses</p>
        </div>
      </footer>

      {/* Local animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in .7s ease-out both; }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up .8s cubic-bezier(.16,1,.3,1) both; animation-delay: .2s; }

        @keyframes pan-slow {
          0% { background-position: 50% 50%; }
          50% { background-position: 52% 48%; }
          100% { background-position: 50% 50%; }
        }
        .animate-pan-slow { animation: pan-slow 18s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-emerald-50/70 rounded-xl p-4 border border-emerald-200/60 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-emerald-800 font-semibold">{label}</p>
      <p className="text-lg font-bold text-stone-900 mt-1">{value}</p>
    </div>
  )
}

function Feature({ icon, title, text }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-amber-200/50 hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-800 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-stone-900 mb-2">{title}</h3>
      <p className="text-stone-700">{text}</p>
    </div>
  )
}

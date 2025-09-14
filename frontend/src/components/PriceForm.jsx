import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOptions, fetchQuote } from "../api/priceApi";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

// Lightweight helper to fetch valid combos for a Region+Country
async function fetchCombos(region, country) {
  const qs = new URLSearchParams({ region, country });
  const res = await fetch(`${API_BASE}/price/combos?${qs.toString()}`);
  if (!res.ok) throw new Error("Combos endpoint not available");
  return res.json(); // [{ supplier, currency, paymentTerms }, ...]
}

export default function PriceForm() {
  const [loading, setLoading] = useState(true);
  const [opts, setOpts] = useState(null);
  const [error, setError] = useState("");

  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [supplier, setSupplier] = useState("");
  const [currency, setCurrency] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [serviceLevel, setServiceLevel] = useState("");
  const [engagementType, setEngagementType] = useState(""); // yearly | monthly_short | monthly_long
  const [withBackfill, setWithBackfill] = useState(false);

  const [quote, setQuote] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Initial options load
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchOptions();
        setOpts(data);
        // Sensible defaults
        const defaultRegion = data.regions?.[0] || "";
        setRegion(defaultRegion);
        setSupplier(data.suppliers?.[0] || "Direct");
        setCurrency(data.currencies?.[0] || "");
        setPaymentTerms(data.paymentTerms?.[0] || "60 Days");
        setServiceLevel(data.serviceLevels?.[0] || "L1");
        setEngagementType(data.engagementTypes?.[0]?.value || "yearly");
      } catch (e) {
        setError(e.message || "Failed to load options");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Countries list derived by region
  const countries = useMemo(() => {
    if (!opts || !region) return [];
    return opts.countriesByRegion?.[region] || [];
  }, [opts, region]);

  // Auto-pick first country when region changes
  useEffect(() => {
    if (countries.length) setCountry(countries[0]);
  }, [countries]);

  // Auto-disable backfill unless yearly
  useEffect(() => {
    if (engagementType !== "yearly") setWithBackfill(false);
  }, [engagementType]);

  // Auto-fill Currency (and optionally align supplier/paymentTerms) when Region+Country change
  useEffect(() => {
    (async () => {
      if (!region || !country) return;
      try {
        const combos = await fetchCombos(region, country);
        if (Array.isArray(combos) && combos.length > 0) {
          const first = combos[0];
          setCurrency(first.currency || currency);
          // (Optional) Lock these too if you want guaranteed-valid combos:
          // setSupplier(first.supplier || supplier);
          // setPaymentTerms(first.paymentTerms || paymentTerms);
        }
      } catch {
        // If /combos endpoint isn't implemented, silently ignore and keep previous currency.
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, country]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setQuote(null);
    setError("");
    setSubmitting(true);

    try {
      const payload = {
        region,
        country,
        supplier,
        currency,
        paymentTerms,
        serviceLevel,
        engagementType,
        withBackfill,
      };
      const data = await fetchQuote(payload);
      setQuote(data); // { currency, amount, ... }
    } catch (e) {
      setError(e.message || "Failed to calculate quote");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <div className="flex flex-col items-center animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
          <p className="mt-4 text-stone-600">Loading options...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <div className="max-w-md w-full bg-white/90 backdrop-blur p-6 rounded-xl shadow-lg">
          <div className="text-rose-700 bg-rose-50 p-4 rounded-md border border-rose-200">
            <h2 className="font-semibold mb-1">Error Loading Form</h2>
            <p>{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-amber-700 to-rose-600 text-white rounded-md hover:from-amber-800 hover:to-rose-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image + soft gradient overlay */}
      <div className="absolute inset-0 -z-20 bg-[url('/images/retro-paper.jpg')] bg-cover bg-center bg-fixed animate-pan-slow" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-100/70 via-rose-100/60 to-emerald-100/70" />

      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* 🔙 Back button */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-stone-900 bg-white/70 px-4 py-2 rounded-lg shadow hover:shadow-md transition-all"
            >
              ← Back to Home
            </Link>
          </div>
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 mb-2">
              Global Price Quote
            </h1>
            <p className="text-stone-600">
              Get an instant quote for our global services
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden animate-slide-up">
            <form onSubmit={onSubmit} className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Region */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-stone-700">
                    Region
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-white/90 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    {opts.regions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-stone-700">
                    Country
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-white/90 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Supplier */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-stone-700">
                    Supplier
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-white/90 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                  >
                    {opts.suppliers.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Currency (auto-filled from Region+Country) */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-stone-700">
                    Currency
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-white/90 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    {opts.currencies.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-stone-500 mt-1">
                    Auto-filled based on Region & Country
                  </p>
                </div>

                {/* Payment Terms */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-stone-700">
                    Payment Terms
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-white/90 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                  >
                    {opts.paymentTerms.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Level */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-stone-700">
                    Service Level
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-white/90 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
                    value={serviceLevel}
                    onChange={(e) => setServiceLevel(e.target.value)}
                  >
                    {opts.serviceLevels.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Engagement Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-stone-700">
                    Engagement Type
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-white/90 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
                    value={engagementType}
                    onChange={(e) => setEngagementType(e.target.value)}
                  >
                    {opts.engagementTypes.map((et) => (
                      <option key={et.value} value={et.value}>
                        {et.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* With Backfill (checkbox only relevant for Yearly) */}
                <div className="flex items-center pt-5">
                  <input
                    id="withBackfill"
                    type="checkbox"
                    className="h-4 w-4 accent-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 rounded-sm"
                    checked={withBackfill}
                    onChange={(e) => setWithBackfill(e.target.checked)}
                    disabled={engagementType !== "yearly"}
                  />
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="withBackfill"
                      className={`font-medium ${
                        engagementType !== "yearly"
                          ? "text-stone-400"
                          : "text-stone-700"
                      }`}
                    >
                      With Backfill
                    </label>
                    <p className="text-stone-500 text-xs mt-1">
                      Yearly engagements only
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-amber-700 to-rose-600 text-white font-semibold rounded-lg shadow-md hover:from-amber-800 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Calculating...
                    </span>
                  ) : (
                    "Get Quote"
                  )}
                </button>
              </div>
            </form>

            {/* Quote Result – only total amount */}
            {quote && (
              <div className="border-t border-amber-200/40 bg-amber-50/50 p-6 sm:p-8 animate-fade-in">
                <div className="max-w-md mx-auto text-center">
                  <h2 className="text-lg font-medium text-stone-900 mb-1">
                    Your Quote
                  </h2>
                  <p className="text-sm text-stone-600 mb-4">
                    Total estimated cost
                  </p>
                  <div className="bg-white/90 rounded-lg p-6 shadow-sm">
                    <p className="text-3xl font-extrabold tracking-tight text-stone-900">
                      {quote.currency}{" "}
                      {Number(quote.amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => setQuote(null)}
                    className="mt-4 text-sm text-rose-700 hover:text-rose-800 font-medium transition-colors"
                  >
                    Adjust parameters
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-md animate-slide-up">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-rose-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-rose-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center text-sm text-stone-600">
            <p>Need help? Contact our sales team at sales@example.com</p>
          </div>
        </div>
      </div>

      {/* Local animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in .5s ease-out both; }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up .6s cubic-bezier(.16,1,.3,1) both; }

        @keyframes pan-slow {
          0% { background-position: 50% 50%; }
          50% { background-position: 52% 48%; }
          100% { background-position: 50% 50%; }
        }
        .animate-pan-slow { animation: pan-slow 18s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

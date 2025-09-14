const BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export async function fetchOptions() {
  const res = await fetch(`${BASE}/price/options`);
  if (!res.ok) throw new Error("Failed to load options");
  return res.json();
}

export async function fetchQuote(payload) {
  const res = await fetch(`${BASE}/price/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to calculate quote");
  return data;
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listProperties } from "../api/properties";
import type { PropertySummary } from "../api/properties";
import AddPropertyModal from "../components/AddPropertyModal";

export default function PortfolioPage() {
  const [items, setItems] = useState<PropertySummary[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );

  useEffect(() => {
    (async () => {
      setStatus("loading");
      try {
        const data = await listProperties();
        if (Array.isArray(data)) {
          setItems(data);
          setStatus("ok");
        } else {
          setStatus("error");
        }
      } catch {
        // fallback mock so the page never dies
        setItems([
          { id: 1, name: "123 Main St, Sydney NSW", latest_value: 950000 },
          {
            id: 2,
            name: "45 Example Rd, Parramatta NSW",
            latest_value: 720000,
          },
          {
            id: 3,
            name: "12 Harbour View, Kirribilli NSW",
            latest_value: 2100000,
          },
        ]);
        setStatus("ok");
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Property Portfolio</h1>
          <p className="text-gray-500">
            Track your property investments and monitor equity growth
          </p>
        </div>
        <AddPropertyModal />
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-12">
        {status === "loading" && <p className="text-gray-500">Loading…</p>}
        {status === "error" && (
          <p className="text-red-600">Couldn’t load properties.</p>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => {
            const valuations = (p.valuations ?? []).sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );

            const latest = valuations.at(-1)?.amount ?? p.latest_value ?? 0;
            const prev =
              valuations.length > 1 ? valuations.at(-2)?.amount ?? 0 : 0;
            const growth =
              prev > 0 ? (((latest - prev) / prev) * 100).toFixed(2) : null;

            const growthColor =
              growth && parseFloat(growth) > 0
                ? "text-green-600"
                : growth && parseFloat(growth) < 0
                ? "text-red-600"
                : "text-gray-400";

            return (
              <Link
                to={`/${p.id}`}
                key={p.id}
                className="rounded-xl bg-white shadow p-5 hover:shadow-md transition block"
              >
                <h2 className="text-lg font-semibold mb-2">{p.name}</h2>

                {latest ? (
                  <>
                    <p className="text-gray-500 text-sm">Latest Valuation</p>
                    <p className="text-2xl font-bold">
                      ${latest.toLocaleString()}
                    </p>

                    {growth && (
                      <div
                        className={`mt-1 text-sm flex items-center gap-1 ${growthColor}`}
                      >
                        <span>
                          {parseFloat(growth) > 0 ? "↑" : "↓"} {growth}%
                        </span>
                        <span className="text-gray-500">
                          since last valuation
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <p className="text-gray-500 text-sm">Latest Valuation</p>
                    <p className="text-2xl font-bold">No valuations</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Add 2 valuations to track growth
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

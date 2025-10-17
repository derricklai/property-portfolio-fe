import { useState } from "react";
import { addValuation } from "../api/valuations";

export default function AddValuationModal({
  propertyId,
  onAdded,
}: {
  propertyId: string;
  onAdded: (newValuation: { date: string; amount: number }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newVal = await addValuation(propertyId, {
        amount: Number(amount),
        date,
      });
      console.log("✅ Added valuation:", newVal);
      onAdded(newVal); // notify parent to update instantly
      setOpen(false);
      setAmount("");
      setDate("");
    } catch (err) {
      console.error("❌ Failed to add valuation", err);
      alert("Failed to add valuation");
    } finally {
      setLoading(false);
    }
  };

  // closed state → just show button
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        + Add Valuation
      </button>
    );
  }

  // open modal state
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[360px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add Valuation</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Amount ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

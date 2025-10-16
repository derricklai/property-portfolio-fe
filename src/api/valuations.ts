export async function addValuation(
  propertyId: string,
  payload: { amount: number; date: string }
) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/valuations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      property_id: Number(propertyId),
      amount: payload.amount,
      date: payload.date,
    }),
  });
  if (!res.ok) {
    console.error("Failed response:", res.status, await res.text());
    throw new Error("Failed to add valuation");
  }
  return res.json();
}

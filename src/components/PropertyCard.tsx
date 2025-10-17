import { Link } from "react-router-dom";

export default function PropertyCard({ id, name, latest_value }: any) {
  return (
    <Link
      to={`/${id}`}
      className="rounded-xl bg-white shadow p-5 hover:shadow-md transition block"
    >
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-500">
        {latest_value ? `$${latest_value.toLocaleString()}` : "No valuations"}
      </p>
    </Link>
  );
}

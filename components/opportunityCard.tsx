export default function OpportunityCard({ data }: { data: any }) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">{data.position}</h3>
      <p className="text-sm text-gray-500">{data.status}</p>
      <p className="text-sm text-gray-400 mt-1">
        {new Date(data.createdAt).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>
      {data.description && (
        <p className="text-sm text-gray-700 mt-2">{data.description}</p>
      )}
    </div>
  );
}

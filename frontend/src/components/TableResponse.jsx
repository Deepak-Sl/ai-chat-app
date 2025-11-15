export default function TableResponse({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="overflow-x-auto mt-2">
      <table className="min-w-full border border-gray-300 dark:border-gray-600 text-sm">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th
                key={key}
                className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              {Object.values(row).map((val, i) => (
                <td
                  key={i}
                  className="border border-gray-300 dark:border-gray-600 px-2 py-1"
                >
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
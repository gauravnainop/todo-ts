import { useEffect, useState } from "react";

interface TodoHistoryResponse {
  success: boolean;
  history: TodoHistoryItems[];
}
interface TodoHistoryItems {
  _id: string;
  title: string;
  completed: boolean;
  deletedTime: number;
}

const History = () => {
  const [history, setHistory] = useState<TodoHistoryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/todos/history");
        if (!response.ok) throw new Error("Unable To Fetch History");
        const historyData: TodoHistoryResponse = await response.json();
        console.log(historyData);

        setHistory(historyData);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (error)
    return <div className="text-red-500 text-center p-10">{error}</div>;
  if (loading) return <div>Loading tasks...</div>;
  if (!history || !history.history) return <div>No data available</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Deleted Todo History
      </h2>

      <div className="grid gap-4">
        {history?.history.map((hist) => (
          <div
            key={hist._id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                {hist.title}
              </h3>
              <p className="text-xs text-gray-400">
                Deleted on: {new Date(hist.deletedTime).toLocaleString()}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                hist.completed
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {hist.completed ? "Was Completed" : "Was Pending"}
            </span>
          </div>
        ))}
      </div>
      <div>
        {history?.history.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No tasks found. Relax!
          </p>
        )}
      </div>
    </div>
  );
};

export default History;

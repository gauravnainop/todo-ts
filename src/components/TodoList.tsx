import { useEffect, useState } from "react";

interface TodoItems {
  title: string;
  description: string;
  completed: boolean;
}

interface TodoResponse {
  success: boolean;
  todos: TodoItems[];
}

const TodoList = () => {
  const [todoData, setTodoData] = useState<TodoResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        if (!response.ok) throw new Error("Failed to fetch todos");
        const data: TodoResponse = await response.json();
        setTodoData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };
    fetchTodos();
  }, []);

  if (error)
    return (
      <div className="flex justify-center p-10">
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-200">
          Error: {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl border border-gray-100">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-6">
            My Tasks
          </div>

          <div className="space-y-4">
            {todoData?.todos.map((todo, index) => (
              <div
                key={index}
                className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
              >
                {/* Status Indicator */}
                <div
                  className={`mt-1 h-5 w-5 rounded-full border-2 shrink-0 ${
                    todo.completed
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300"
                  }`}
                >
                  {todo.completed && (
                    <svg
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                <div className="ml-4">
                  <h3
                    className={`text-lg font-medium ${todo.completed ? "text-gray-400 line-through" : "text-gray-900"}`}
                  >
                    {todo.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {todo.description}
                  </p>
                </div>
              </div>
            ))}

            {todoData?.todos.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No tasks found. Relax!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;

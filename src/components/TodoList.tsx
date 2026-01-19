import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

interface TodoItems {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface todoListProp {
  refreshTrigger: number;
}

interface TodoResponse {
  success: boolean;
  todos: TodoItems[];
}

const TodoList = ({ refreshTrigger }: todoListProp) => {
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
  }, [refreshTrigger, todoData]);

  const markSuccess = async (
    e: React.MouseEvent<HTMLDivElement>,
    todoId: string,
  ) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/todos/mark_success/${todoId}`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error("Failed to Mark todos Success");
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const deleteTodo = async (
    e: React.MouseEvent<HTMLOrSVGElement>,
    todoId: string,
  ) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/todos/delete/${todoId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to Delete todos");
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  if (error)
    return (
      <div className="flex justify-center p-10">
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-200">
          Error: {error}
        </div>
      </div>
    );

  return (
    <div className="w-[65vw] bg-gray-50 mt-4 px-4  ">
      <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden  border border-gray-100">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-6">
            My Tasks
          </div>
          <div className="space-y-4">
            {todoData?.todos.map((todo, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                onClick={(e) => {
                  markSuccess(e, todo._id);
                }}
              >
                {/* Status Indicator */}
                <div className="flex items-center">
                  <div
                    className={`mt-1 h-5 w-5 rounded-full cursor-pointer border-2 shrink-0 ${
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
                <MdDelete
                  className="text-2xl text-red-700 cursor-pointer"
                  onClick={(e) => {
                    deleteTodo(e, todo._id);
                  }}
                />
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

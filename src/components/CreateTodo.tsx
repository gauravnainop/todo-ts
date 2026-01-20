import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

interface IFormInput {
  title: string;
  description: string;
}
interface createTodoProps {
  onTodoCreated: () => void;
}

const CreateTodo = ({ onTodoCreated }: createTodoProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    try {
      fetch("/api/todos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, completed: false }),
      });
      onTodoCreated();
    } catch (error) {}
  };

  return (
    <div className=" flex  flex-col  p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 ml-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Todo
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="title"
              className="text-sm font-semibold text-gray-600 ml-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="What needs to be done?"
              className={`border rounded-lg p-3 text-base outline-none transition-all ${errors.title ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"}`}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className="text-red-500 text-xs mt-1 ml-1">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="text-sm font-semibold text-gray-600 ml-1"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Add some details..."
              rows={3}
              className={`border rounded-lg p-3 text-base outline-none transition-all ${errors.description ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"}`}
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <span className="text-red-500 text-xs mt-1 ml-1">
                {errors.description.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md active:transform active:scale-[0.98]"
          >
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTodo;

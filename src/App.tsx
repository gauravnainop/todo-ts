import CreateTodo from "./components/CreateTodo";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-6 items-start">
        {/* Sidebar/Input area - Full width on mobile, fixed width on desktop */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-8">
          <CreateTodo />
        </div>

        {/* Main List area - Takes remaining space */}
        <div className="w-full lg:w-2/3">
          <TodoList />
        </div>
      </main>
    </div>
  );
};

export default App;

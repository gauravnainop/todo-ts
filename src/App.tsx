import { useState } from "react";
import CreateTodo from "./components/CreateTodo";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";


const App = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTodoCreated = () => {
    setRefreshTrigger(refreshTrigger + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="">
        <div className="w-full flex justify-center  relative">
          <CreateTodo onTodoCreated={handleTodoCreated} />
          <TodoList refreshTrigger={refreshTrigger} />
        </div>
      </main>
    </div>
  );
};

export default App;

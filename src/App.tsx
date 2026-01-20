import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import routing components
import CreateTodo from "./components/CreateTodo";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import History from "./pages/History"; // Assume this exists


const App = () => {
  const [todoCreatedTrigger, setTodoCreatedTrigger] = useState(0);

  const handleTodoCreated = () => {
    setTodoCreatedTrigger(todoCreatedTrigger + 1);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <div className="w-full flex justify-center relative">
                  <CreateTodo onTodoCreated={handleTodoCreated} />
                  <TodoList todoCreatedTrigger={todoCreatedTrigger} />
                </div>
              }
            />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;

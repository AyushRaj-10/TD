import { Navigate, Route, Routes } from "react-router-dom";

import TodoList from "./pages/TodoList";
import TodoDetails from "./pages/TodoDetails";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<TodoList />} />

        <Route path="/todo" element={<TodoDetails />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

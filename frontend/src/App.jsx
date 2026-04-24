import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminPanel from "./pages/AdminPanel";
import Employee from "./pages/Employee";
import AdminLayout from "./admin/AdminLayout";
import UsersPage from "./admin/UsersPage";
import TasksPage from "./admin/TasksPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/employedash" element={<Employee />} />

         <Route path="/users" element={< UsersPage/>} />
    <Route path="/adminpans" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
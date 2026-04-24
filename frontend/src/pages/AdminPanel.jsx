




import { useEffect, useState } from "react";
import API from "../services/api";
import "./Admin.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState("all");

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // 🔹 FETCH DATA
  const fetchData = async () => {
    try {
      const userRes = await API.get("/admin/users", authHeader);
      const taskRes = await API.get("/tasks/all", authHeader);

      setUsers(userRes.data || []);
      setTasks(taskRes.data || []);
      setFilteredTasks(taskRes.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  // 🔹 FILTER TASKS
  const handleFilter = (userId) => {
    setSelectedUser(userId);

    if (userId === "all") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(
        tasks.filter((t) => t.user && t.user._id === userId)
      );
    }
  };

  // 🔹 UPDATE TASK STATUS
  const updateTaskStatus = async (id, status) => {
    try {
      await API.put(
        `/tasks/${id}`,
        { status },
        authHeader
      );
      fetchData();
    } catch (err) {
      alert("Task update failed ❌");
    }
  };

  // 🔹 DELETE TASK
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`, authHeader);
      fetchData();
    } catch (err) {
      alert("Task delete failed ❌");
    }
  };

  // 🔹 DELETE USER
  const deleteUser = async (id) => {
    try {
      await API.delete(`/admin/user/${id}`, authHeader);
      fetchData();
    } catch (err) {
      alert("User delete failed ❌");
    }
  };

  return (
    <div className="admin-container">

      <h1>👑 Admin Dashboard</h1>

      {/* 👤 USERS SECTION */}
      <h2>Users</h2>
      <div className="card-container">
        {users.map((u) => (
          <div className="card user-card" key={u._id}>
            <h3>{u.name}</h3>
            <p>{u.email}</p>

            <button
              className="delete-btn"
              onClick={() => deleteUser(u._id)}
            >
              Delete User
            </button>
          </div>
        ))}
      </div>

      {/* 🔽 FILTER */}
      <h2>Filter Tasks</h2>
      <select
        className="select-box"
        value={selectedUser}
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="all">All Users</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
        ))}
      </select>

      {/* 📋 TASKS SECTION */}
      <h2>Tasks</h2>
      <div className="card-container">
        {filteredTasks.map((t) => (
          <div className="card task-card" key={t._id}>
            <h3>{t.title}</h3>
            <p>{t.description}</p>

            <p><b>User:</b> {t.user?.name}</p>

            {/* STATUS UPDATE */}
            <select
              className="select-box"
              value={t.status}
              onChange={(e) =>
                updateTaskStatus(t._id, e.target.value)
              }
            >
              <option value="pending">Pending</option>
              <option value="on_process">On Process</option>
              <option value="completed">Completed</option>
            </select>

            <button
              className="delete-btn"
              onClick={() => deleteTask(t._id)}
            >
              Delete Task
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminPanel;
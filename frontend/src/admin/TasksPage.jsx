import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  const getTasks = async () => {
    const res = await API.get("/tasks/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>

      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Task</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => (
            <tr key={t._id}>
              <td>{t.user?.name}</td>
              <td>{t.title}</td>
              <td>{t.status}</td>

              <td>
                <button onClick={() => nav(`/admin/edit-task/${t._id}`)}>
                  ✏️
                </button>

                <button>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksPage;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditTask = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
  });

  const token = localStorage.getItem("token");

  // 🔹 GET TASK
  const getTask = async () => {
    const res = await API.get(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTask(res.data);
  };

  useEffect(() => {
    getTask();
  }, []);

  // 🔹 HANDLE CHANGE
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // 🔹 UPDATE
  const updateTask = async (e) => {
    e.preventDefault();

    // await API.put(`/tasks/${id}`, task, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });

    // alert("Task Updated ✅");
    // nav("/admin/tasks");


    await API.put(
  `/tasks/status/${id}`,   // 🔥 change here
  { status: task.status },
  { headers: { Authorization: `Bearer ${token}` } }
);
  };

  return (
    <div>
      <h2>Edit Task</h2>

      <form onSubmit={updateTask}>
        <input
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <select name="status" value={task.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="on_process">On Process</option>
          <option value="completed">Completed</option>
        </select>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditTask;
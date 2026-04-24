import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditUser = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  const token = localStorage.getItem("token");

  // 🔹 GET USER
  const getUser = async () => {
    const res = await API.get(`/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  // 🔹 HANDLE CHANGE
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 🔹 UPDATE
  const updateUser = async (e) => {
    e.preventDefault();

    await API.put(`/admin/users/${id}`, user, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("User Updated ✅");
    nav("/");
  };

  return (
    <div>
      <h2>Edit User</h2>

      <form onSubmit={updateUser}>
        <input
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <input
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <select name="role" value={user.role} onChange={handleChange}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
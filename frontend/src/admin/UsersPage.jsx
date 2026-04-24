import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  const getUsers = async () => {
    const res = await API.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>

      <input placeholder="Search..." />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>

              <td>
                <button onClick={() => nav(`/admin/edit-user/${u._id}`)}>
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

export default UsersPage;
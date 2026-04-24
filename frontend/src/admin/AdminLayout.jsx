import { Link, Outlet } from "react-router-dom";
import "./Admin.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">

      {/* 🔥 SIDEBAR */}
      <div className="sidebar">
        <h2>Admin</h2>
        <Link to="/users">Users</Link>
        <Link to="/tasks">Tasks</Link>
      </div>

      {/* 🔥 MAIN */}
      <div className="main">
        <div className="topbar">
          <h3>Dashboard</h3>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
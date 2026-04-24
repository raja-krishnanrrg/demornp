// // import { useState, useEffect } from "react";
// // import { useNavigate, useLocation, Link } from "react-router-dom";
// // import API from "../services/api";
// // import "./Login.css";

// // const Login = () => {
// //   const nav = useNavigate();
// //   const location = useLocation();

// //   const [form, setForm] = useState({
// //     email: "",
// //     password: "",
// //   });

// //   // 👉 auto fill from register page
// //   useEffect(() => {
// //     if (location.state) {
// //       setForm({
// //         email: location.state.email || "",
// //         password: location.state.password || "",
// //       });
// //     }
// //   }, [location.state]);

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const login = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const res = await API.post("/auth/login", form);

// //       localStorage.setItem("token", res.data.token);

// //       alert("Login Successful 🎉");

// //       nav("/dashboard");
// //     } catch (err) {
// //       console.log(err);
// //       alert("User details not found");
// //     }
// //   };

// //   return (
// //     <div className="login-container">
// //       <form className="login-box" onSubmit={login}>
// //         <h2>Login</h2>

// //         <input
// //           type="email"
// //           name="email"
// //           placeholder="Email"
// //           value={form.email}
// //           onChange={handleChange}
// //         />

// //         <input
// //           type="password"
// //           name="password"
// //           placeholder="Password"
// //           value={form.password}
// //           onChange={handleChange}
// //         />

// //         <button type="submit">Login</button>

// //         <p>
// //           Don’t have an account? <Link to="/register">Register</Link>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Login;








// import { useState, useEffect } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import API from "../services/api";
// import "./Login.css";

// const Login = () => {
//   const nav = useNavigate();
//   const location = useLocation();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   // 👉 auto fill from register page
//   useEffect(() => {
//     if (location.state) {
//       setForm({
//         email: location.state.email || "",
//         password: location.state.password || "",
//       });
//     }
//   }, [location.state]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const login = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await API.post("/auth/login",form);

//       // ✅ store token
//       localStorage.setItem("token", res.data.token);

//       // ✅ store role
//       localStorage.setItem("role", res.data.user.role);

//       alert("Login Successful 🎉");

//       // ✅ role based redirect
//       if (res.data.user.role === "admin") {
//         nav("/admin");
//       } else {
//         nav("/employedash");
//       }

//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data?.message || "User details not found");
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-box" onSubmit={login}>
//         <h2>Login</h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">Login</button>

//         <p>
//           Don’t have an account?{" "}
//           <Link to="/register">Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;


import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

const Login = () => {
  const nav = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (location.state) {
      setForm({
        email: location.state.email || "",
        password: location.state.password || "",
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name); // ✅ save name

      if (res.data.user.role === "admin") {
        nav("/adminpans");
      } else {
        nav("/employedash");
      }

    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="login-container">
      {/* <form className="login-box" onSubmit={login}>
        <h2>Login</h2>
        
        <input name="email" value={form.email} onChange={handleChange} />
        <input name="password" value={form.password} onChange={handleChange} />

        <button type="submit">Login</button>

        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form> */}

      <form className="login-box" onSubmit={login}>
         <h2>Login</h2>

        <input
        type="email"
           name="email"
           placeholder="Email"
           value={form.email}
           onChange={handleChange}
           required
         />

        <input
           type="password"
           name="password"
           placeholder="Password"
           value={form.password}
           onChange={handleChange}
          required
         />

        <button type="submit">Login</button>

        <p>
       Don’t have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
       </form>
    </div>
  );
};

export default Login;
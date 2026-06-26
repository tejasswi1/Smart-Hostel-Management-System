// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { AuthContext } from "../context/AuthContext";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password) return setError("All fields required");

//     try {
//       setLoading(true);
//       const res = await api.post("/auth/login", { email, password });

//       login(res.data.token, res.data.role);

//       if (res.data.role === "student") navigate("/student");
//       if (res.data.role === "guard") navigate("/guard");
//       if (res.data.role === "warden") navigate("/warden");
//     } catch (err) {
//       setError(err.response?.data?.msg || "Invalid credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">🔐 Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-3 p-2 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-3 p-2 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           disabled={loading}
//           className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         {error && (
//           <p className="text-center text-red-500 text-sm mt-3">{error}</p>
//         )}
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE 👉", data);

      if (!res.ok) {
        alert(data.msg || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ SAVE TO LOCALSTORAGE
     localStorage.setItem("token", data.token);

localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

setUser(data.user);

if (data.user.role === "student")
  navigate("/student");

else if (data.user.role === "warden")
  navigate("/warden");

else if (data.user.role === "guard")
  navigate("/guard");

else navigate("/");

    } catch (err) {
      console.error("LOGIN ERROR 👉", err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="College Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
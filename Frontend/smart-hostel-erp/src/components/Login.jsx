import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";


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

      // SAVE TO LOCALSTORAGE
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
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-brand">

        <div className="brand-icon">
          🏫
        </div>

        <h1>Smart Hostel ERP</h1>

        <p>
          A smarter way to manage hostel life,
          security, mess and student services.
        </p>

        <div className="brand-features">
          <div>
            <span>🌙</span>
            <p>Night Entry Management</p>
          </div>

          <div>
            <span>🍽️</span>
            <p>Smart Mess Management</p>
          </div>

          <div>
            <span>🛡️</span>
            <p>Hostel Security</p>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="login-container">

        <form
          className="login-card"
          onSubmit={handleLogin}
        >

          <div className="login-header">

            <div className="login-icon">
              🔐
            </div>

            <h2>Welcome Back</h2>

            <p>
              Login to your hostel account
            </p>

          </div>

          {/* EMAIL */}

          <div className="input-group">

            <label>College Email</label>

            <div className="input-wrapper">
              <span>✉️</span>

              <input
                type="email"
                placeholder="Enter your college email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

          </div>

          {/* PASSWORD */}

          <div className="input-group">

            <label>Password</label>

            <div className="input-wrapper">
              <span>🔒</span>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : (
              "Login →"
            )}
          </button>

          <p className="login-footer">
            Smart Hostel ERP
          </p>

        </form>

      </div>

    </div>
  );
}
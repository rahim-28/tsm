import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/chronoSlice"; 
import { Eye, EyeOff } from "lucide-react"; // add eye icons
import "../styles/LoginPage.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      dispatch(login({ user: { username } }));
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        {/* Title above the form */}
        <h2 className="login-title">Time Sheet Management</h2>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group password-group">
          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "-10px",
                top: "40%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
}

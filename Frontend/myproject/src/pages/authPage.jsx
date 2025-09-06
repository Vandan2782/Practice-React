import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // true = login, false = signup

  // ✅ Login form state
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  // ✅ Signup form state
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "Developer",
  });

  const handleLoginChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleSignupChange = (e) =>
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        loginForm
      );
      alert(`Welcome ${res.data.username} (${res.data.role})`);
      localStorage.setItem("token", res.data.token);
      // navigate("/dashboard"); // redirect after login if needed
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/signup", signupForm);
      alert("User Registered Successfully!");
      setIsLogin(true); // ✅ Switch back to login form after signup
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "420px" }}>
        {isLogin ? (
          <>
            <h3 className="text-center text-primary mb-3">Login</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            <p className="text-center mt-3">
              Don’t have an account?{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => setIsLogin(false)}
              >
                Signup
              </button>
            </p>
          </>
        ) : (
          <>
            <h3 className="text-center text-success mb-3">Signup</h3>
            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  onChange={handleSignupChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={handleSignupChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={handleSignupChange}
                  required
                />
              </div>
              <div className="mb-3">
                <select
                  name="role"
                  className="form-select"
                  onChange={handleSignupChange}
                  value={signupForm.role}
                >
                  <option value="Manager">Manager</option>
                  <option value="TeamLead">Team Lead</option>
                  <option value="Developer">Developer</option>
                </select>
              </div>
              <button type="submit" className="btn btn-success w-100">
                Signup
              </button>
            </form>
            <p className="text-center mt-3">
              Already have an account?{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

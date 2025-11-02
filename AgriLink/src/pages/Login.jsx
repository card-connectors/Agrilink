// pages/Login.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextFiles/AllContext";

const API_BASE = "http://127.0.0.1:8000/api/auth"; // change if your backend runs on different host/port

const Login = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
const { setUserId, setUserName } = useContext(AuthContext);


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(""); // inline error message
  const [loading, setLoading] = useState(false); // show loading while request in progress

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error while typing in password fields
    if (name === "confirmPassword" || name === "password" || name === "email") {
      setError("");
    }
  };

  // Helper: save token & user
  const saveAuth = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation for signup
    if (!isLogin && form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        // LOGIN request
        const body = {
          username: form.email, // backend accepts username or email in 'username'
          password: form.password,
        };

        const res = await fetch(`${API_BASE}/login/`, {
          method: "POST", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });



        const data = await res.json();
        if (!res.ok) {
          // prefer returned message keys
          setError(data.error || data.detail || "Login failed. Check credentials.");
          setLoading(false);
          return;
        }

        console.log(data.token);
        
        saveAuth(data.token, data.user);
        setUserId(data.user.id);
        setUserName(data.user.name);
        navigate("/");

      } else {
        // SIGNUP request
        const body = {
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        };

        const res = await fetch(`${API_BASE}/register/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });


        const data = await res.json();
        if (!res.ok) {
          // serializer returns dict of errors; show a friendly message
          const firstErr =
            (typeof data === "object" && Object.values(data).flat()[0]) ||
            data.error ||
            JSON.stringify(data);
          setError(firstErr);
          setLoading(false);
          return;
        }

        // Signup success
        saveAuth(data.token, data.user);
        setUserId(data.user.id);
        setUserName(data.user.name);
        navigate("/profileSetup");
      }

      // reset form on success
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
      if (onClose) onClose();
    } catch (err) {
      console.error("Auth error:", err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onClose) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex justify-end pt-4 pr-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <p className="text-gray-600 text-center text-sm mb-6">
            {isLogin
              ? "Enter your credentials to access your account"
              : "Create your account to get started"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  }`}
                  required
                />
                {error && !isLogin && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>
            )}

            {/* Show general error when login or other errors */}
            {error && isLogin && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-medium transition-colors duration-200 ${
                isLogin ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
              } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (isLogin ? "Logging in..." : "Signing up...") : (isLogin ? "Login" : "Sign Up")}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
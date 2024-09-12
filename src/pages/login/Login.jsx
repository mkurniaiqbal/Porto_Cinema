// Login.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearRedirectPath } from "../../store/path/Path";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const redirectPath = useSelector((state) => state.path.redirectPath);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "iqbal" && password === "iqbal123") {
      localStorage.setItem("username", username); // Simpan username dengan nama yang lebih sesuai
      alert("Login successful!");
      navigate(redirectPath || "/");
      dispatch(clearRedirectPath());
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-form p-5 border rounded shadow-sm">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter username"
                value={username}
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

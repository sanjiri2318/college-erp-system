import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        formData
      );

      const token = res.data.data.token;
      const user = res.data.data.user;

      // Save user and token
      login(user, token);

      // Force password change
      if (user.mustChangePassword) {
        navigate("/change-password");
        return;
      }

      // Role-based navigation
      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (user.role === "FACULTY") {
        navigate("/faculty");
      } else if (user.role === "STUDENT") {
        navigate("/student");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>College ERP Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>

        <br />
        <br />

        {message && (
          <p style={{ color: "red" }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
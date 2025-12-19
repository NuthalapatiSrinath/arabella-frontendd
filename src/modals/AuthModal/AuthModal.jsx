import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/modalSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import { loginUser, registerUser } from "../../services/authService";
import { X, Mail, Lock, User, ArrowRight } from "lucide-react";
import styles from "./AuthModal.module.css";

const AuthModal = ({ initialMode = "login" }) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        const res = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        dispatch(setCredentials({ user: res.data, token: res.token }));
        dispatch(closeModal());
      } else {
        // --- REGISTER LOGIC ---
        const res = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "user",
        });

        // Auto login after register? Or just show success?
        // Let's switch to login mode or auto-login if backend sends token
        setIsLogin(true);
        setError("Account created! Please log in.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalContainer}>
      <button
        className={styles.closeBtn}
        onClick={() => dispatch(closeModal())}
      >
        <X size={24} />
      </button>

      <div className={styles.header}>
        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <p>
          {isLogin
            ? "Enter your details to access your account."
            : "Join us to book your perfect stay."}
        </p>
      </div>

      {error && <div className={styles.errorMsg}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && (
          <div className={styles.inputGroup}>
            <User size={18} className={styles.icon} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className={styles.inputGroup}>
          <Mail size={18} className={styles.icon} />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <Lock size={18} className={styles.icon} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Processing..." : isLogin ? "Log In" : "Sign Up"}
          {!loading && <ArrowRight size={18} />}
        </button>
      </form>

      <div className={styles.footer}>
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;

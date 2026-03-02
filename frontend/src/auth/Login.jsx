import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearMessages } from "../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) navigate("/dashboard");
    return () => dispatch(clearMessages());
  }, [token]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-950">
      <form
        onSubmit={handleLogin}
        className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-96 space-y-5"
      >
        <h2 className="text-2xl text-white font-bold text-center">Login</h2>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <input
          placeholder="Email"
          className="w-full p-3 rounded bg-slate-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-slate-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-3 rounded-lg"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <p
          onClick={() => navigate("/register")}
          className="text-sm text-blue-400 cursor-pointer text-center"
        >
          Create account
        </p>
      </form>
    </div>
  );
}

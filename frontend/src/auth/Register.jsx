import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearMessages } from "../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (success) navigate("/");
    return () => dispatch(clearMessages());
  }, [success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-96 space-y-5"
      >
        <h2 className="text-2xl text-white font-bold text-center">
          Create Account
        </h2>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <input
          placeholder="Username"
          className="w-full p-3 rounded bg-slate-700 text-white"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full p-3 rounded bg-slate-700 text-white"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-slate-700 text-white"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-teal-500 py-3 rounded-lg"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p
          onClick={() => navigate("/")}
          className="text-sm text-blue-400 cursor-pointer text-center"
        >
          Back to Login
        </p>
      </form>
    </div>
  );
}

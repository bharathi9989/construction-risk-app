import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/features/auth/authSlice";
import { useState } from "react";


export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div
          onClick={() => navigate("/dashboard")}
          className="text-xl font-semibold text-white cursor-pointer"
        >
          RiskEngine
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-blue-500 pb-1"
                : "hover:text-white"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-blue-500 pb-1"
                : "hover:text-white"
            }
          >
            Projects
          </NavLink>
        </nav>
        {user?.role === "ADMIN" && <button>Delete</button>}

        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

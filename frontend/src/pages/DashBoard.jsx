import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="text-white">
      {/* HERO SECTION */}
      <section
        className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl font-bold mb-6">
            AI-Powered Construction Risk Intelligence
          </h1>

          <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-300">
            Predict project delays, budget overruns, and structural risks using
            real-time AI-driven analytics and forecasting models.
          </p>

          <Link
            to="/projects"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-lg font-semibold transition"
          >
            Analyze Projects
          </Link>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 bg-gray-900 text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold mb-6">
            Advanced Risk Prediction Engine
          </h2>

          <p className="max-w-3xl mx-auto text-gray-400">
            Our AI models analyze weather forecasts, labor availability, cost
            fluctuations, and historical performance data to calculate real-time
            risk scores and predictive insights.
          </p>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-black px-6">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 p-8 rounded-2xl border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-4">Delay Forecasting</h3>
            <p className="text-gray-400">
              Predict project completion delays using machine learning
              algorithms.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 p-8 rounded-2xl border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-4">Budget Risk Analysis</h3>
            <p className="text-gray-400">
              Identify potential cost overruns before they impact profitability.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 p-8 rounded-2xl border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-4">
              Structural Safety Insights
            </h3>
            <p className="text-gray-400">
              Evaluate structural risk factors using AI-powered simulations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-16 bg-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-6">Welcome {user?.username}</h2>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl transition"
        >
          Logout
        </button>
      </section>
    </div>
  );
}

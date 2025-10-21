import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Pet from "./pages/Pet.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 text-gray-800">
      {/* Encabezado */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-rose-100/60 border-b border-rose-200 shadow-sm">
        <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="font-extrabold tracking-tight text-rose-500 text-2xl drop-shadow-sm">
            🐾 catlandia
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-4 py-2 text-sm rounded-full text-rose-700 hover:bg-white/70 transition font-medium"
            >
              Inicio
            </Link>
            <Link
              to="/mascota"
              className="px-4 py-2 text-sm rounded-full text-rose-700 hover:bg-white/70 transition font-medium"
            >
              Mascota
            </Link>
          </div>
        </nav>
      </header>

      {/* Contenido dinámico */}
      <main className="flex flex-col justify-center items-center py-12 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mascota" element={<Pet />} />
        </Routes>
      </main>

      {/* Pie de página */}
      <footer className="text-center text-rose-400 text-sm py-6 mt-auto">
        Hecho con 💕 para las gatitas más lindas ✨
      </footer>
    </div>
  );
}

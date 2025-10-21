import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 text-center px-6">
      {/* Contenedor principal con tarjeta */}
      <div className="max-w-2xl bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-rose-100 p-10 transition-all hover:shadow-pink-200">
        <h1 className="text-6xl font-extrabold tracking-tight text-pink-500 drop-shadow-sm mb-6">
          CATLANDIA
        </h1>

        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          Bienvenida a <span className="text-pink-500 font-semibold">CatLandia</span>, 
          el lugar más tierno donde podrás conocer a nuestras gatitas 💕<br />
          Navega sin recargar la página, gracias al poder del SPA con React Router.
        </p>

        <Link
          to="/mascota"
          className="inline-block px-10 py-4 text-lg rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold shadow-lg hover:from-pink-500 hover:to-rose-500 hover:shadow-rose-300 transition-all"
        >
          Ver foto de mi gatita 🐾
        </Link>
      </div>

      {/* Decoraciones sutiles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-24 right-12 w-40 h-40 bg-rose-300/30 rounded-full blur-3xl animate-pulse delay-300"></div>
    </section>
  );
}

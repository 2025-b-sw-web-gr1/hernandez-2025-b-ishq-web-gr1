import { useState } from "react";
import { Link } from "react-router-dom";

export default function Pet() {
  const options = ["Obami", "Mayka", "Leah"];
  const [selected, setSelected] = useState(options[0]);

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-rose-50 via-pink-50 to-rose-100 text-center px-6 relative overflow-hidden">
      {/* Tarjeta */}
      <div className="max-w-3xl bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-rose-100 p-8">
        <h1 className="text-4xl font-bold text-rose-500 mb-6 drop-shadow-sm">
          Presentamos a {selected} 💖
        </h1>

        {/* Selector */}
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {options.map((name) => (
            <button
              key={name}
              onClick={() => setSelected(name)}
              className={`px-5 py-2 rounded-full border border-rose-300 text-rose-600 bg-rose-50 hover:bg-pink-100 transition-all duration-300 ${
                selected === name
                  ? "ring-2 ring-pink-400 shadow-lg scale-105 font-semibold"
                  : ""
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Imagen */}
        <div className="rounded-xl overflow-hidden shadow-md border border-rose-200">
          <img
            src={`/images/${selected.toLowerCase()}.jpg`}
            alt={`Foto de ${selected}`}
            onError={(e) =>
              (e.target.src = `https://loremflickr.com/800/600/kitten?lock=${selected.length}`)
            }
            className="w-full max-h-[70vh] object-cover transition-all duration-500 hover:scale-[1.02]"
          />
        </div>

        {/* Botón de volver */}
        <div className="mt-8">
          <Link
            to="/"
            className="inline-block px-8 py-3 rounded-full bg-white border border-rose-200 text-rose-600 hover:bg-pink-50 hover:shadow-md transition-all"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>

      {/* Luces decorativas */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-16 left-12 w-40 h-40 bg-rose-300/30 rounded-full blur-3xl animate-pulse delay-200"></div>
    </section>
  );
}

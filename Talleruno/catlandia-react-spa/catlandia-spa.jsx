import { createApp, h, ref, computed } from "vue";
import { createRouter, createWebHashHistory, RouterLink, RouterView } from "vue-router";

/* ----------------------- Componentes ----------------------- */

// 🏠 Home
const Home = {
  name: "Home",
  setup() {
    return () =>
      h("section", { class: "max-w-2xl mx-auto mt-20 p-10 bg-white/80 rounded-2xl shadow-lg text-center" }, [
        h("h1", { class: "text-5xl font-extrabold tracking-tight text-rose-500 mb-6" }, "CATLANDIA"),
        h(
          "p",
          { class: "text-gray-600 mb-8" },
          "SPA con Vue Router (sin recarga de página)."
        ),
        h(
          RouterLink,
          {
            to: "/mascota",
            class:
              "inline-block px-8 py-3 rounded-full bg-rose-500 text-white font-medium shadow hover:bg-rose-600 transition"
          },
          () => "Ver foto de mi gatita"
        )
      ]);
  }
};

// 🐱 Mascota
const Pet = {
  name: "Pet",
  setup() {
    const options = ["Obami", "Mayka", "Leah"];
    const selected = ref(options[0]);
    const imgSrc = computed(() => `/images/${selected.value.toLowerCase()}.jpg`);
    const onError = (e) => (e.target.src = `https://loremflickr.com/800/600/kitten?lock=${selected.value.length}`);

    return () =>
      h("section", { class: "max-w-3xl mx-auto mt-12 p-6 bg-white/80 rounded-2xl shadow-lg text-center" }, [
        h("h1", { class: "text-3xl font-bold text-rose-600 mb-6" }, `Presentamos a ${selected.value}`),

        h("div", { class: "flex justify-center gap-4 mb-6 flex-wrap" },
          options.map(name =>
            h("button", {
              class:
                "px-4 py-2 rounded-full border border-rose-300 text-rose-600 bg-rose-50 hover:bg-rose-100 transition " +
                (selected.value === name ? "ring-2 ring-rose-400 font-semibold" : ""),
              onClick: () => (selected.value = name)
            }, name)
          )
        ),

        h("div", { class: "rounded-xl overflow-hidden shadow-md border border-rose-100" },
          h("img", {
            src: imgSrc.value,
            alt: `Foto de ${selected.value}`,
            class: "w-full max-h-[70vh] object-cover",
            onError
          })
        ),

        h("div", { class: "mt-8" },
          h(RouterLink, {
            to: "/",
            class:
              "inline-block px-6 py-3 rounded-full bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 transition"
          }, () => "← Volver al inicio")
        )
      ]);
  }
};

/* ----------------------- App principal ----------------------- */

const App = {
  setup() {
    const NavLink = (to, text) =>
      h(
        RouterLink,
        {
          to,
          class: "px-4 py-2 text-sm rounded-full text-rose-700 hover:bg-white/70 transition font-medium"
        },
        () => text
      );

    return () =>
      h("div", { class: "min-h-screen text-gray-800" }, [
        h(
          "header",
          { class: "sticky top-0 z-10 backdrop-blur bg-rose-100/70 border-b border-rose-200" },
          h("nav", { class: "max-w-5xl mx-auto flex items-center justify-between px-4 py-3" }, [
            h("div", { class: "font-extrabold tracking-tight text-rose-600 text-xl" }, "catlandia"),
            h("div", { class: "flex items-center gap-2" }, [NavLink("/", "Inicio"), NavLink("/mascota", "Mascota")])
          ])
        ),
        h("main", { class: "px-4 pb-16" }, [h(RouterView)])
      ]);
  }
};

/* ----------------------- Router ----------------------- */
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/mascota", component: Pet }
  ]
});

/* ----------------------- Crear y montar app ----------------------- */
createApp(App).use(router).mount("#app");

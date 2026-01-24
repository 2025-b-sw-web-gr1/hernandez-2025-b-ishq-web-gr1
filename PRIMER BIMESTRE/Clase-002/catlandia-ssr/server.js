// server.js
// 💖 CatLandia SSR versión rosita y aesthetic
// Navegación tradicional con recarga completa en cada clic

const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Servir imágenes estáticas desde /public
app.use(express.static(path.join(__dirname, "public")));

// Página de inicio
app.get("/", (req, res) => {
  res.render("layout", {
    title: "CatLandia",
    view: "home"
  });
});

// Página de mascota
app.get("/mascota", (req, res) => {
  const nameParam = (req.query.nombre || "").toLowerCase();
  const validPets = { obami: "obami.jpg", mayka: "mayka.jpg", leah: "leah.jpg" };
  const petName = Object.keys(validPets).includes(nameParam) ? nameParam : "obami";
  const petImage = `/images/${validPets[petName]}`;

  res.render("layout", {
    title: `Mascota - ${petName.charAt(0).toUpperCase() + petName.slice(1)}`,
    view: "pet",
    petName: petName.charAt(0).toUpperCase() + petName.slice(1),
    petImageUrl: petImage
  });
});

app.listen(PORT, () => {
  console.log(`💖 CatLandia SSR corriendo en http://localhost:${PORT}`);
});

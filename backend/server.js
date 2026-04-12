const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3");
const knex = require("knex");

const app = express();
const db = knex({
  client: "sqlite3",
  connection: {
    filename: "rooms.db",
  },
  useNullAsDefault: true,
});

app.use(cors());
app.use(express.json());

app.get("/erooms", (req, res) => {
  res.json("Aqui vamos a ver los escape rooms");
});

app.post("/ciudades", async (req, res) => {
  await db("Ciudades").insert({
    nombre: req.body.nombre,
    zona: req.body.zona,
  });

  res.status(201).json({ mensaje: "Ciudad creada correctamente" });
});

app.get("/ciudades", async (req, res) => {
  const listaCiudades = await db("Ciudades").select("*");
  res.status(200).json(listaCiudades);
});

app.put("/ciudades/:id", async (req, res) => {
  await db("Ciudades").where({ id: req.params.id }).update({
    nombre: req.body.nombre,
    zona: req.body.zona,
  });
  res.status(202).json({ mensaje: "ciudad modificada correctamente" });
});

app.delete("/ciudades/:id", async (req, res) => {
  await db("Ciudades").where({ id: req.params.id }).del();
  res.status(203).json({ mensaje: "ciudad borrada correctamente" });
});

app.post("/salas", async (req, res) => {
  const respuestaTendencia = String(req.body.es_tendencia).toLowerCase();
  let valorTendencia = 0;

  if (
    respuestaTendencia === "si" ||
    respuestaTendencia === "sí" ||
    respuestaTendencia === "true"
  ) {
    valorTendencia = 1;
  }

  await db("Salas").insert({
    nombre: req.body.nombre,
    dificultad: parseInt(req.body.dificultad),
    categoria: req.body.categoria,
    numero_max_jugadores: parseInt(req.body.numero_max_jugadores),
    es_tendencia: valorTendencia,
    id_ciudades: parseInt(req.body.id_ciudades),
  });
  res.status(201).json({ mensaje: "Sala creada correctamente" });
});

app.get("/salas", async (req, res) => {
  const listaSalas = await db("Salas")
    .join("Ciudades", "Salas.id_ciudades", "=", "Ciudades.id")
    .select("Salas.*", "Ciudades.nombre as nombre_ciudad");
  res.status(200).json(listaSalas);
});

app.put("/salas/:id", async (req, res) => {
  const respuestaTendencia = String(req.body.es_tendencia).toLowerCase();
  let valorTendencia = 0;

  if (
    respuestaTendencia === "si" ||
    respuestaTendencia === "sí" ||
    respuestaTendencia === "true"
  ) {
    valorTendencia = 1;
  }
  await db("Salas")
    .where({ id: req.params.id })
    .update({
      nombre: req.body.nombre,
      dificultad: parseInt(req.body.dificultad),
      categoria: req.body.categoria,
      numero_max_jugadores: parseInt(req.body.numero_max_jugadores),
      es_tendencia: valorTendencia,
      id_ciudades: parseInt(req.body.id_ciudades),
    });
  res.status(202).json({ mensaje: "Sala modificada correctamente" });
});

app.delete("/salas/:id", async (req, res) => {
  await db("Salas").where({ id: req.params.id }).del();
  res.status(203).json({ mensaje: "Sala borrada correctamente" });
});

app.listen(8081, () => {
  console.log("servidor corriendo en el puerto 8081");
});

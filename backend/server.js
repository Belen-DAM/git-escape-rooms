const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/erooms", (req, res) => {
  res.json("Aqui vamos a ver los escape rooms");
});

app.listen(8081, () => {
  console.log("servidor corriendo en el puerto 8081");
});

import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Executando... \n Express + Node Typescript Server");
});

app.listen(4000, () => {
  console.log(`[server]: Servidor está executando em http://localhost:4000`);
});

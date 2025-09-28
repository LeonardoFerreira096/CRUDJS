// index.js
import express from "express";
import cors from "cors";
import { testConnection } from "./src/config/prisma.js";
import userRoutes from "./src/routes/userRoutes.js";

const app = express();


app.use(cors());
app.use(express.json());


app.use("/v1/client", userRoutes);

const port = process.env.PORT || 3000;

testConnection().then((connected) => {
  if (connected) {
    app.listen(port, () => {
      console.log(` Servidor rodando na porta ${port}`);
    });
  } else {
    console.log(" Não conseguiu conectar no banco");
  }
});

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});
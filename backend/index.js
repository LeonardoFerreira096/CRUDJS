import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js"

const app = express();
app.use(cors());
app.use(express.json());

app.use("/v1/client", userRoutes);

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})

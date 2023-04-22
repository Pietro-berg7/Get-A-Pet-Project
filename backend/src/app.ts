import express from "express";
import cors from "cors";
import connection from "../config/db"; // Importa a conexão com o banco de dados

// Import Routes
import UserRoutes from "./routes/UserRoutes";

const app = express();

// Config JSON response
app.use(express.json());

// Solve CORS
app.use(cors({ credentials: true, origin: "https://localhost:3000" }));

// Public folder for images
app.use(express.static("public"));

// Routes
app.use("/users", UserRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

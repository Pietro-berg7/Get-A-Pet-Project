import express from "express";
import cors from "cors";
import connection from "../config/db"; // Importa a conexão com o banco de dados
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

// Import Routes
import UserRoutes from "./routes/UserRoutes";
import PetRoutes from "./routes/PetRoutes";

const app = express();

// Config JSON response
app.use(express.json());

// Solve CORS
app.use(cors());

// Public folder for images
app.use(express.static("public"));

// Connect to MongoDB
connection.on("connected", () => {});

connection.on("error", (err) => {
  process.exit(1);
});

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/users", UserRoutes);
app.use("/pets", PetRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

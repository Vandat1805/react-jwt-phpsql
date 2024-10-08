import express from "express";
require("dotenv").config();
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connection from "./config/connectDB";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
const app = express();
const PORT = process.env.PORT || 8080;

// *config cors eingine
configCors(app);

// *config view eingine
configViewEngine(app);

// *config body-parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// *test connection db
connection();
// *init web routes
initWebRoutes(app);
initApiRoutes(app);


app.listen(PORT, () => {
  console.log(">>> JWT backend is running on Port = " + PORT);
});

import express from "express";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import fibGen from "./routes/fib_gen";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 5005;

app.use(bodyParser.json());

app.use("/api/fib-gen", fibGen);

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../templates/", "index.html"));
});

app.get("/*", (req, res) => {
	res.status(404).send("page not found");
});

const server = app.listen(PORT, () => console.log("Running on port: ", PORT));

module.exports = server;

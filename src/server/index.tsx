import express from "express";
import path from "path";
import dotenv from "dotenv";
import Logger, { LogLevel } from "../common/utils/logger";
import BitFlag from "../common/utils/bitflag";

dotenv.config();
Logger.init({
    logLevel: new BitFlag(LogLevel.All),
});
const PORT = process.env.port || 5000;
const WEBAPP_DIR = path.join(process.cwd(), "dist", "webapp");

const app = express();
app.use(express.static(WEBAPP_DIR));

app.get("/*", (req, res) => {
    res.sendFile("index.html", { root: WEBAPP_DIR });
});

app.listen(PORT, () => {
    Logger.info(`Listening on http://localhost:${PORT}`);
});

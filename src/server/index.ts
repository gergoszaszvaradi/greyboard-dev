import express from "express";
import path from "path";
import dotenv from "dotenv";
import Logger, { LogLevel } from "../common/services/logger";
import { Container } from "../common/core/di";

dotenv.config();
const logger = Container.get<Logger>(Logger);
logger.init({
    logLevel: Number(process.env.LOG_LEVEL) || LogLevel.All,
});
const PORT = process.env.PORT || 5000;
const WEBAPP_DIR = path.join(process.cwd(), "dist", "webapp");

const app = express();
app.use(express.static(WEBAPP_DIR));

app.get("/*", (req, res) => {
    res.sendFile("index.html", { root: WEBAPP_DIR });
});

app.listen(PORT, () => {
    logger.info(`Listening on ${PORT}`);
});

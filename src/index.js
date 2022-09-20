import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db/db.connect.js";
import cors from "cors";
import { errorHandlerMiddleware } from "./error.js";

dotenv.config();
dbConnect();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/", (req, res) => {
    res.status(200).send("Hello world");
});

app.use((req, res) => {
    throw new HttpException(404, "Can't find provided routes");
});

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
    console.clear();
    console.log(`app listening on port ${PORT}`);
});

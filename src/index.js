import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db/db.connect.js";
import cors from "cors";
import { HttpException, errorHandlerMiddleware } from "./error.js";
import { authRouter } from "./routes/auth.routes.js";
import { productRouter } from "./routes/product.routes.js";

dotenv.config();
dbConnect();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// app.use("/", async (req, res) => {
//     res.send();
// });

app.use("/auth", authRouter);
app.use("/products", productRouter);

app.use(() => {
    throw new HttpException(404, "Can't find provided routes");
});

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
    console.clear();
    console.log(`app listening on port ${PORT}`);
});

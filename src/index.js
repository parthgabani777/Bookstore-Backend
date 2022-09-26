import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db/db.connect.js";
import cors from "cors";
import { HttpException, errorHandlerMiddleware } from "./error.js";
import { authRouter } from "./routes/auth.routes.js";
import { productRouter } from "./routes/product.routes.js";
import { wishlistRouter } from "./routes/wishlist.routes.js";
import { cartRouter } from "./routes/cart.routes.js";
import { RequiresAuth } from "./middleware/RequiresAuth.js";

dotenv.config();
dbConnect();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/user/wishlist", RequiresAuth, wishlistRouter);
app.use("/user/cart", RequiresAuth, cartRouter);

app.use(() => {
    throw new HttpException(404, "Can't find provided routes");
});

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});

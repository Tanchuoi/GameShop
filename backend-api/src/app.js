const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("express");
const gameRouter = require("./routes/game.router");
const cartRouter = require("./routes/cart.router");
const wishlistRouter = require("./routes/wishlist.router");
const userRouter = require("./routes/user.router");
const categoryRouter = require("./routes/category.router");
const { specs, swaggerUi } = require("./docs/swagger");
const errorHandler = require("./middlewares/errorHandler.middleware");
const sessionMiddleware = require("./middlewares/session.middleware");
const app = express();
app.use(sessionMiddleware);

// Use CORS and body parsers
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Serve static files from the public/uploads directory
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

// API documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Use your routes and error handler
gameRouter.setup(app);
cartRouter.setup(app);
wishlistRouter.setup(app);
userRouter.setup(app);
categoryRouter.setup(app);
app.use(errorHandler);

module.exports = app;

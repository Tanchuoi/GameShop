const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const errorHandler = require("../middlewares/errorHandler.middleware");

module.exports.setup = (app) => {
  app.use("/api/v1", router);

  // cart
  /**
   * @swagger
   * /user/{id}/cart/:
   *  get:
   *    summary: Get cart by user ID
   *    description: Get cart by user ID
   *    tags: [Cart]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The user ID
   *    responses:
   *      200:
   *        description: Cart fetched successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Cart'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.get("/user/:id/cart/", cartController.getCartByUserId);
  /**
   * @swagger
   * /cart/Anonymous/:
   *  get:
   *    summary: Get anonymous cart
   *    description: Get anonymous cart
   *    tags: [Cart]
   *    responses:
   *      200:
   *        description: Anonymous cart fetched successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Cart'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.get("/cart/Anonymous/", cartController.getAnonymousCart);
  /**
   * @swagger
   * /cart/{cart_id}/checkout/:
   *  post:
   *    summary: Checkout cart
   *    description: Checkout cart
   *    tags: [Cart]
   *    parameters:
   *      - in: path
   *        name: cart_id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The cart ID
   *    responses:
   *      200:
   *        description: Checkout successful
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.post("/cart/:cart_id/checkout/", cartController.checkOut);
  /**
   * @swagger
   * /cart/{cart_id}/game/{game_id}/:
   *  post:
   *    summary: Add game to cart
   *    description: Add game to cart
   *    tags: [Cart]
   *    parameters:
   *      - in: path
   *        name: cart_id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The cart ID
   *      - in: path
   *        name: game_id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The game ID
   *    responses:
   *      200:
   *        description: Game added to cart successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.post("/cart/:cart_id/game/:game_id/", cartController.addGameToCart);
  /**
   * @swagger
   * /cart/{cart_id}/game/{game_id}/:
   *  delete:
   *    summary: Remove game from cart
   *    description: Remove game from cart
   *    tags: [Cart]
   *    parameters:
   *      - in: path
   *        name: cart_id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The cart ID
   *      - in: path
   *        name: game_id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The game ID
   *    responses:
   *      200:
   *        description: Game removed from cart successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.delete(
    "/cart/:cart_id/game/:game_id/",
    cartController.removeGameFromCart
  );
  /**
   * @swagger
   * /cart/:
   *  post:
   *    summary: Create a new cart
   *    description: Create a new cart
   *    tags: [Cart]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              user_id:
   *                type: integer
   *    responses:
   *      200:
   *        description: Cart created successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.post("/cart/", cartController.createCart);
  /**
   * @swagger
   * /cart/{cart_id}/games/:
   *  delete:
   *    summary: Remove all games from cart
   *    description: Remove all games from cart
   *    tags: [Cart]
   *    parameters:
   *      - in: path
   *        name: cart_id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The cart ID
   *    responses:
   *      200:
   *        description: All games removed from cart successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.delete("/cart/:cart_id/games/", cartController.removeAllGamesFromCart);
  /**
   * @swagger
   * /cart/{id}/games/:
   *  get:
   *    summary: Get games in cart by cart ID
   *    description: Get games in cart by cart ID
   *    tags: [Cart]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The cart ID
   *    responses:
   *      200:
   *        description: Games fetched successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Game'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.get("/cart/:id/games/", cartController.getGamesInCart);
  app.use(errorHandler);
};

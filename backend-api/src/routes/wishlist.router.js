const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlist.controller");
const errorHandler = require("../middlewares/errorHandler.middleware");

module.exports.setup = (app) => {
  app.use("/api/v1", router);
  // wishlist
  /**
   * @swagger
   * /wishlist/{user_id}/game/{game_id}/:
   *  post:
   *    summary: Add a game to the wishlist
   *    description: Add a game to the wishlist
   *    tags: [Wishlist]
   *    parameters:
   *      - in: path
   *        name: user_id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The user ID
   *      - in: path
   *        name: game_id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The game ID
   *    responses:
   *      200:
   *        description: Game added to wishlist successfully
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
  router.post(
    "/wishlist/:user_id/game/:game_id/",
    wishlistController.addGameToWishlist
  );
  /**
   * @swagger
   * /wishlist/{user_id}/games/:
   *  get:
   *    summary: Get games in the wishlist
   *    description: Get games in the wishlist
   *    tags: [Wishlist]
   *    parameters:
   *      - in: path
   *        name: user_id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The user ID
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
  router.get("/wishlist/:user_id/games/", wishlistController.getGameInWishlist);
  /**
   * @swagger
   * /wishlist/{user_id}/game/{game_id}/:
   *  delete:
   *    summary: Remove a game from the wishlist
   *    description: Remove a game from the wishlist
   *    tags: [Wishlist]
   *    parameters:
   *      - in: path
   *        name: user_id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The user ID
   *      - in: path
   *        name: game_id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The game ID
   *    responses:
   *      200:
   *        description: Game removed from wishlist successfully
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
    "/wishlist/:user_id/game/:game_id/",
    wishlistController.removeGameFromWishlist
  );
  app.use(errorHandler);
};

const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.controller");
const errorHandler = require("../middlewares/errorHandler.middleware");
const upload = require("../middlewares/upload.middleware");

module.exports.setup = (app) => {
  app.use("/api/v1", router);
  // games
  /**
   * @swagger
   * /games/:
   *  get:
   *    summary: Get all games
   *    description: Get all games
   *    tags: [Game]
   *    responses:
   *      200:
   *        description: Games fetched successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Game'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.get("/games/", gameController.getGames);
  /**
   * @swagger
   * /game/:
   *  post:
   *    summary: Create a new game
   *    description: Create a new game
   *    tags: [Game]
   *    requestBody:
   *      required: true
   *      content:
   *        multipart/form-data:
   *          schema:
   *            type: object
   *            properties:
   *              name:
   *                type: string
   *              price:
   *                type: number
   *              description:
   *                type: string
   *              platform:
   *                type: string
   *              developer:
   *                type: string
   *              publisher:
   *                type: string
   *              release_day:
   *                type: string
   *                format: date
   *              stock:
   *                type: integer
   *              genres:
   *                type: array
   *                items:
   *                  type: integer
   *              images:
   *                type: array
   *                items:
   *                  type: string
   *                  format: binary
   *    responses:
   *      200:
   *        description: Game created successfully
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
  router.post("/game/", upload, gameController.createGame);
  /**
   * @swagger
   * /games/category/{id}/:
   *  get:
   *    summary: Get games by category ID
   *    description: Get games by category ID
   *    tags: [Game]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The category ID
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
  router.get("/games/category/:id/", gameController.getGameByCategory);
  /**
   * @swagger
   * /game/{id}/categories/:
   *  get:
   *    summary: Get categories of a game by game ID
   *    description: Get categories of a game by game ID
   *    tags: [Game]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The game ID
   *    responses:
   *      200:
   *        description: Categories fetched successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Genre'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.get("/game/:id/categories/", gameController.getGameCategories);
  /**
   * @swagger
   * /games/search/{search}/:
   *  get:
   *    summary: Search games
   *    description: Search games
   *    tags: [Game]
   *    parameters:
   *      - in: path
   *        name: search
   *        schema:
   *          type: string
   *        required: true
   *        description: The search term
   *    responses:
   *      200:
   *        description: Games fetched successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Game'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.get("/games/search/:search/", gameController.getGameBySearch);
  /**
   * @swagger
   * /game/{id}/:
   *  delete:
   *    summary: Delete game by ID
   *    description: Delete game by ID
   *    tags: [Game]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The game ID
   *    responses:
   *      200:
   *        description: Game deleted successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                id:
   *                  type: integer
   *                message:
   *                  type: string
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.delete("/game/:id/", gameController.deleteGame);
  /**
   * @swagger
   * /game/{id}/:
   *  get:
   *    summary: Get game by ID
   *    description: Get game by ID
   *    tags: [Game]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The game ID
   *    responses:
   *      200:
   *        description: Game fetched successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Game'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.get("/game/:id/", gameController.getGameById);
  /**
   * @swagger
   * /game/{id}/:
   *  put:
   *    summary: Update game by ID
   *    description: Update game by ID
   *    tags: [Game]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The game ID
   *    requestBody:
   *      required: true
   *      content:
   *        multipart/form-data:
   *          schema:
   *            type: object
   *            properties:
   *              name:
   *                type: string
   *              price:
   *                type: number
   *              description:
   *                type: string
   *              platform:
   *                type: string
   *              developer:
   *                type: string
   *              publisher:
   *                type: string
   *              release_day:
   *                type: string
   *                format: date
   *              stock:
   *                type: integer
   *              genres:
   *                type: array
   *                items:
   *                  type: integer
   *              images:
   *                type: array
   *                items:
   *                  type: string
   *                  format: binary
   *    responses:
   *      200:
   *        description: Game updated successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                id:
   *                  type: integer
   *                message:
   *                  type: string
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.put("/game/:id/", upload, gameController.updateGame);
  /**
   * @swagger
   * /game/{id}/images:
   *  get:
   *    summary: Get images of a game by game ID
   *    description: Get images of a game by game ID
   *    tags: [Game]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The game ID
   *    responses:
   *      200:
   *        description: Images fetched successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                type: string
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.get("/game/:id/images", gameController.getGameImages);
  app.use(errorHandler);
};

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const errorHandler = require("../middlewares/errorHandler.middleware");

module.exports.setup = (app) => {
  app.use("/api/v1", router);

  // user
  /**
   * @swagger
   * /login/:
   *  post:
   *    summary: User login
   *    description: User login
   *    tags: [User]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              username:
   *                type: string
   *              password:
   *                type: string
   *    responses:
   *      200:
   *        description: User logged in successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                user:
   *                  $ref: '#/components/schemas/User'
   *                ok:
   *                  type: boolean
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      401:
   *        $ref: '#/components/responses/UnauthorizedError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.post("/login/", userController.login);
  /**
   * @swagger
   * /logout/:
   *  post:
   *    summary: User logout
   *    description: User logout
   *    tags: [User]
   *    responses:
   *      200:
   *        description: User logged out successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.post("/logout/", userController.logout);
  /**
   * @swagger
   * /register/:
   *  post:
   *    summary: Register a new user
   *    description: Register a new user
   *    tags: [User]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              username:
   *                type: string
   *              email:
   *                type: string
   *              password:
   *                type: string
   *    responses:
   *      200:
   *        description: User registered successfully
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
  router.post("/register/", userController.register);
  /**
   * @swagger
   * /users/:
   *  get:
   *    summary: Get all users
   *    description: Get all users
   *    tags: [User]
   *    responses:
   *      200:
   *        description: Users fetched successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/User'
   *      404:
   *        $ref: '#/components/responses/NotFoundError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.get("/users/", userController.getUsers);
  /**
   * @swagger
   * /user/{id}:
   *  get:
   *    summary: Get user by ID
   *    description: Get user by ID
   *    tags: [User]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The user ID
   *    responses:
   *      200:
   *        description: User fetched successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      404:
   *        $ref: '#/components/responses/NotFoundError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.get("/user/:id", userController.getUserById);
  /**
   * @swagger
   * /user/{id}:
   *  delete:
   *    summary: Delete user by ID
   *    description: Delete user by ID
   *    tags: [User]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The user ID
   *    responses:
   *      200:
   *        description: User deleted successfully
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
   *      404:
   *        $ref: '#/components/responses/NotFoundError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.delete("/user/:id", userController.deleteUser);
  app.use(errorHandler);
};

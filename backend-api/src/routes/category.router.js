const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const errorHandler = require("../middlewares/errorHandler.middleware");
module.exports.setup = (app) => {
  app.use("/api/v1", router);
  // category
  /**
   * @swagger
   * /category/:
   *  post:
   *    summary: Add a new category
   *    description: Add a new category
   *    tags: [Category]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              name:
   *                type: string
   *    responses:
   *      200:
   *        description: Category added successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Genre'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.post("/category/", categoryController.addCategory);
  /**
   * @swagger
   * /categories/:
   *  get:
   *    summary: Get all categories
   *    description: Get all categories
   *    tags: [Category]
   *    responses:
   *      200:
   *        description: Categories fetched successfully
   *        content:
   *          application/json:
   *            schema:
   *              items:
   *                $ref: '#/components/schemas/Genre'
   *      404:
   *        $ref: '#/components/responses/NotFoundError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.get("/categories/", categoryController.getCategories);
  /**
   * @swagger
   * /category/{id}/:
   *  get:
   *    summary: Get category by ID
   *    description: Get category by ID
   *    tags: [Category]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The category ID
   *    responses:
   *      200:
   *        description: Category fetched successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Genre'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      404:
   *        $ref: '#/components/responses/NotFoundError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.get("/category/:id/", categoryController.getCategoryById);
  /**
   * @swagger
   * /category/{id}/:
   *  delete:
   *    summary: Delete category by ID
   *    description: Delete category by ID
   *    tags: [Category]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: The category ID
   *    responses:
   *      200:
   *        description: Category deleted successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Genre'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      404:
   *        $ref: '#/components/responses/NotFoundError'
   *      500:
   *        $ref: '#/components/responses/InternalServerError'
   */
  router.delete("/category/:id/", categoryController.deleteCategory);
  app.use(errorHandler);
};

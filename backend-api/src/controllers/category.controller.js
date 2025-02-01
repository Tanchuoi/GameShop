const { BadRequestError } = require("../api-error");
const categoryService = require("../services/category.service");

async function addCategory(req, res, next) {
  try {
    const { name } = req.body;
    if (!name) throw new BadRequestError("Invalid genre name");
    await categoryService.addCategory({ name });
    res.json({ name, message: "Genre Created" });
  } catch (error) {
    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) throw new BadRequestError("Invalid genre id");
    await categoryService.deleteCategory(id);
    res.json({ id, message: "Genre Deleted" });
  } catch (error) {
    next(error);
  }
}

async function getCategories(req, res, next) {
  try {
    const categories = await categoryService.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
}

async function getCategoryById(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) throw new BadRequestError("Invalid genre id");
    const category = await categoryService.getCategoryById(id);
    res.json(category.name);
  } catch (error) {
    next(error);
  }
}

async function getGameCategories(req, res, next) {
  try {
    const gameCategories = await categoryService.getGameCategories();
    res.json(gameCategories);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  getGameCategories,
};

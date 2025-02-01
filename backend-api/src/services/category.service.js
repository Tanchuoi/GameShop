const knex = require("../database/knex");
const {
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  BadRequestError,
  InternalServerError,
  MethodNotAllowedError,
} = require("../api-error");

function categoryRepository() {
  return knex("genre");
}

function readCategories(category) {
  return {
    name: category.name,
  };
}

async function getCategoryById(id) {
  const category = await categoryRepository().where({ id }).first();
  if (!category) throw new NotFoundError("Category not found");
  return category;
}

async function getCategoryByName(name) {
  const category = await categoryRepository().where({ name }).first();
  if (!category) throw new NotFoundError("Category not found");
  return category;
}

async function addCategory(name) {
  const category = readCategories(name);
  const [id] = await categoryRepository().insert(category);
  return { id, ...category };
}

async function getCategories() {
  const categories = await categoryRepository().select().orderBy("id");
  if (!categories) throw new NotFoundError("Categories not found");
  return categories;
}

async function getGameCategories() {
  const game_genre = await knex("game_genre").select().orderBy("game_id");
  if (!game_genre) throw new NotFoundError("Categories not found");
  return game_genre;
}

async function deleteCategory(id) {
  const genre = await categoryRepository().where({ id }).first();
  if (!genre) throw new NotFoundError("Genre not found");
  await knex("genre").where({ id }).delete();
  return genre;
}

module.exports = {
  getCategoryById,
  addCategory,
  getCategoryByName,
  getCategories,
  deleteCategory,
  getGameCategories,
};

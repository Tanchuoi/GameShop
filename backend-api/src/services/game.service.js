const knex = require("../database/knex");
const { NotFoundError } = require("../api-error");
const path = require("path");

const categoryService = require("./category.service");

function gameRepository() {
  return knex("game");
}

function gameCategoryRepository() {
  return knex("game_genre");
}

function readGames(game) {
  return {
    name: game.name,
    price: parseFloat(game.price) || 0, // Parse price to a float and set to 0 if undefined
    description: game.description,
    platform: game.platform,
    developer: game.developer,
    publisher: game.publisher,
    release_day: game.release_day,
    stock: game.stock,
  };
}

// Creates the main game entry in the `game` table and related entries in `game_image` and `game_genre`
async function createGame(game, genres, images) {
  const gameData = readGames(game);
  const [gameId] = await gameRepository().insert(gameData);

  // Insert associated genres into `game_genre` table
  if (genres && genres.length) {
    const genreEntries = genres.map((genreId) => ({
      game_id: gameId,
      genre_id: genreId,
    }));
    await knex("game_genre").insert(genreEntries);
  }

  // Insert associated images into `game_image` table
  if (images && images.length) {
    const imageEntries = images.map((imagePath) => ({
      game_id: gameId,
      image: path.relative(path.join(__dirname, "..", "public"), imagePath),
    }));
    await knex("game_image").insert(imageEntries);
  }

  return { id: gameId, ...gameData };
}

async function deleteGames(id) {
  await gameRepository().where({ id }).delete();
}

async function getGames() {
  const games = await gameRepository().select();
  if (!games) {
    throw new NotFoundError("Games Table is Empty");
  }
  return games;
}

async function getGameById(id) {
  const game = await gameRepository().where({ id }).first();
  if (!game) {
    throw new NotFoundError("Game not found or does not exist");
  }
  return game;
}

async function getGameByName(name) {
  return await gameRepository().where({ name }).first();
}

async function updateGame(id, game, genres, images) {
  // Directly use `game` for debugging if needed
  const gameData = readGames(game); // or const gameData = game;
  // Try using knex directly for debugging purposes
  await knex("game").where({ id }).update(gameData);

  // Update genres
  if (genres && genres.length) {
    await knex("game_genre").where({ game_id: id }).delete();
    const genreEntries = genres.map((genreId) => ({
      game_id: id,
      genre_id: genreId,
    }));
    await knex("game_genre").insert(genreEntries);
  }

  // Update images
  if (images && images.length) {
    await knex("game_image").where({ game_id: id }).delete();
    const imageEntries = images.map((imagePath) => ({
      game_id: id,
      image: path.relative(path.join(__dirname, "..", "public"), imagePath),
    }));
    await knex("game_image").insert(imageEntries);
  }

  return { id, ...gameData };
}

async function deleteGame(id) {
  const game = await getGameById(id);
  if (!game) throw new NotFoundError("Game not found");
  await gameRepository().where({ id }).delete();
}

async function getGamesByCategory(id) {
  await categoryService.getCategoryById(id);
  // Fetch games associated with the genre
  const games = await gameRepository()
    .join("game_genre", "game.id", "=", "game_genre.game_id")
    .where("game_genre.genre_id", id)
    .select("game.*");
  if (!games) throw new NotFoundError("There are no games had this category");
  return games;
}

async function getGameBySearch(search) {
  const games = await gameRepository()
    .where("name", "like", `%${search}%`)
    .orWhere("description", "like", `%${search}%`)
    .select();
  return games;
}

async function getGameCategories(game_id) {
  const game = await getGameById(game_id);
  if (!game) throw new NotFoundError("Game not found");
  const categories = await gameCategoryRepository()
    .join("genre", "game_genre.genre_id", "genre.id")
    .where("game_genre.game_id", game_id)
    .select("genre.*");
  return categories;
}

async function getGameImages(game_id) {
  const game = await getGameById(game_id);
  if (!game) throw new NotFoundError("Game not found");
  const images = await knex("game_image").where({ game_id }).select();
  return images;
}

module.exports = {
  createGame,
  deleteGames,
  getGames,
  getGameById,
  getGameByName,
  updateGame,
  deleteGame,
  getGamesByCategory,
  getGameBySearch,
  getGameCategories,
  getGameImages,
};

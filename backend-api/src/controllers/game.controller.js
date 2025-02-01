const gameService = require("../services/game.service");
const { BadRequestError } = require("../api-error");

async function getGames(req, res, next) {
  try {
    const games = await gameService.getGames();
    res.json(games);
  } catch (error) {
    next(error);
  }
}

async function getGameImages(req, res, next) {
  try {
    const { id } = req.body;
    const images = await gameService.getGameImages(id);
    res.json(images);
  } catch (error) {
    next(error);
  }
}

async function getGameById(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) throw new BadRequestError("Invalid game_id");
    const game = await gameService.getGameById(id);
    res.json(game);
  } catch (error) {
    next(error);
  }
}

async function createGame(req, res, next) {
  try {
    const {
      name,
      price,
      description,
      platform,
      developer,
      publisher,
      release_day,
      stock,
      genres, // array of genre IDs
    } = req.body;

    const images = req.files.map((file) => file.path); // Get file paths of uploaded images
    const genresArray = Array.isArray(genres)
      ? genres
      : typeof genres === "string"
      ? genres.includes(",") // Check if it's a comma-separated string
        ? genres.split(",").map((id) => parseInt(id.trim(), 10)) // Split by commas, trim spaces, and parse to integers
        : JSON.parse(genres) // Fallback for JSON string
      : [];

    const existingGame = await gameService.getGameByName(name);
    if (existingGame) {
      const newStock = existingGame.stock + parseInt(stock, 10);
      await gameService.updateGame(
        existingGame.id,
        {
          name,
          price,
          description,
          platform,
          developer,
          publisher,
          release_day,
          stock: newStock,
        },
        genresArray,
        images
      );
      res.json({ name: existingGame.name, message: "Stock Updated" });
    } else {
      await gameService.createGame(
        {
          name,
          price,
          description,
          platform,
          developer,
          publisher,
          release_day,
          stock,
        },
        genresArray,
        images
      );
      res.json({ message: "Game Created" });
    }
  } catch (error) {
    next(error);
  }
}

async function updateGame(req, res, next) {
  console.log("Request body:", req.body);
  try {
    const { id } = req.params;
    const {
      name,
      price,
      description,
      platform,
      developer,
      publisher,
      release_day,
      stock,
      genres, // array of genre IDs
    } = req.body;

    const images = req.files ? req.files.map((file) => file.path) : [];
    const genresArray = Array.isArray(genres)
      ? genres
      : typeof genres === "string"
      ? genres.includes(",") // Check if it's a comma-separated string
        ? genres.split(",").map((id) => parseInt(id.trim(), 10)) // Split by commas, trim spaces, and parse to integers
        : JSON.parse(genres) // Fallback for JSON string
      : [];

    // await gameService.getGameById(id);
    await gameService.updateGame(
      id,
      {
        name,
        price,
        description,
        platform,
        developer,
        publisher,
        release_day,
        stock,
      },
      genresArray,
      images
    );
    res.json({ id, message: "Game Updated" });
  } catch (error) {
    next(error);
  }
}

async function deleteGame(req, res, next) {
  try {
    const { id } = req.params;
    await gameService.getGameById(id);
    await gameService.deleteGame(id);
    res.json({ id, message: "Game Deleted" });
  } catch (error) {
    next(error);
  }
}

async function getGameByCategory(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) throw new BadRequestError("Invalid genre_id");
    const games = await gameService.getGamesByCategory(id);
    res.json(games);
  } catch (error) {
    next(error);
  }
}

async function getGameBySearch(req, res, next) {
  try {
    const { search } = req.params;
    const games = await gameService.getGameBySearch(search);
    res.json(games);
  } catch (error) {
    next(error);
  }
}

async function getGameCategories(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) throw new BadRequestError("Invalid game_id");
    const categories = await gameService.getGameCategories(id);
    res.json(categories);
  } catch (error) {
    next(error);
  }
}

async function getGameImages(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) throw new BadRequestError("Invalid game_id");
    const gameImages = await gameService.getGameImages(id);
    res.json(gameImages);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  getGameByCategory,
  getGameBySearch,
  getGameCategories,
  getGameImages,
};

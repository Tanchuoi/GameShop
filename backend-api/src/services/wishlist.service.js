const knex = require("../database/knex");
const { NotFoundError, BadRequestError } = require("../api-error");
const gameService = require("./game.service");
const userService = require("./user.service");

function wishlistRepository() {
  return knex("wishlist");
}

async function getWishlist(user_id) {
  await userService.getUserById(user_id);
  const wishlist = await wishlistRepository().where({ user_id });
  return wishlist;
}

async function addGameToWishlist(user_id, game_id) {
  await userService.getUserById(user_id);
  await gameService.getGameById(game_id);
  const game = await wishlistRepository().where({ user_id, game_id }).first();
  if (game) {
    throw new BadRequestError("Game already in wishlist!");
  }
  await wishlistRepository().insert({ game_id, user_id });
}

async function removeGameFromWishlist(user_id, game_id) {
  await userService.getUserById(user_id);
  await gameService.getGameById(game_id);
  const game = await wishlistRepository().where({ user_id, game_id }).first();
  if (game) {
    await wishlistRepository().where({ game_id, user_id }).del();
  } else {
    throw new NotFoundError("Game not found in wishlist!");
  }
}

async function getGameInWishList(user_id) {
  await userService.getUserById(user_id);
  const game = await wishlistRepository()
    .join("game", "wishlist.game_id", "game.id")
    .where("wishlist.user_id", user_id)
    .select("game.*");
  return game;
}

module.exports = {
  getWishlist,
  addGameToWishlist,
  removeGameFromWishlist,
  getGameInWishList,
};

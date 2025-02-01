const knex = require("../database/knex");
const { NotFoundError, BadRequestError } = require("../api-error");
const userService = require("./user.service");
const gameService = require("./game.service");

function cartGameRopository() {
  return knex("cart_game");
}

function cartRepository() {
  return knex("cart");
}

async function getCartById(id) {
  const cart = await cartRepository().where({ id }).first();
  if (!cart) {
    throw new NotFoundError("Cart not found");
  }
  return cart;
}

async function createCart(cart) {
  const newCart = await cartRepository().insert(cart);
  return newCart;
}

async function addGameToCart(cartId, gameId) {
  const quantity = 1;
  await getCartById(cartId);
  const games = await gameService.getGameById(gameId);
  const existingEntry = await getGameInCart(cartId, gameId);
  if (existingEntry) {
    if (games.stock < existingEntry.quantity + quantity) {
      return;
    }
    const newQuantity = existingEntry.quantity + quantity;
    const updatedGame = await updateGameInCart(cartId, gameId, {
      quantity: newQuantity,
    });
    return updatedGame;
  } else {
    const newGame = await cartGameRopository().insert({
      cart_id: cartId,
      game_id: gameId,
      quantity,
    });
    return newGame;
  }
}

async function getGameInCart(cart_id, game_id) {
  const cartGame = await cartGameRopository()
    .where({ cart_id, game_id })
    .first();
  return cartGame;
}

async function updateGameInCart(cart_id, game_id, game) {
  const updatedGame = await cartGameRopository()
    .where({ cart_id, game_id })
    .update(game);
  return updatedGame;
}

async function removeGameFromCart(cart_id, game_id) {
  await getCartById(cart_id);
  await gameService.getGameById(game_id);
  const game = await cartGameRopository().where({ cart_id, game_id }).first();
  if (!game) {
    throw new NotFoundError("Game not found in cart");
  }
  await cartGameRopository().where({ cart_id, game_id }).delete();
}

async function removeAllGamesFromCart(cart_id) {
  await getCartById(cart_id);
  await cartGameRopository().where({ cart_id }).delete();
}

async function getCartByUserId(id) {
  await userService.getUserById(id);
  const cart = await cartRepository().where({ user_id: id }).first();
  if (!cart) {
    const newCart = await createCart({ user_id: id });
    return newCart;
  }
  return cart;
}

async function getAnonymousCart() {
  const user = await userService.getUserByUsername("Anonymous");
  if (!user) {
    await userService.createUser({
      username: "Anonymous",
      password: "Hailht123",
      role: "user",
      email: "asfdasfdasf@gmail.com",
    });
  }
  const cart = await getCartByUserId(user.id);
  return cart;
}

async function getGamesInCart(cart_id) {
  await getCartById(cart_id);
  const gamesInCart = await cartGameRopository()
    .join("game", "cart_game.game_id", "game.id")
    .where("cart_game.cart_id", cart_id)
    .select("game.*", "cart_game.quantity");
  return gamesInCart;
}

async function checkOut(cartId) {
  await getCartById(cartId);
  const gamesInCart = await getGamesInCart(cartId);
  for (const game of gamesInCart) {
    const newStock = game.stock - game.quantity;
    if (newStock <= 0) {
      await gameService.deleteGame(game.id);
    }
    await gameService.updateGame(game.id, {
      price: game.price,
      stock: newStock,
    });
  }
  await removeAllGamesFromCart(cartId);
  return { success: true, message: "Checkout completed successfully" };
}

module.exports = {
  getCartById,
  createCart,
  addGameToCart,
  updateGameInCart,
  getGameInCart,
  removeGameFromCart,
  removeAllGamesFromCart,
  getCartByUserId,
  getAnonymousCart,
  checkOut,
  getGamesInCart,
};

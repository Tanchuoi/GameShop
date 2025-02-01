const { BadRequestError, InternalServerError } = require("../api-error");
const cartService = require("../services/cart.service");
const userService = require("../services/user.service");
const gameService = require("../services/game.service");

async function createCart(req, res, next) {
  try {
    const { user_id } = req.body;
    if (!user_id) throw new BadRequestError("Invalid user_id");
    await userService.getUserById(user_id);
    const cart = await cartService.createCart({ user_id });
    res.json({ cart, message: "Cart Created" });
  } catch (error) {
    next(error);
  }
}

async function addGameToCart(req, res, next) {
  try {
    const { cart_id, game_id } = req.params;
    if (!game_id || !cart_id)
      throw new BadRequestError("Invalid cart_id or game_id");
    await cartService.addGameToCart(cart_id, game_id);
    res.json({ cart_id, game_id, message: "Game Added to Cart" });
  } catch (error) {
    next(error);
  }
}

async function removeGameFromCart(req, res, next) {
  try {
    const { cart_id, game_id } = req.params;
    if (!cart_id || !game_id)
      throw new BadRequestError("Invalid cart_id or game_id");
    await cartService.getCartById(cart_id);
    await gameService.getGameById(game_id);
    await cartService.removeGameFromCart(cart_id, game_id);
    res.json({ cart_id, game_id, message: "Game Removed from Cart" });
  } catch (error) {
    next(error);
  }
}

async function removeAllGamesFromCart(req, res, next) {
  try {
    const { cart_id } = req.params;
    if (!cart_id) throw new BadRequestError("Invalid cart_id");
    await cartService.getCartById(cart_id);
    await cartService.removeAllGamesFromCart(cart_id);
    res.json({ cart_id, message: "All Games Removed from Cart" });
  } catch (error) {
    next(error);
  }
}

async function getCartByUserId(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) throw new BadRequestError("Invalid user_id");
    const cart = await cartService.getCartByUserId(id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

async function getAnonymousCart(req, res, next) {
  try {
    const cart = await cartService.getAnonymousCart();
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

async function checkOut(req, res, next) {
  try {
    const { cart_id } = req.params;
    if (!cart_id) throw new BadRequestError("Invalid cart_id");
    const game = await cartService.checkOut(cart_id);
    res.json({ game, message: "Checkout Successful" });
  } catch (error) {
    next(error);
  }
}

async function getGamesInCart(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) throw new BadRequestError("Invalid cart_id");
    const games = await cartService.getGamesInCart(id);
    res.json(games);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createCart,
  addGameToCart,
  removeGameFromCart,
  removeAllGamesFromCart,
  getCartByUserId,
  getAnonymousCart,
  checkOut,
  getGamesInCart,
};

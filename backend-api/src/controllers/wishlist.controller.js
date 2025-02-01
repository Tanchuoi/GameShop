const { BadRequestError } = require("../api-error");
const wishlistService = require("../services/wishlist.service");

async function addGameToWishlist(req, res, next) {
  try {
    const { user_id, game_id } = req.params;
    if (!game_id) throw new BadRequestError("Invalid game_id");
    if (!user_id) throw new BadRequestError("Invalid user_id");
    await wishlistService.addGameToWishlist(user_id, game_id);
    res.json({ message: "Game added to wishlist" });
  } catch (error) {
    next(error);
  }
}

async function removeGameFromWishlist(req, res, next) {
  try {
    const { user_id, game_id } = req.params;
    if (!game_id) throw new BadRequestError("Invalid game_id");
    if (!user_id) throw new BadRequestError("Invalid user_id");
    await wishlistService.removeGameFromWishlist(user_id, game_id);
    res.json({ message: "Game removed from wishlist" });
  } catch (error) {
    next(error);
  }
}

async function getGameInWishlist(req, res, next) {
  try {
    const { user_id } = req.params;
    if (!user_id) throw new BadRequestError("Invalid user_id");
    const game = await wishlistService.getGameInWishList(user_id);
    res.json(game);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addGameToWishlist,
  removeGameFromWishlist,
  getGameInWishlist,
};

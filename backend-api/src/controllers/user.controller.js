const userService = require("../services/user.service");
const { BadRequestError, UnauthorizedError } = require("../api-error");

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await userService.loginUser(username, password);
    if (user) {
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      res.json({ user: req.session.user, ok: true });
    } else {
      throw new UnauthorizedError({ message: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  } catch (error) {
    next(error);
  }
}

async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;

    // Call the service to handle user registration
    const user = await userService.registerUser({ username, email, password });

    res.json({ id: user.id, message: "User Created" });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    await userService.getUserById(id);
    await userService.deleteUser(id);
    res.json({ id, message: "User Deleted" });
  } catch (error) {
    next(error);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) throw new BadRequestError("Invalid user_id");
    const user = await userService.getUserById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  logout,
  register,
  deleteUser,
  getUsers,
  getUserById,
};

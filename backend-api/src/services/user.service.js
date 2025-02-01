const bcrypt = require("bcrypt");
const knex = require("../database/knex");
const { NotFoundError, UnauthorizedError } = require("../api-error");

function userRepository() {
  return knex("user");
}

function readUser(user) {
  return {
    username: user.username,
    email: user.email,
    phone: user.phone,
    fullname: user.fullname,
    role: user.role,
  };
}

async function getUsers() {
  const user = await userRepository().select();
  if (!user) {
    throw new NotFoundError("User table is empty!");
  }
  return user;
}

async function getUserByUsername(username) {
  const user = await userRepository().where({ username }).first();
  if (!user) {
    throw new NotFoundError("User not found!");
  }
  return user;
}

async function getUserById(id) {
  const user = await userRepository().where({ id }).first();
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
}

async function createUser({ username, email, password, role }) {
  await userRepository().insert({ username, email, password, role });
}

async function loginUser(username, password) {
  const user = await getUserByUsername(username);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid password");
  }
  return { id: user.id, username: user.username, role: user.role };
}

async function registerUser({ username, email, password }) {
  const role = "User"; // Default role

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the user into the database
  const id = await createUser({
    username,
    email,
    password: hashedPassword,
    role,
  });

  return { id };
}

async function deleteUser(id) {
  await getUserById(id);
  await userRepository().where({ id }).delete();
}

module.exports = {
  loginUser,
  registerUser,
  getUserByUsername,
  getUserById,
  getUsers,
  deleteUser,
};

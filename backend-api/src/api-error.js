class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.status = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
    this.status = 403;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.status = 400;
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.status = 500;
  }
}

class MethodNotAllowedError extends Error {
  constructor(message) {
    super(message);
    this.name = "MethodNotAllowedError";
    this.status = 405;
  }
}

module.exports = {
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  BadRequestError,
  InternalServerError,
  MethodNotAllowedError,
};

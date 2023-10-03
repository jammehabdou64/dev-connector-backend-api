// const jwt = require("jsonwebtoken");
const { jwtVerify } = require("../../utils");

const auth = (request, response, next) => {
  try {
    let token;
    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith("Bearer")
    ) {
      token = request.headers.authorization.split(" ")[1];
    } else if (request.header("x-auth-token")) {
      token = request.header("x-auth-token");
    }
    if (!token) {
      return response.json({ message: "Not authorize" }).status(403);
    }

    request.id = jwtVerify(token);
    next();
  } catch (err) {
    console.error(err.stack);
    return response.json({ message: "Not authorize" }).status(403);
  }
};

module.exports = auth;

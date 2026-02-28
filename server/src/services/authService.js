const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

function validateRegisterPayload({ name, email, password, confirmPassword }) {
  if (!name || !email || !password || !confirmPassword) {
    return "All fields are required";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
}

async function registerUser(payload) {
  const validationError = validateRegisterPayload(payload);
  if (validationError) {
    return { ok: false, status: 400, message: validationError };
  }

  const existingUser = await userModel.findByEmail(payload.email);
  if (existingUser) {
    return { ok: false, status: 409, message: "Email already registered" };
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const userId = await userModel.createUser({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
  });

  return {
    ok: true,
    status: 201,
    message: "Registration successful",
    data: { userId },
  };
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    return { ok: false, status: 400, message: "Email and password are required" };
  }

  const user = await userModel.findByEmail(email);
  if (!user) {
    return { ok: false, status: 401, message: "Invalid email or password" };
  }

  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    return { ok: false, status: 401, message: "Invalid email or password" };
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );

  return {
    ok: true,
    status: 200,
    message: "Login successful",
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  };
}

module.exports = {
  registerUser,
  loginUser,
};

const authService = require("../services/authService");

async function register(req, res, next) {
  try {
    const result = await authService.registerUser(req.body);
    if (!result.ok) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(result.status).json({
      message: result.message,
      userId: result.data.userId,
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.loginUser(req.body);
    if (!result.ok) {
      return res.status(result.status).json({ message: result.message });
    }

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", result.data.token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(result.status).json({
      message: result.message,
      user: result.data.user,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login,
};

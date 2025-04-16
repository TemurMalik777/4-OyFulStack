const { errorHandler } = require("../helpers/error_handler");
const User = require("../model/user.model");
const { userValidation } = require("../validations/user.validation");
const jwtService = require("../services/jwt.service");
const bcrypt = require("bcrypt");
const config = require("config");
const uuid = require("uuid");

const createUser = async (req, res) => {
  try {
    const { error, value } = userValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const {
      username,
      password,
      phone_number,
      first_name,
      last_name,
      profil_photo,
      bio,
      last_seem,
    } = value;

    const existing = await User.findOne({ where: { phone_number } });
    if (existing) {
      return res
        .status(409)
        .send({ message: "Telgiramga acountga krish kodi yuborildi." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const activation_link = uuid.v4();

    const newUser = await User.create({
      username,
      password: hashedPassword,
      phone_number,
      first_name,
      last_name,
      profil_photo,
      bio,
      last_seem,
    });

    const payload = {
      id: newUser.id,
      phone_number: newUser.phone_number,
      role: "user",
    };
    const tokens = jwtService.generateTokens(payload);

    res.status(201).send({
      message: "Yangi foydalanuvchi qo'shildi",
      user: newUser,
      accessToken: tokens.accesstoken,
      refreshTokenClients: tokens.refreshtoken,
    });
  } catch (error) {
    console.error(error); // Xatolik haqida ko'proq ma'lumot olish uchun
    res.status(500).send({ message: "Foydalanuvchi yaratishda xatolik" });
  }
};

//---------------------------------------------------------------

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).send({ message: " Username notug'ri!" });
    }

    const userPassword = bcrypt.compareSync(password, user.password);
    if (!userPassword) {
      return res
        .status(400)
        .send({ message: "Username yoki password noto'gri " });
    }

    const payload = {
      id: user.id,
      username: user.username,
      phone_number: user.phone_number,
      role: "user",
    };

    const tokens = jwtService.generateTokens(payload);
    user.refresh_token = tokens.refreshtoken;
    await user.save();
    res.cookie("refreshTokenUser", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.status(200).send({
      message: "User login successful",
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    console.error("Login xatosi:", error);
    return res.status(500).send({ message: "Server xatosi" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { refreshTokenUser } = req.cookies;
    if (!refreshTokenUser) {
      return res.status(400).send({ message: "Refresh token not found" });
    }

    const user = await User.findOne({
      where: { refresh_token: refreshTokenUser },
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await user.update({ refresh_token: null });

    res.clearCookie("refreshTokenUser");
    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};
const refreshTokenUser = async (req, res) => {
  try {
    const { refreshTokenUser } = req.cookies;

    if (!refreshTokenUser) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi ?" });
    }
    const decodedRefreshToken = await jwtService.verifyRefreshToken(
      refreshTokenUser
    );
    const user = await User.findOne({ refresh_token: refreshTokenUser });
    if (!user) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }
    const payload = {
      id: user.id,
      username: user.username,
      phone_number: user.phone_number,
      role: "user",
    };

    const tokens = jwtService.generateTokens(payload);
    user.refresh_token = tokens.refreshtoken;
    await user.save();
    res.cookie("refreshTokenClient", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });
    res.send({
      message: "Tokenlar yangilandi",
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

//---------------------------------------------------------------
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = userValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const {
      phone_number,
      username,
      first_name,
      last_name,
      profil_photo,
      bio,
      last_seem,
    } = value;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const [updateCount, updateUser] = await User.update(
      {
        phone_number,
        username,
        first_name,
        last_name,
        profil_photo,
        bio,
        last_seem,
      },
      { where: { id }, returning: true }
    );

    if (updateCount === 0) {
      return res.status(400).send({ message: "Yangilanish amalga oshmadi" });
    }

    res.status(200).send({
      updateClent: updateUser[1],
      message: "Client updated successfully",
      user,
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: "Foydalanuvchilarni olishda xatolik" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).send({ error: "Foydalanuvchi topilmadi" });
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: "Foydalanuvchini olishda xatolik" });
  }
};

// const updateUser = async (req, res) => {
//   const { id } = req.params;
//   const {
//     phone_number,
//     username,
//     first_name,
//     last_name,
//     profil_photo,
//     bio,
//     last_seem,
//   } = req.body;

//   try {
//     const user = await User.findByPk(id);
//     if (!user)
//       return res.status(404).send({ error: "Foydalanuvchi topilmadi" });

//     await user.update({
//       phone_number,
//       username,
//       first_name,
//       last_name,
//       profil_photo,
//       bio,
//       last_seem,
//     });

//     res.send(user);
//   } catch (error) {
//     res.status(500).send({ error: "Foydalanuvchini yangilashda xatolik" });
//   }
// };

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).send({ error: "Foydalanuvchi topilmadi" });

    await user.destroy();
    res.send({ message: "Foydalanuvchi o‘chirildi" });
  } catch (error) {
    res.status(500).send({ error: "Foydalanuvchini o‘chirishda xatolik" });
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  refreshTokenUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

const { errorHandler } = require("../helpers/error_handler");
const User = require("../model/user.model");
const { userValidation } = require("../validations/user.validation");
const jwtService = require("../services/jwt.service");
const mailService = require("../services/mail.service");
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
    const activation_link = uuid.v4();

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

    // await mailService.sendActivationMail(
    //   newUser.email,
    //   `${config.get("api_url")}/api/clients/activate/${activation_link}`
    // );

    const payload = {
      id: newUser.id,
      email: newUser.email,
      phone: newUser.phone,
      role: "client",
    };
    const tokens = jwtService.generateTokens(payload);

    res.status(201).send({
      message: "Yangi foydalanuvchi qo'shildi",
      user: newUser,
    });
    await User.update({
      last_seem: new Date(),
    });
  } catch (error) {
    console.error(error); // Xatolik haqida ko'proq ma'lumot olish uchun
    res.status(500).send({ message: "Foydalanuvchi yaratishda xatolik" });
  }
};

const activateUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { activation_link: req.params.link },
    });
    if (!client) {
      return res.status(404).send({ message: "Foydalanuvchi topilmadi" });
    }

    const payload = {
      id: user.id,
      username: user.username,
      phone_number: user.phone_number,
      role: "user",
    };

    const tokens = jwtService.generateTokens(payload);

    // client.is_active = true;
    client.refresh_token = tokens.refreshtoken;
    await client.save();

    res.cookie("refreshToken", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.send({
      message: "Foydalanuvchi faollashtirildi",
      // status: owner.is_active,
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

//---------------------------------------------------------------

const loginUser = async (req, res) => {
  try {
    const { phone_number } = req.body;

    if (!phone_number) {
      return res.status(400).send({ message: "Telefon raqami kerak!" });
    }

    const user = await User.findOne({ where: { phone_number } });

    if (!user) {
      user = await User.create({ phone_number });
    }

    return res.status(200).send({
      message: "Muvaffaqiyatli kirildi",
      user,
    });
  } catch (error) {
    console.error("Login xatosi:", error);
    return res.status(500).send({ message: "Server xatosi" });
  }
};

const logoutUser = (req, res) => {
  try {
    res.status(200).send({
      message: "Siz chiqishni xohlaysizmi? (ha/yo'q)",
    });

    req.on("data", (data) => {
      const userResponse = data.toString().trim().toLowerCase();

      if (userResponse === "ha") {
        req.session.destroy((err) => {
          if (err) {
            return res
              .status(500)
              .send({ message: "Sessionni tozalashda xatolik" });
          }

          res.status(200).send({ message: "Siz muvaffaqiyatli chiqdingiz!" });
        });
      } else if (userResponse === "yo'q") {
        res.status(200).send({ message: "Chidishingiz mumkin" });
      } else {
        res
          .status(400)
          .send({ message: "Iltimos, 'ha' yoki 'yo'q' deb javob bering!" });
      }
    });
  } catch (error) {
    console.error("Logoutda xatolik:", error);
    res.status(500).send({ message: "Logoutda xatolik" });
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
      email: user.email,
      phone: user.phone,
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

const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    phone_number,
    username,
    first_name,
    last_name,
    profil_photo,
    bio,
    last_seem,
  } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).send({ error: "Foydalanuvchi topilmadi" });

    await user.update({
      phone_number,
      username,
      first_name,
      last_name,
      profil_photo,
      bio,
      last_seem,
    });

    res.send(user);
  } catch (error) {
    res.status(500).send({ error: "Foydalanuvchini yangilashda xatolik" });
  }
};

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

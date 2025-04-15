const { errorHandler } = require("../helpers/error_handler");
const User = require("../model/user.model");

const createUser = async (req, res) => {
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
    // Telefon raqami va boshqa maydonlar bo'yicha tekshiruv qo'shish mumkin
    if (!phone_number || !username || !first_name || !last_name) {
      return res
        .status(400)
        .send({ message: "Barcha majburiy maydonlarni to'ldiring" });
    }

    const user = await User.create({
      phone_number,
      username,
      first_name,
      last_name,
      profil_photo,
      bio,
      last_seem,
    });

    res.status(201).send({
      message: "Yangi foydalanuvchi qo'shildi",
      user: user, // Foydalanuvchi instansiyasini to'g'ridan-to'g'ri qaytaramiz
    });
  } catch (error) {
    console.error(error); // Xatolik haqida ko'proq ma'lumot olish uchun
    res.status(500).send({ message: "Foydalanuvchi yaratishda xatolik" });
  }
};

//---------------------------------------------------------------

const loginUser = async (req, res) => {
  try {
    const { phone_number } = req.body;

    if (!phone_number) {
      return res.status(400).send({ message: "Telefon raqami kerak!" });
    }

    // Foydalanuvchini qidiramiz
    const user = await User.findOne({ where: { phone_number } });

    // Agar topilmasa — yangi foydalanuvchi yaratamiz
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

//---------------------------------------------------------------

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: "Foydalanuvchilarni olishda xatolik" });
  }
};

// GET /users/:id
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

// PUT /users/:id
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

// DELETE /users/:id
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
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

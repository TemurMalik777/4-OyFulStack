const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  loginUser,
  logoutUser,
} = require("../controller/user.controller");

const router = require("express").Router();

router.post("/", createUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", deleteUser);

module.exports = router;

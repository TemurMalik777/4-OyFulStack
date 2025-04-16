const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  loginUser,
  logoutUser,
  updateUser,
  refreshTokenUser,
} = require("../controller/user.controller");

const router = require("express").Router();

router.post("/", createUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/refresh", refreshTokenUser)
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

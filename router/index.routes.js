const router = require("express").Router()

const userRoute = require("./user.routes")
const contactRoute = require("./contacts.routes")
const chatRoute = require("./chat.routes")
const chatAdminRoute = require("./chat.admin.routes")
const channelsRoute = require("./chanels.routes")

router.use("/user", userRoute)
router.use("/contacts", contactRoute)
router.use("/chat", chatRoute)
router.use("/chat.admin", chatAdminRoute)
router.use("/chanels", channelsRoute)

module.exports = router
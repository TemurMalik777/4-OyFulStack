const router = require("express").Router();

const userRoute = require("./user.routes");
const contactRoute = require("./contacts.routes");
const chatRoute = require("./chat.routes");
const chatAdminRoute = require("./chat.admin.routes");
const channelsRoute = require("./channels.routes");
const messageRoute = require("./message.routes");
const mediaFileRoute = require("./media.files.routes");
const messageEditRoute = require("./message.edit.routes");
const chanelsPostRoute = require("./channels.post.routes");
const userChatRoute = require("./user.chat.routes");
const reactedRoute = require("./reactions.routes");
const messageReadRoute = require("./message.reads.routes");

router.use("/user", userRoute);
router.use("/contacts", contactRoute);
router.use("/chat", chatRoute);
router.use("/chat.admin", chatAdminRoute);
router.use("/chanels", channelsRoute);
router.use("/message", messageRoute);
router.use("/media.files", mediaFileRoute);
router.use("/message.edit", messageEditRoute);
router.use("/channels.post", chanelsPostRoute);
router.use("/user.chat", userChatRoute);
router.use("/reactions", reactedRoute);
router.use("/message.reads", messageEditRoute);

module.exports = router;

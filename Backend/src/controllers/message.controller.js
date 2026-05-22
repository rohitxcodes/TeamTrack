const {
  saveGroupMessage,
  getGroupMessages,
} = require("../services/message.service");

async function getGroupMessagesController(req, res) {
  try {
    const { groupId } = req.params;
    const messages = await getGroupMessages({ groupId });
    return res.status(200).json({ messages });
  } catch (err) {
    console.error("getGroupMessagesController error:", err);
    return res
      .status(500)
      .json({ message: err.message || "Failed to fetch messages" });
  }
}

async function createGroupMessageController(req, res) {
  try {
    const { groupId } = req.params;
    const { text } = req.body;
    const userId = req.user && req.user._id;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Message text is required" });
    }

    const message = await saveGroupMessage({
      groupId,
      userId,
      text: String(text).trim(),
    });
    return res.status(201).json({ message: "Message saved", data: message });
  } catch (err) {
    console.error("createGroupMessageController error:", err);
    return res
      .status(500)
      .json({ message: err.message || "Failed to save message" });
  }
}

module.exports = {
  getGroupMessagesController,
  createGroupMessageController,
};

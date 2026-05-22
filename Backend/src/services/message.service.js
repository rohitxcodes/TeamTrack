const Message = require("../models/Message.model");

async function saveGroupMessage({ groupId, userId, text }) {
  if (!groupId || !userId || !text) throw new Error("Invalid message payload");

  const message = await Message.create({
    group: groupId,
    sender: userId,
    text,
  });

  // Keep only the last 50 messages per group. Remove oldest if over limit.
  try {
    const count = await Message.countDocuments({ group: groupId });
    const max = 50;
    if (count > max) {
      const excess = count - max;
      const oldest = await Message.find({ group: groupId })
        .sort({ createdAt: 1 })
        .limit(excess)
        .select("_id");
      const ids = oldest.map((d) => d._id);
      if (ids.length) {
        await Message.deleteMany({ _id: { $in: ids } });
      }
    }
  } catch (err) {
    console.error("Failed to prune messages:", err);
  }

  // Return populated message for convenience
  return Message.findById(message._id).populate("sender", "name email");
}

async function getGroupMessages({ groupId, limit = 50 }) {
  if (!groupId) throw new Error("groupId is required");
  const messages = await Message.find({ group: groupId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("sender", "name email")
    .lean();

  // return in ascending order (oldest first)
  return messages.reverse();
}

module.exports = {
  saveGroupMessage,
  getGroupMessages,
};

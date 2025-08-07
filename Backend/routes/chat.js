import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();

router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "abc",
      title: "Test New Thread2",
    });
    const response = await thread.save();
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save in DB" });
  }
});

//Get all threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json(thread.messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch thread" });
  }
});

router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const deleteThread = await Thread.findOneAndDelete({ threadId });
    if (!deleteThread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json({ message: "Thread deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete thread" });
  }
});

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res
      .status(400)
      .json({ error: "Thread ID and message are required" });
  }

  try {
    let thread = await Thread.findOne({
      threadId,
    });

    if (!thread) {
      //create a new thread in DB
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }

    const assistantReply = await getOpenAIAPIResponse(message);

    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();

    await thread.save();
    res.json({ message: assistantReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process chat" });
  }
});

export default router;

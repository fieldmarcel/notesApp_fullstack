import express from "express";
import Note from "../models/Note.js";
import authMiddleware from "../middleware/authMiddleware.js"; // verify JWT

const router = express.Router();

// Get all notes for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new note
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    const note = new Note({
      content,
      userId: req.user.userId,
    });
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a note by ID
// Delete a note by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });

    // Only allow owner to delete
    if (note.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Replace note.remove() with:
    await Note.deleteOne({ _id: req.params.id });

    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;

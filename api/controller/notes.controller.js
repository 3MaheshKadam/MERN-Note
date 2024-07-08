import Notes from "../model/notes.model.js";

export const createNote = async (req, res, next) => {
  try {
    const note = await Notes.create(req.body);
    return res.status(201).json({ note });
  } catch (err) {
    next(err);
  }
};

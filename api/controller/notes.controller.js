import Notes from "../model/notes.model.js";
export const createNote = async (req, res, next) => {
  try {
    const note = await Notes.create(req.body);
    return res.status(201).json({ note });
  } catch (err) {
    next(err);
  }
};

export const deleteNote = async (req, res, next) => {
  const note = await Notes.findById(req.params.id);

  if (!note) {
    return next(errorHandler(404, "Note not found!"));
  }

  if (req.user.id !== note.userRef.toString()) {
    return next(errorHandler(401, "You can only delete your own notes!"));
  }

  try {
    await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Note has been deleted!" });
  } catch (error) {
    next(error);
  }
};
export const updateNote = async (req, res, next) => {
  console.log("Update Note ID:", req.params.id); // Log the ID to debug
  const note = await Notes.findById(req.params.id);
  if (!note) {
    return next(errorHandler(404, "Note not found!"));
  }
  if (req.user.id !== note.userRef.toString()) {
    return next(errorHandler(401, "You can only update your own note!"));
  }

  try {
    const updatedNote = await Notes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  console.log("Get Note ID:", req.params.id); // Log the ID to debug
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return next(errorHandler(404, "Note not found!"));
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// export const getNote = async (req, res, next) => {
//   try {
//     const note = await Notes.findById(req.params.id);
//     if (!note) {
//       return next(errorHandler(404, "Note not found!"));
//     }
//     res.status(200).json(note);
//   } catch (error) {
//     next(error);
//   }
// };

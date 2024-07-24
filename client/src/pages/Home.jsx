import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    userRef: currentUser._id,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/user/notes/${currentUser._id}`);
        setNotes(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchNotes();
  }, [currentUser._id]);

  const handleDeleteNote = async (noteId) => {
    try {
      const res = await fetch(`/api/notes/delete/${noteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await axios.post("/api/notes/create", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      navigate(`/notes/${response.data.note._id}`);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Your Notes</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-700 text-sm">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <form
            onSubmit={handleSubmit}
            className="border p-3 rounded-lg relative h-48 flex flex-col"
          >
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                type="submit"
                className="bg-green-500 text-white px-3 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2 border rounded-lg mb-2"
              />
              <textarea
                placeholder="Content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full p-2 border rounded-lg h-24 resize-none"
              />
            </div>
          </form>
          {notes.map((note) => (
            <div
              key={note._id}
              className="border p-3 rounded-lg relative h-48 flex flex-col"
            >
              <div className="absolute top-3 right-3 flex gap-2">
                <Link
                  to={`/update-note/${note._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
              <Link to={`/notes/${note._id}`} className="flex-grow">
                <h2 className="text-xl font-semibold   overflow-hidden text-ellipsis whitespace-nowrap">
                  {note.title}
                </h2>
                <p className="py-4">{note.content}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Your Notes</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-700 text-sm">{error}</p>}
      {!loading && !error && (
        <div className="flex flex-col gap-4">
          {notes.map((note) => (
            <Link
              key={note._id}
              to={`/notes/${note._id}`}
              className="border p-3 rounded-lg"
            >
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p>{note.content}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;

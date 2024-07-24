import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdateNote = () => {
  const { id } = useParams(); // Get the note ID from the URL
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    userRef: currentUser._id,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing note data
  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/notes/get/${id}`);
        setFormData({
          title: response.data.title,
          content: response.data.content,
          category: response.data.category,
          userRef: response.data.userRef,
        });
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await axios.put(`/api/notes/update/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      navigate(`/notes/${id}`);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Update Note</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="border p-3 rounded-lg"
            id="title"
            required
            onChange={handleChange}
            value={formData.title}
          />
          <textarea
            type="text"
            placeholder="Content"
            className="border p-3 rounded-lg h-[30rem]"
            id="content"
            required
            onChange={handleChange}
            value={formData.content}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="p-3 bg-blue-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Updating..." : "Update Note"}
        </button>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>
    </main>
  );
};

export default UpdateNote;

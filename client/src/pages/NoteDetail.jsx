import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const NoteDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/notes/get/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <main className="p-3 max-w-4xl mx-auto">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-700 text-sm">{error}</p>}
      {post && (
        <div className="border p-3 rounded-lg">
          <h1 className="text-3xl font-semibold">{post.title}</h1>
          <p>{post.content}</p>
        </div>
      )}
    </main>
  );
};

export default NoteDetail;

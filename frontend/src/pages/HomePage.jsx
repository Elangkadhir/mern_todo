import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { toast } from "react-hot-toast";
import NotesCard from "../components/NotesCard";
import api from "../lib/api";
function HomePage() {
  const [isRateLimitedUI, setIsRateLimitedUI] = useState(false);
  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      console.log(res);
      setNotes(res.data);
    } catch (error) {
      console.log(error);
      if (error.response.status == 429) {
        setIsRateLimitedUI(true);
      } else {
        toast.error("Failed fetching api");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimitedUI && <RateLimitedUI />}
      {loading && (
        <div className="text-center text-primary py-10">loading...</div>
      )}
      <div className="max-w-7xl mx-auto mt-6 grid grid-cols-4 gap-2 w-full">
        {notes.length > 0 &&
          !isRateLimitedUI &&
          notes.map((note, index) => <NotesCard setNotes={setNotes} note={note} key={index} />)}
      </div>
    </div>
  );
}

export default HomePage;

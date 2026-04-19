import { PenSquareIcon, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/api";
import toast from "react-hot-toast";

function NotesCard({ note, setNotes }) {
  const handleDelete = async (e, note) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete it")) return;

    try {
      let res = api.delete(`/notes/${note._id}`);
      setNotes((prev) => prev.filter((n) => n._id !== note._id));
      toast.success("Notes deleted");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };
  return (
    <div>
      <Link
        to={`/note/${note._id}`}
        className="card bg-primary text-primary-content mt-2"
      >
        <div className="card-body">
          <h2 className="card-title">{note.title}</h2>
          <p>{note.content}</p>
          <p>{formatDate(new Date(note?.createdAt))}</p>
          <div className="card-actions justify-end">
            <button className="btn">
              <PenSquareIcon />
            </button>

            <button className="btn" onClick={(e) => handleDelete(e, note)}>
              <Trash2 />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default NotesCard;

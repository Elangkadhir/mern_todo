import React, { useState } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function CreatePage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      alert("Please fill all fields");
      return;
    }

    console.log("Submitted Data:", formData);

    try {
      let res = api.post("/notes", {
        title: formData.title,
        content: formData.content,
      });
      toast.success("Item added in the list");
      navigate("/");
      setFormData({
        title: "",
        content: "",
      });
    } catch (error) {
      toast.error("An Error occured");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className=" p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Create Note</h2>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter content"
            rows="4"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full btn btn-primary text-white py-2 rounded-lg transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreatePage;

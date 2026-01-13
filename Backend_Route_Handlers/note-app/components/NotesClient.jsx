"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const NotesClient = ({ initialNotes }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [notes, setnotes] = useState(initialNotes);

  const [editingId, seteditingId] = useState(null);
  const [editTitle, seteditTitle] = useState("");
  const [editContent, seteditContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const result = await response.json();
      console.log(result);

      if (result.success) {
        setnotes([result.data, ...notes]);
        toast.success("Notes Created successfull");
        setTitle("");
        setContent("");
      } else {
        console.error("API Error:", result.error);
      }
    } catch (error) {
      console.error("Error Creating note", error);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        setnotes(notes.filter((note) => note._id !== id));
        toast.success("Notes deleted successfully");
      } else {
        console.error("API Error:", result.error);
        toast.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Something went wrong");
    }
  };

  const updateNote = async (id) => {
    if (!editTitle.trim() || !editContent.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Notes Updated successfully");

        setnotes(notes.map((note) => (note._id === id ? result.data : note)));
        seteditTitle("");
        seteditingId(null);
        seteditContent("");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error updating note", error);
      toast.error("Something went wrong");
    }
  };
  const startEdit = (note) => {
    seteditingId(note._id);
    seteditTitle(note.title);
    seteditContent(note.content);
  };
  const cancelEdit = () => {
    seteditingId(null);
    seteditTitle("");
    seteditContent("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Form Section */}
        <div className="mb-12">
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-300"
          >
            <div className="mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Create a New Note
              </h2>
              <p className="text-gray-300 text-sm">
                Capture your thoughts and ideas in one beautiful place
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-200 mb-3"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Give your note a title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-semibold text-gray-200 mb-3"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  rows={7}
                  placeholder="Write your thoughts here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="text-sm text-gray-400">
                  {title || content
                    ? `${Math.max(
                        0,
                        200 - (title.length + content.length)
                      )} chars remaining`
                    : "Add title and content"}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 ${
                    loading
                      ? "bg-purple-500/50 cursor-not-allowed text-white"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/50"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Create Note"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Notes List Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Your Notes <span className="text-purple-400">({notes.length})</span>
          </h2>
          <p className="text-gray-400 mb-8">Manage and organize your notes</p>

          {notes.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center">
              <p className="text-gray-400 text-lg">
                No notes yet. Create your first note above!{" "}
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-white/40 hover:bg-white/15 transition-all duration-300 group"
                >
                  {editingId === note._id ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Give your note a title..."
                        value={editTitle}
                        onChange={(e) => seteditTitle(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                      <textarea
                        rows={7}
                        placeholder="Write your thoughts here..."
                        value={editContent}
                        onChange={(e) => seteditContent(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateNote(note._id)}
                          disabled={loading}
                          className="px-4 py-2 bg-green-500/20 hover:bg-green-500/40 text-green-300 rounded-lg font-medium transition-all duration-200 text-sm"
                        >
                          {loading ? "saving..." : "save"}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-4 py-2 bg-gray-500/20 hover:bg-gray-500/40 text-gray-300 rounded-lg font-medium transition-all duration-200 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                            {note.title}
                          </h3>
                        </div>
                        <div className="flex gap-3 ml-4">
                          <button
                            onClick={() => startEdit(note)}
                            className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 rounded-lg font-medium transition-all duration-200 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteNote(note._id)}
                            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg font-medium transition-all duration-200 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed line-clamp-3">
                        {note.content}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesClient;

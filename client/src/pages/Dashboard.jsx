import axios from "axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_dash.png";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [showInput, setShowInput] = useState(false); // toggle input box
  const [newNoteContent, setNewNoteContent] = useState(""); // input value
  const navigate = useNavigate();

  // Load notes from DB when Dashboard mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));

      axios
        .get("http://localhost:5000/api/notes", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setNotes(res.data))
        .catch((err) => console.error(err));
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Add note
  const addNote = async () => {
    const token = localStorage.getItem("token");
    if (!newNoteContent.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/notes",
        { content: newNoteContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes([res.data, ...notes]);
      setNewNoteContent(""); // clear input
      setShowInput(false); // hide input box
    } catch (err) {
      console.error(err);
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Sign out
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] bg-white p-6 rounded-2xl shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <img
              src={logo}
              alt="App Logo"
              className="w-6 h-6 object-contain mr-2"
            />
            <span className="text-lg font-semibold">Dashboard</span>
          </div>
          <button
            onClick={handleSignOut}
            className="text-blue-600 font-medium text-sm hover:underline"
          >
            Sign Out
          </button>
        </div>

        {/* Welcome Card */}
        {user && (
          <div className="bg-gray-50 border rounded-lg p-4 mb-6 shadow-sm">
            <h2 className="text-lg font-bold">Welcome, {user.name}!</h2>
            <p className="text-gray-600 text-sm">Email: {user.email}</p>
          </div>
        )}

        {/* Create Note / Input */}
        {!showInput && (
          <button
            onClick={() => setShowInput(true)}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition mb-6"
          >
            Create Note
          </button>
        )}
        {showInput && (
          <div className="mb-6">
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Write your note here..."
              className="w-full border rounded-md p-2 mb-2"
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowInput(false)}
                className="px-3 py-1 border rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={addNote}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Notes Section */}
        <h3 className="text-lg font-semibold mb-3">Notes</h3>
        {notes.length === 0 && (<p className="text-gray-500 text-sm">No notes yet.</p>)}
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
          {notes.map((note) => (
            <div
              key={note._id}
              className="flex justify-between items-center border rounded-md px-4 py-3 shadow-sm"
            >
              <span className="text-gray-800">{note.content}</span>
              <button
                onClick={() => deleteNote(note._id)}
                className="text-gray-500 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

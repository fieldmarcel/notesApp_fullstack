import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function Dashboard() {
  const [notes, setNotes] = useState(["Note 1", "Note 2"]);

  const addNote = () => {
    setNotes([...notes, `Note ${notes.length + 1}`]);
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-[400px] bg-white p-6 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full border-4 border-blue-500 animate-spin mr-2"></div>
            <span className="text-lg font-semibold">Dashboard</span>
          </div>
          <a
            href="#"
            className="text-blue-600 font-medium text-sm hover:underline"
          >
            Sign Out
          </a>
        </div>

        {/* Welcome Card */}
        <div className="bg-gray-50 border rounded-lg p-4 mb-6 shadow-sm">
          <h2 className="text-lg font-bold">Welcome, Jonas Khanwald !</h2>
          <p className="text-gray-600 text-sm">Email: xxxxxx@xxxx.com</p>
        </div>

        {/* Create Note Button */}
        <button
          onClick={addNote}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition mb-6"
        >
          Create Note
        </button>

        {/* Notes Section */}
        <h3 className="text-lg font-semibold mb-3">Notes</h3>
        <div className="space-y-3">
          {notes.map((note, index) => (
            <div
              key={index}
              className="flex justify-between items-center border rounded-md px-4 py-3 shadow-sm"
            >
              <span className="text-gray-800">{note}</span>
              <button
                onClick={() => deleteNote(index)}
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

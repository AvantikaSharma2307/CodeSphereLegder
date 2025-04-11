import { Loader2, Pencil, Save } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    experience: '',
    skills: '',
    projects: '',
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setFormData({
          experience: data.experience || '',
          skills: data.skills || '',
          projects: data.projects || '',
        });
      })
      .catch((err) => {
        console.error("Unauthorized:", err);
        setUser(null);
      });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      ...formData
    }));
    setEditing(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 min-h-screen bg-gradient-to-b from-[#0f021c] via-[#12042a] to-[#080011] text-white">
      <Sidebar />
      <div className="col-span-3 p-8 flex justify-center">
        {user ? (
          <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-6 w-full max-w-3xl space-y-6 border border-white/20">
            {/* Profile Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={`https://github.com/${user.username}.png`}
                  alt="GitHub Avatar"
                  className="w-24 h-24 rounded-full border-4 border-[#9a8c98]"
                />
                <div>
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-gray-300">
                    GitHub: <span className="text-[#c9ada7] font-medium">@{user.username}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditing(!editing)}
                className="flex items-center gap-2 px-4 py-2 bg-[#9a8c98] text-black rounded-lg hover:bg-[#c9ada7] transition"
              >
                <Pencil className="w-5 h-5" />
                {editing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {/* Editable Form */}
            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block font-medium text-gray-200">Experience</label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-white/20 text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-200">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-white/20 text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-200">Projects</label>
                  <textarea
                    name="projects"
                    value={formData.projects}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-white/20 text-white"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Experience Section */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-300">Experience</h2>
                  <p className="text-gray-400">{user.experience || 'No experience added yet.'}</p>
                </div>

                {/* Skills Section */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-300">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {(user.skills || '').split(',').map((skill, index) => (
                      <span key={index} className="bg-[#c9ada7] text-black px-3 py-1 rounded-full text-sm font-medium shadow-md">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects Section */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-300">Projects</h2>
                  <p className="text-gray-400">{user.projects || 'No projects added yet.'}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-300">
            <Loader2 className="animate-spin w-5 h-5" />
            Loading or not logged in.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

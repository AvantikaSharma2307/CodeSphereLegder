import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, Briefcase } from 'lucide-react';
import Sidebar from './Sidebar';

const Project = () => {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredGigs, setFilteredGigs] = useState([]);

  useEffect(() => {
    const dummyGigs = [
      {
        id: 1,
        title: 'Build a React Landing Page',
        description: 'Responsive and animated landing page needed for a tech startup.',
        budget: '$50 - $100',
        skills: ['React', 'Tailwind CSS', 'Framer Motion'],
        duration: '1 week',
      },
      {
        id: 2,
        title: 'Fix bugs in Django project',
        description: 'Resolve auth and deployment issues in Django app.',
        budget: '$80',
        skills: ['Django', 'PostgreSQL', 'Heroku'],
        duration: '3 days',
      },
      {
        id: 3,
        title: 'Design Figma UI for eLearning platform',
        description: 'Minimal, clean UI for 5 screens.',
        budget: '$30 - $60',
        skills: ['Figma', 'UI/UX'],
        duration: '2 days',
      },
    ];

    setGigs(dummyGigs);
    setFilteredGigs(dummyGigs);
  }, []);

  useEffect(() => {
    const results = gigs.filter(gig =>
      gig.title.toLowerCase().includes(search.toLowerCase()) ||
      gig.description.toLowerCase().includes(search.toLowerCase()) ||
      gig.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredGigs(results);
  }, [search, gigs]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-[#0f021c] via-[#12042a] to-[#080011]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-indigo-200 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-300" />
            Freelance Opportunities
          </h2>
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 border border-indigo-200 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute top-2.5 left-3 h-5 w-5 text-indigo-400" />
          </div>
        </div>

        <div className="grid gap-4">
          {filteredGigs.length > 0 ? (
            filteredGigs.map(gig => (
              <div
                key={gig.id}
                className="bg-gradient-to-r from-purple-900 via-indigo-900 to-violet-800 border border-indigo-700 p-4 rounded-xl shadow-lg hover:shadow-xl transition text-white"
              >
                <h3 className="text-xl font-semibold">{gig.title}</h3>
                <p className="text-indigo-100 mt-1">{gig.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {gig.skills.map((skill, index) => (
                    <span key={index} className="bg-indigo-500 text-white text-sm px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-indigo-200 mt-3">
                  <span>Duration: {gig.duration}</span>
                  <span className="text-indigo-300 font-bold">{gig.budget}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-indigo-300 italic">No matching freelance opportunities found.</p>
          )}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition mt-6">
          <PlusCircle className="w-5 h-5" />
          Post a Job
        </button>
      </div>
    </div>
  );
};

export default Project;

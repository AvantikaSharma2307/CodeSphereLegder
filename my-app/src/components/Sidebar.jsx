import { NavLink } from 'react-router-dom';
import { User, FolderPlus } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen font-sans bg-[#12042a] text-white p-6 shadow-lg relative z-10">
      <h2 className="text-3xl font-bold mb-10 text-white tracking-wide">Dashboard</h2>
      
      <nav className="flex flex-col gap-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
              isActive ? 'bg-[#9a8c98] text-black' : 'hover:bg-[#9a8c98]/20'
            }`
          }
        >
          <User className="w-5 h-5" />
          Profile
        </NavLink>

        <NavLink
          to="/dashboard/projects"
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
              isActive ? 'bg-[#9a8c98] text-black' : 'hover:bg-[#9a8c98]/20'
            }`
          }
        >
          <FolderPlus className="w-5 h-5" />
          New Projects
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;

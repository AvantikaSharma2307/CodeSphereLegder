import React from 'react';
import { Briefcase, Code2, Palette, PenTool, Search, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function App() {
    const handlelogin=()=>{
        window.location.href="https://github.com/login/oauth/authorize?client_id=Ov23liHuhE6yapxRByHx";
    }
  return (
    <main className="min-h-screen font-sans bg-gradient-to-b from-[#0f021c] via-[#12042a] to-[#080011] relative overflow-hidden text-white">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-purple-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-700/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
      </div>

      {/* Navigation */}
      <header className="relative bg-[#14032d]/50 backdrop-blur-xl border-b border-purple-800 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center group cursor-pointer">
              <Briefcase className="h-9 w-9 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-purple-300 via-fuchsia-400 to-purple-300 bg-clip-text text-transparent">
                FreelanceHub
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <button className="px-6 py-2.5 text-purple-300 hover:text-white font-medium transition-colors duration-300" 
              onClick={handlelogin}>
                Login
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 text-white rounded-lg font-medium shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-all duration-300 hover:-translate-y-0.5">
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 z-10">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Find the perfect{' '}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent">
              freelance services
            </span>
          </h1>
          <p className="text-xl text-purple-200/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect with talented freelancers, bring your ideas to life, and grow your business with our trusted platform.
          </p>
          <div className="flex justify-center items-center max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400/70" />
              <input
                type="text"
                placeholder="Search for any service..."
                className="w-full pl-12 pr-4 py-4 rounded-l-xl bg-[#1a022e]/60 backdrop-blur-lg border-2 border-r-0 border-purple-700/30 focus:border-purple-500 focus:outline-none text-white placeholder-purple-300/80 transition-all duration-300"
              />
            </div>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 text-white rounded-r-xl font-medium shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-all duration-300 hover:-translate-y-0.5">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 border-t border-purple-800 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-4">Popular Categories</h2>
            <p className="text-lg text-purple-200/90">Discover top-rated freelancers across various categories</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Code2, title: 'Development', desc: 'Web, Mobile & Software Development' },
              { icon: Palette, title: 'Design', desc: 'UI/UX, Graphics & Brand Identity' },
              { icon: PenTool, title: 'Writing', desc: 'Content Writing & Copywriting' },
              { icon: Users, title: 'Marketing', desc: 'Digital Marketing & SEO' }
            ].map((category, index) => (
              <div
                key={index}
                className="group p-8 bg-[#180028]/60 backdrop-blur-md rounded-2xl border border-purple-800 hover:border-purple-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(147,51,234,0.2)] cursor-pointer"
              >
                <category.icon className="h-14 w-14 text-purple-400 group-hover:text-purple-300 mx-auto mb-6 transition-colors duration-300" />
                <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-purple-200/90">{category.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-purple-800 text-purple-300 text-sm z-10">
        © {new Date().getFullYear()} FreelanceHub. All rights reserved.
      </footer>
    </main>
  );
}

export default App;

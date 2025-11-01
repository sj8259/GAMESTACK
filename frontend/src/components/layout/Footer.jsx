import { Link } from 'react-router-dom'
import { Github, Twitter, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/95 backdrop-blur-md border-t border-blue-600/30 mt-auto shadow-lg shadow-blue-900/20 metallic-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/favicon.svg" 
                alt="GameStack Logo" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-gradient">GameStack</span>
            </div>
            <p className="text-slate-300 mb-4 max-w-md">
              Learn programming through interactive 3D adventures. Master coding concepts 
              while exploring virtual worlds and solving puzzles.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@gamestack.dev"
                className="text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-blue-400 font-semibold mb-4 star-wars-title">Learn</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/levels" className="text-slate-300 hover:text-blue-400 transition-colors">
                  All Levels
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-yellow-200/70 hover:text-yellow-300 transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                  Tutorials
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-blue-400 font-semibold mb-4 star-wars-title">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-600/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-300 text-sm">
            © {currentYear} GameStack. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-300 hover:text-blue-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-300 hover:text-blue-400 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-slate-300 hover:text-blue-400 text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer







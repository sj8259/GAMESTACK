import { Link } from 'react-router-dom'
import { ArrowRight, Code, Gamepad2, Trophy, Users, Zap } from 'lucide-react'
import Scene3D from '../components/3d/Scene3D'

const HomePage = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8 text-blue-400" />,
      title: 'Learn by Coding',
      description: 'Write real Python code to control your 3D character and solve puzzles through programming.'
    },
    {
      icon: <Gamepad2 className="w-8 h-8 text-purple-400" />,
      title: '3D Adventures',
      description: 'Explore immersive 3D worlds filled with gems, obstacles, and exciting challenges.'
    },
    {
      icon: <Trophy className="w-8 h-8 text-yellow-400" />,
      title: 'Achievement System',
      description: 'Unlock achievements, climb leaderboards, and track your programming journey.'
    },
    {
      icon: <Users className="w-8 h-8 text-green-400" />,
      title: 'Community Driven',
      description: 'Learn alongside others, share progress, and compete with friends worldwide.'
    }
  ]

  const stats = [
    { label: 'Interactive Lessons', value: '50+' },
    { label: 'Programming Concepts', value: '15+' },
    { label: 'Happy Learners', value: '10K+' },
    { label: 'Success Rate', value: '95%' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-gradient">Learn to Code</span>
                <br />
                Through 3D Adventures
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl">
                Master programming concepts by controlling a 3D character in virtual worlds. 
                Write Python code, solve puzzles, and unlock new levels as you progress.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/levels" className="btn-primary text-lg px-8 py-4 group">
                  Start Learning
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/leaderboard" className="btn-secondary text-lg px-8 py-4">
                  View Leaderboard
                </Link>
              </div>
            </div>

            {/* 3D Preview */}
            <div className="relative">
              <div className="aspect-square max-w-lg mx-auto">
                <Scene3D />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">GameStack</span>?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our gamified approach makes learning programming fun, interactive, and engaging. 
              See immediate visual feedback as your code comes to life in 3D.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-hover text-center group">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-slate-800/50 rounded-xl group-hover:bg-slate-700/50 transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your <span className="text-gradient">Coding Journey</span>?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of learners who are mastering programming through interactive 3D adventures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg px-8 py-4 group">
              Get Started Free
              <Zap className="w-5 h-5 ml-2 group-hover:animate-bounce" />
            </Link>
            <Link to="/levels" className="btn-secondary text-lg px-8 py-4">
              Browse Levels
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage


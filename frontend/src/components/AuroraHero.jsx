import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Scene3D from './3d/Scene3D'

const AuroraHero = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      {/* 3D Game Scene Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-90">
          <Scene3D fullscreen />
        </div>
        {/* Lighter gradient overlay - only where text is */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/40" />
        {/* Minimal center darkening for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-950/20 to-transparent" />
      </div>

      {/* Aurora background effect */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-pink-600/15"
        />
        <motion.div
          className="absolute -inset-4"
          animate={{
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: "conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.4), transparent 30%)",
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.2), transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.2), transparent 50%), radial-gradient(circle at 40% 20%, rgba(59, 130, 246, 0.2), transparent 50%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[2] mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Learn to Code
            </span>
            <br />
            <span className="text-white">Through 3D Adventures</span>
          </motion.h1>

          <motion.p
            className="mb-12 text-lg text-slate-300 sm:text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Master programming concepts by controlling a 3D character in virtual worlds.
            Write Python code, solve puzzles, and unlock new levels as you progress.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="/levels"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative flex items-center">
                Start Learning
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              to="/leaderboard"
              className="group inline-flex h-12 items-center justify-center rounded-lg border-2 border-slate-600 bg-slate-900/50 backdrop-blur-sm px-8 text-base font-semibold text-white transition-all duration-300 hover:border-purple-500 hover:bg-purple-900/20 hover:scale-105"
            >
              View Leaderboard
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => {
            const randomX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920
            const startY = typeof window !== 'undefined' ? window.innerHeight + 50 : 1080
            const duration = Math.random() * 3 + 5
            const delay = Math.random() * 5
            
            return (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-blue-400/30"
                initial={{
                  x: randomX,
                  y: startY,
                  opacity: 0,
                }}
                animate={{
                  y: -50,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "linear",
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AuroraHero


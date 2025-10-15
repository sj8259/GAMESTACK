import { useState, useEffect } from 'react'

const SimpleScene3D = () => {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* 3D-like elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Player character */}
          <div 
            className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg transform transition-transform duration-300"
            style={{
              transform: `rotateY(${rotation}deg) rotateX(10deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg transform translate-z-2"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-400 rounded-lg transform translate-z-4"></div>
          </div>

          {/* Gems */}
          <div className="absolute -top-8 -right-8 w-6 h-6 bg-yellow-400 rounded-full shadow-lg animate-bounce">
            <div className="absolute inset-0 bg-yellow-300 rounded-full animate-ping"></div>
          </div>
          <div className="absolute -bottom-8 -left-8 w-6 h-6 bg-green-400 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}>
            <div className="absolute inset-0 bg-green-300 rounded-full animate-ping"></div>
          </div>
          <div className="absolute top-0 left-0 w-6 h-6 bg-red-400 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '1s' }}>
            <div className="absolute inset-0 bg-red-300 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Title */}
      <div className="absolute top-4 left-4 text-white">
        <h3 className="text-lg font-bold">GameStack 3D World</h3>
        <p className="text-sm opacity-75">Interactive Learning Environment</p>
      </div>
    </div>
  )
}

export default SimpleScene3D


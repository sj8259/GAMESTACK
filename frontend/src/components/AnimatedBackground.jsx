import { useEffect, useRef } from 'react'

// Animated background with floating particles and gradients
const AnimatedBackground = ({ variant = 'default' }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (variant === 'particles' && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      let animationFrameId
      const particles = []

      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)

      // Create particles
      const particleCount = 50
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2
        })
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particles.forEach(particle => {
          particle.x += particle.vx
          particle.y += particle.vy

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`
          ctx.fill()
        })

        animationFrameId = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        window.removeEventListener('resize', resizeCanvas)
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [variant])

  if (variant === 'particles') {
    return (
      <>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black" />
      </>
    )
  }

  // Default: Animated gradient mesh
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black" />
      
      {/* Animated orbs */}
      <div className="absolute inset-0">
        <div 
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
            top: '10%',
            left: '10%',
            animation: 'float 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            top: '60%',
            right: '10%',
            animation: 'float 25s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute rounded-full blur-3xl opacity-15"
          style={{
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'float 30s ease-in-out infinite'
          }}
        />
      </div>

      {/* Animated mesh gradient */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 800px 600px at 0% 0%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 800px 600px at 100% 100%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 1200px 800px at 50% 50%, rgba(15, 23, 42, 0.8) 0%, transparent 60%)
          `,
          backgroundSize: '100% 100%',
          animation: 'meshMove 15s ease-in-out infinite'
        }}
      />

      {/* Floating grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}
      />

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes meshMove {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  )
}

export default AnimatedBackground


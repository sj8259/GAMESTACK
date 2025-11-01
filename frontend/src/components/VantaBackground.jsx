import { useEffect, useRef } from 'react'

const VantaBackground = ({ options = {} }) => {
  const vantaRef = useRef(null)
  const vantaEffect = useRef(null)

  useEffect(() => {
    let mounted = true
    let retryCount = 0
    const maxRetries = 10

    const initVanta = () => {
      // Check if VANTA is loaded (from CDN in index.html)
      if (typeof window !== 'undefined' && window.VANTA && window.VANTA.RINGS && window.THREE) {
        if (vantaRef.current && mounted) {
          // Clean up previous effect if exists
          if (vantaEffect.current) {
            vantaEffect.current.destroy()
          }

          // Initialize Vanta RINGS effect
          vantaEffect.current = window.VANTA.RINGS({
            el: vantaRef.current,
            THREE: window.THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0x0a0a0a,
            color: 0x3b82f6,
            ...options
          })
        }
      } else if (retryCount < maxRetries) {
        // Retry after a short delay if VANTA not loaded yet
        retryCount++
        setTimeout(initVanta, 100)
      } else {
        console.warn('VANTA.RINGS not available. Make sure scripts are loaded in index.html')
      }
    }

    // Start initialization
    initVanta()

    return () => {
      mounted = false
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
        vantaEffect.current = null
      }
    }
  }, [])

  return <div ref={vantaRef} className="absolute inset-0" style={{ zIndex: 0 }} />
}

export default VantaBackground


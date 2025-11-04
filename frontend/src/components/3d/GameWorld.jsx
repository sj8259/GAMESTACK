import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import PlayerCharacter from './PlayerCharacter'

// Simple Player component - Using Baby Yoda model or fallback
function Player({ position = [0, 0, 0], rotation = [0, 0, 0], isCompleted = false }) {
  return (
    <PlayerCharacter
      position={position}
      rotation={rotation}
      isCompleted={isCompleted}
      useModel={true} // Enable GLTF model loading
      modelPath="/models/baby_yoda_free_3d_by_oscar_creativo/scene.gltf" // Baby Yoda model path
    />
  )
}

// Gem component
function Gem({ position = [0, 0.5, 0], collected = false }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current && !collected) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2
      meshRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.1
    }
  })

  if (collected) return null

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          emissive="#f59e0b"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Gem glow */}
      <mesh position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Collect effect */}
      <mesh position={[0, 0, 0]} scale={[2, 2, 2]}>
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          transparent
          opacity={0.05}
        />
      </mesh>
    </group>
  )
}

// Obstacle component
function Obstacle({ position = [0, 0.5, 0], type = 'wall' }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current && type === 'spike') {
      meshRef.current.rotation.y = state.clock.elapsedTime
    }
  })

  const getColor = () => {
    switch (type) {
      case 'wall': return '#6b7280'
      case 'pit': return '#374151'
      case 'spike': return '#dc2626'
      default: return '#6b7280'
    }
  }

  const getGeometry = () => {
    switch (type) {
      case 'spike':
        return <coneGeometry args={[0.4, 1, 8]} />
      case 'pit':
        return <cylinderGeometry args={[0.8, 0.8, 0.2]} />
      default:
        return <boxGeometry args={[1, 1, 1]} />
    }
  }

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        {getGeometry()}
        <meshStandardMaterial 
          color={getColor()} 
          emissive={type === 'spike' ? '#991b1b' : '#374151'}
          emissiveIntensity={type === 'spike' ? 0.2 : 0.1}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      {/* Add a subtle glow/shadow effect for walls */}
      {type === 'wall' && (
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[1.1, 0.1, 1.1]} />
          <meshStandardMaterial 
            color="#1f2937"
            transparent
            opacity={0.5}
          />
        </mesh>
      )}
    </group>
  )
}

// Ground component
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial 
        color="#1e293b" 
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

// Grid lines
function Grid() {
  const gridRef = useRef()
  
  useEffect(() => {
    if (gridRef.current) {
      const gridHelper = new THREE.GridHelper(20, 20, '#334155', '#334155')
      gridRef.current.add(gridHelper)
    }
  }, [])

  return <group ref={gridRef} />
}

// Main scene content
function SceneContent({ worldState, playerState, isCompleted }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[-5, 3, 5]} intensity={0.3} color="#8b5cf6" />
      <pointLight position={[5, 3, -5]} intensity={0.3} color="#06b6d4" />

      {/* Environment */}
      <Environment preset="night" />

      {/* Ground */}
      <Ground />
      <Grid />

      {/* Player */}
      <Player 
        position={[playerState.position.x, playerState.position.y, playerState.position.z]} 
        rotation={[0, playerState.rotation.y * Math.PI / 180, 0]}
        isCompleted={isCompleted}
      />

      {/* Gems */}
      {worldState.gems?.map((gem, index) => (
        <Gem 
          key={index} 
          position={[gem.position.x, gem.position.y, gem.position.z]} 
          collected={gem.collected} 
        />
      ))}

      {/* Obstacles */}
      {worldState.obstacles?.map((obstacle, index) => (
        <Obstacle 
          key={index} 
          position={[obstacle.position.x, obstacle.position.y, obstacle.position.z]} 
          type={obstacle.type} 
        />
      ))}

      {/* Success particles */}
      {isCompleted && (
        <group>
          {Array.from({ length: 20 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                (Math.random() - 0.5) * 4,
                Math.random() * 3,
                (Math.random() - 0.5) * 4
              ]}
            >
              <sphereGeometry args={[0.05]} />
              <meshStandardMaterial 
                color="#10b981" 
                emissive="#059669"
                emissiveIntensity={0.5}
              />
            </mesh>
          ))}
        </group>
      )}
    </>
  )
}

// Main GameWorld component
const GameWorld = ({ worldState, playerState, isCompleted }) => {
  
  if (!worldState || !playerState) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading 3D world...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ 
          position: [8, 6, 8], 
          fov: 60 
        }}
        gl={{ powerPreference: 'high-performance', antialias: true, alpha: false, preserveDrawingBuffer: false }}
        onCreated={(state) => {
          try {
            const gl = state.gl
            const canvas = gl?.domElement
            if (!canvas || !canvas.addEventListener) return
            const handleLost = (e) => { e.preventDefault() }
            const handleRestored = () => {
              try { gl.setSize(canvas.clientWidth, canvas.clientHeight, false) } catch {}
            }
            canvas.addEventListener('webglcontextlost', handleLost, false)
            canvas.addEventListener('webglcontextrestored', handleRestored, false)
          } catch {}
        }}
        shadows
        className="w-full h-full"
      >
        <SceneContent 
          worldState={worldState}
          playerState={playerState}
          isCompleted={isCompleted}
        />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={20}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          target={[playerState.position.x, 0, playerState.position.z]}
        />
      </Canvas>
    </div>
  )
}

export default GameWorld


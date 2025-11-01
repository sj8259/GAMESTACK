import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Sparkles, Stars, Trail, useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import PlayerCharacter from './PlayerCharacter'

// Simple Player component - Using Baby Yoda model or fallback
function Player({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <PlayerCharacter
      position={[position[0], position[1], position[2]]}
      rotation={rotation}
      isCompleted={false}
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
      meshRef.current.rotation.y = state.clock.elapsedTime
      meshRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1
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
          emissiveIntensity={0.6}
        />
      </mesh>
      
      {/* Gem glow */}
      <mesh position={[0, 0, 0]} scale={[1.3, 1.3, 1.3]}>
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Outer glow ring */}
      <mesh position={[0, 0.5, 0]} scale={[2, 1, 2]}>
        <torusGeometry args={[0.2, 0.05, 8, 16]} />
        <meshStandardMaterial 
          color="#f59e0b" 
          transparent
          opacity={0.4}
          emissive="#fbbf24"
          emissiveIntensity={0.3}
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
      meshRef.current.rotation.y = state.clock.elapsedTime * 2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.05
    }
  })

  const getColor = () => {
    switch (type) {
      case 'wall': return '#9ca3af'
      case 'pit': return '#4b5563'
      case 'spike': return '#ef4444'
      default: return '#9ca3af'
    }
  }

  const getEmissive = () => {
    switch (type) {
      case 'spike': return '#dc2626'
      case 'wall': return '#6b7280'
      default: return undefined
    }
  }

  const getGeometry = () => {
    switch (type) {
      case 'spike':
        return <coneGeometry args={[0.45, 1.2, 8]} />
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
          emissive={getEmissive()}
          emissiveIntensity={type === 'spike' ? 0.3 : 0.1}
        />
      </mesh>
      {type === 'wall' && (
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[1.1, 0.15, 1.1]} />
          <meshStandardMaterial 
            color="#4b5563"
            transparent
            opacity={0.6}
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
        color="#0f172a" 
        transparent
        opacity={0.9}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  )
}

// Grid lines
function Grid() {
  const gridHelper = useMemo(() => new THREE.GridHelper(20, 20, '#334155', '#334155'), [])
  
  return <primitive object={gridHelper} />
}

// Main scene component
function SceneContent() {
  // Demo world state for the preview - Simplified clean layout
  const demoWorld = {
    player: { position: [0, 0, 0], rotation: [0, 45, 0] },
    gems: [
      { position: [2, 0.5, 0], collected: false },
      { position: [0, 0.5, 2], collected: false },
      { position: [-2, 0.5, 0], collected: false },
    ],
    obstacles: [
      { position: [1, 0.5, 1], type: 'wall' },
      { position: [-1, 0.5, -1], type: 'wall' },
    ]
  }

  return (
    <>
      {/* Lighting - Enhanced for hero section */}
      <ambientLight intensity={0.8} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 5, 0]} intensity={1.0} color="#3b82f6" />
      <pointLight position={[-5, 3, 5]} intensity={0.6} color="#8b5cf6" />
      <pointLight position={[5, 3, -5]} intensity={0.5} color="#06b6d4" />

      {/* Environment */}
      <Environment preset="night" />

      {/* Ground */}
      <Ground />
      <Grid />

      {/* Player */}
      <Player 
        position={demoWorld.player.position} 
        rotation={demoWorld.player.rotation} 
      />

      {/* Gems */}
      {demoWorld.gems.map((gem, index) => (
        <Gem 
          key={index} 
          position={gem.position} 
          collected={gem.collected} 
        />
      ))}

      {/* Obstacles */}
      {demoWorld.obstacles.map((obstacle, index) => (
        <Obstacle 
          key={index} 
          position={obstacle.position} 
          type={obstacle.type} 
        />
      ))}

      {/* Decorative sparkles and stars */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
        <Sparkles count={40} scale={[6, 3, 6]} speed={0.3} size={1.5} color="#8b5cf6" />
      </Float>
      <Stars radius={30} depth={20} count={2000} factor={4} saturation={0} fade speed={0.5} />
    </>
  )
}

// Main Scene3D component
const Scene3D = ({ fullscreen = false }) => {
  return (
    <div className={fullscreen ? 'w-full h-full' : 'w-full h-full rounded-2xl overflow-hidden bg-slate-900'}>
      <Canvas
        camera={{ 
          position: [8, 7, 8], 
          fov: 60 
        }}
        shadows
        className={fullscreen ? 'w-full h-full' : 'rounded-2xl'}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <SceneContent />
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          minDistance={8}
          maxDistance={12}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  )
}

export default Scene3D


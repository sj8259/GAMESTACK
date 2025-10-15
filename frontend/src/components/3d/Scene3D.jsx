import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

// Player component
function Player({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Player body */}
      <mesh ref={meshRef} position={[0, 0.5, 0]}>
        <boxGeometry args={[0.8, 1, 0.4]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      {/* Player head */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.4]} />
        <meshStandardMaterial color="#60a5fa" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.15, 1.3, 0.25]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.15, 1.3, 0.25]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
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
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Gem glow */}
      <mesh position={[0, 0, 0]} scale={[1.2, 1.2, 1.2]}>
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  )
}

// Obstacle component
function Obstacle({ position = [0, 0.5, 0], type = 'wall' }) {
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
      default:
        return <boxGeometry args={[1, 1, 1]} />
    }
  }

  return (
    <mesh position={position}>
      {getGeometry()}
      <meshStandardMaterial color={getColor()} />
    </mesh>
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
        opacity={0.8}
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
  // Demo world state for the preview
  const demoWorld = {
    player: { position: [0, 0, 0], rotation: [0, 0, 0] },
    gems: [
      { position: [2, 0.5, 2], collected: false },
      { position: [-2, 0.5, -1], collected: false },
      { position: [1, 0.5, -3], collected: false },
    ],
    obstacles: [
      { position: [1, 0.5, 0], type: 'wall' },
      { position: [-1, 0.5, 2], type: 'spike' },
      { position: [0, 0.5, -2], type: 'wall' },
    ]
  }

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
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#3b82f6" />

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

      {/* Floating title */}
      <Text
        position={[0, 3, 0]}
        fontSize={1}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        GameStack
      </Text>
    </>
  )
}

// Main Scene3D component
const Scene3D = () => {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-900">
      <Canvas
        camera={{ 
          position: [8, 6, 8], 
          fov: 60 
        }}
        shadows
        className="rounded-2xl"
      >
        <SceneContent />
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={15}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}

export default Scene3D


import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

// GLTF Model Loader Component
function ModelLoader({ modelPath, position, rotation, isCompleted }) {
  const groupRef = useRef()
  const gltf = useGLTF(modelPath)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation[1]
    }
  })

  if (!gltf || !gltf.scene) {
    console.warn('GLTF scene not available for:', modelPath)
    return null
  }

  return (
    <group ref={groupRef} position={[position[0], position[1] + 1.0, position[2]]} rotation={rotation}>
      <primitive 
        object={gltf.scene.clone()} 
        scale={[0.3, 0.3, 0.3]} // Adjusted scale for Baby Yoda
      />
      {isCompleted && (
        <mesh position={[0, 0.5, 0]} scale={[2, 2, 2]}>
          <sphereGeometry args={[0.5]} />
          <meshStandardMaterial 
            color="#10b981" 
            transparent
            opacity={0.1}
          />
        </mesh>
      )}
    </group>
  )
}



// Player Character Component that can use either GLTF model or fallback to procedural
function PlayerCharacter({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  isCompleted = false,
  useModel = false,
  modelPath = '/models/robot.glb'
}) {
  const groupRef = useRef()
  const bodyRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation[1]
    }
    if (bodyRef.current && !isCompleted) {
      // Subtle idle animation
      const baseY = 0.5
      bodyRef.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 2) * 0.03
    }
  })

  const baseColor = isCompleted ? "#10b981" : "#3b82f6"
  const emissiveColor = isCompleted ? "#059669" : "#2563eb"
  const headColor = isCompleted ? "#34d399" : "#60a5fa"

  // Render procedural character component
  const ProceduralCharacter = () => (
    <group ref={groupRef} position={[position[0], position[1] + 1.0, position[2]]} rotation={rotation}>
      {/* Main body - torso */}
      <mesh ref={bodyRef} position={[0, 0.5, 0]}>
        <boxGeometry args={[0.8, 1, 0.6]} />
        <meshStandardMaterial 
          color={baseColor} 
          emissive={emissiveColor}
          emissiveIntensity={0.3}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[0.65, 0.65, 0.55]} />
        <meshStandardMaterial 
          color={headColor}
          emissive={emissiveColor}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.15, 1.35, 0.3]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial 
          color={isCompleted ? "#10b981" : "#06b6d4"} 
          emissive={isCompleted ? "#059669" : "#0891b2"}
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh position={[0.15, 1.35, 0.3]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial 
          color={isCompleted ? "#10b981" : "#06b6d4"} 
          emissive={isCompleted ? "#059669" : "#0891b2"}
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Left arm */}
      <mesh position={[-0.55, 0.6, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial 
          color={baseColor} 
          emissive={emissiveColor}
          emissiveIntensity={0.25}
        />
      </mesh>
      {/* Left shoulder */}
      <mesh position={[-0.55, 0.95, 0]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial 
          color={baseColor} 
          emissive={emissiveColor}
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Right arm */}
      <mesh position={[0.55, 0.6, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial 
          color={baseColor} 
          emissive={emissiveColor}
          emissiveIntensity={0.25}
        />
      </mesh>
      {/* Right shoulder */}
      <mesh position={[0.55, 0.95, 0]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial 
          color={baseColor} 
          emissive={emissiveColor}
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Left leg */}
      <mesh position={[-0.25, -0.15, 0]}>
        <boxGeometry args={[0.25, 0.5, 0.25]} />
        <meshStandardMaterial 
          color={baseColor} 
          emissive={emissiveColor}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Right leg */}
      <mesh position={[0.25, -0.15, 0]}>
        <boxGeometry args={[0.25, 0.5, 0.25]} />
        <meshStandardMaterial 
          color={baseColor} 
          emissive={emissiveColor}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Chest detail */}
      <mesh position={[0, 0.7, 0.32]}>
        <boxGeometry args={[0.4, 0.3, 0.1]} />
        <meshStandardMaterial 
          color={isCompleted ? "#10b981" : "#06b6d4"} 
          emissive={isCompleted ? "#059669" : "#0891b2"}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Glow effect */}
      <mesh position={[0, 0.5, 0]} scale={[1.15, 1.15, 1.15]}>
        <boxGeometry args={[0.8, 1, 0.6]} />
        <meshStandardMaterial 
          color={baseColor} 
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Success glow effect */}
      {isCompleted && (
        <mesh position={[0, 0.5, 0]} scale={[2, 2, 2]}>
          <sphereGeometry args={[0.5]} />
          <meshStandardMaterial 
            color="#10b981" 
            transparent
            opacity={0.1}
          />
        </mesh>
      )}
    </group>
  )

  // If useModel is true, try to use GLTF model with fallback
  if (useModel) {
    return (
      <Suspense fallback={<ProceduralCharacter />}>
        <ModelLoader 
          modelPath={modelPath}
          position={position}
          rotation={rotation}
          isCompleted={isCompleted}
        />
      </Suspense>
    )
  }

  // Default: Use procedural character
  return <ProceduralCharacter />
}

export default PlayerCharacter


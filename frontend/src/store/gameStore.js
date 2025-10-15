import { create } from 'zustand'

const useGameStore = create((set, get) => ({
  // Game state
  currentLesson: null,
  isRunning: false,
  isCompleted: false,
  error: null,
  playerState: {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    gemsCollected: 0,
    moves: 0
  },
  worldState: {
    gems: [],
    obstacles: [],
    player: {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 }
    }
  },
  code: '',
  executionHistory: [],
  actionQueue: [],
  isQueueRunning: false,
  stepDelayMs: 140,
  
  // Game actions
  setCurrentLesson: (lesson) => {
    set({
      currentLesson: lesson,
      worldState: lesson?.worldState || {
        gems: [],
        obstacles: [],
        player: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
      },
      playerState: {
        position: lesson?.worldState?.player?.position || { x: 0, y: 0, z: 0 },
        rotation: lesson?.worldState?.player?.rotation || { x: 0, y: 0, z: 0 },
        gemsCollected: 0,
        moves: 0
      },
      code: lesson?.startingCode || '# Write your code here\n# Available functions: move(), turnLeft(), turnRight(), pickGem()\n\n',
      isCompleted: false,
      error: null,
      executionHistory: []
    })
  },

  updatePlayerState: (updates) => {
    set(state => ({
      playerState: { ...state.playerState, ...updates }
    }))
  },

  updateWorldState: (updates) => {
    set(state => ({
      worldState: { ...state.worldState, ...updates }
    }))
  },

  setCode: (code) => {
    set({ code })
  },

  startExecution: () => {
    set({ isRunning: true, error: null })
  },

  stopExecution: () => {
    set({ isRunning: false })
  },

  addExecutionStep: (step) => {
    set(state => ({
      executionHistory: [...state.executionHistory, step]
    }))
  },

  setExecutionError: (error) => {
    set({ error, isRunning: false })
  },

  completeLesson: () => {
    set({ isCompleted: true, isRunning: false })
  },

  resetGame: () => {
    const { currentLesson } = get()
    if (currentLesson) {
      set({
        playerState: {
          position: currentLesson.worldState?.player?.position || { x: 0, y: 0, z: 0 },
          rotation: currentLesson.worldState?.player?.rotation || { x: 0, y: 0, z: 0 },
          gemsCollected: 0,
          moves: 0
        },
        worldState: currentLesson.worldState || {
          gems: [],
          obstacles: [],
          player: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
        },
        isCompleted: false,
        error: null,
        isRunning: false,
        executionHistory: [],
        actionQueue: [],
        isQueueRunning: false
      })
    }
  },

  // Queue system
  enqueueAction: (fn) => {
    set(state => ({ actionQueue: [...state.actionQueue, fn] }))
  },
  runQueue: async () => {
    const { actionQueue, stepDelayMs } = get()
    if (!actionQueue.length) return
    set({ isQueueRunning: true })
    for (const fn of actionQueue) {
      try { await fn() } catch {}
      await new Promise(r => setTimeout(r, stepDelayMs))
    }
    set({ actionQueue: [], isQueueRunning: false })
  },

  // Player movement functions (to be called by code execution)
  move: async () => {
    const state = get()
    const { playerState } = state
    const currentRotation = playerState.rotation.y
    
    // Calculate new position based on current rotation
    const radians = (currentRotation * Math.PI) / 180
    const newPosition = {
      x: playerState.position.x + Math.sin(radians),
      y: playerState.position.y,
      z: playerState.position.z + Math.cos(radians)
    }
    
    // Check for collisions with obstacles
    const hasCollision = state.worldState.obstacles.some(obstacle => 
      Math.abs(obstacle.position.x - newPosition.x) < 0.5 &&
      Math.abs(obstacle.position.z - newPosition.z) < 0.5
    )
    
    if (hasCollision) {
      return false // Movement blocked
    }
    
    // Check for gems at new position
    const gemIndex = state.worldState.gems.findIndex(gem => 
      !gem.collected &&
      Math.abs(gem.position.x - newPosition.x) < 0.5 &&
      Math.abs(gem.position.z - newPosition.z) < 0.5
    )
    
    if (gemIndex !== -1) {
      // Collect gem
      const updatedGems = [...state.worldState.gems]
      updatedGems[gemIndex] = { ...updatedGems[gemIndex], collected: true }
      
      set(state => ({
        playerState: {
          ...state.playerState,
          position: newPosition,
          gemsCollected: state.playerState.gemsCollected + 1,
          moves: state.playerState.moves + 1
        },
        worldState: {
          ...state.worldState,
          gems: updatedGems
        }
      }))
    } else {
      set(state => ({
        playerState: {
          ...state.playerState,
          position: newPosition,
          moves: state.playerState.moves + 1
        }
      }))
    }
    
    return true // Movement successful
  },

  // Move one step backward relative to current facing
  moveBackward: async () => {
    const state = get()
    const { playerState } = state
    const currentRotation = playerState.rotation.y
    const radians = (currentRotation * Math.PI) / 180
    const newPosition = {
      x: playerState.position.x - Math.sin(radians),
      y: playerState.position.y,
      z: playerState.position.z - Math.cos(radians)
    }

    const hasCollision = state.worldState.obstacles.some(obstacle => 
      Math.abs(obstacle.position.x - newPosition.x) < 0.5 &&
      Math.abs(obstacle.position.z - newPosition.z) < 0.5
    )
    if (hasCollision) return false

    set(state => ({
      playerState: {
        ...state.playerState,
        position: newPosition,
        moves: state.playerState.moves + 1
      }
    }))
    return true
  },

  turnLeft: async () => {
    set(state => ({
      playerState: {
        ...state.playerState,
        rotation: {
          ...state.playerState.rotation,
          y: (state.playerState.rotation.y - 90) % 360
        },
        moves: state.playerState.moves + 1
      }
    }))
  },

  turnRight: async () => {
    set(state => ({
      playerState: {
        ...state.playerState,
        rotation: {
          ...state.playerState.rotation,
          y: (state.playerState.rotation.y + 90) % 360
        },
        moves: state.playerState.moves + 1
      }
    }))
  },

  pickGem: async () => {
    const state = get()
    const { playerState, worldState } = state
    
    // Find gem at current position
    const gemIndex = worldState.gems.findIndex(gem => 
      !gem.collected &&
      Math.abs(gem.position.x - playerState.position.x) < 0.5 &&
      Math.abs(gem.position.z - playerState.position.z) < 0.5
    )
    
    if (gemIndex !== -1) {
      const updatedGems = [...worldState.gems]
      updatedGems[gemIndex] = { ...updatedGems[gemIndex], collected: true }
      
      set(state => ({
        playerState: {
          ...state.playerState,
          gemsCollected: state.playerState.gemsCollected + 1,
          moves: state.playerState.moves + 1
        },
        worldState: {
          ...state.worldState,
          gems: updatedGems
        }
      }))
      
      return true
    }
    
    return false
  },

  // Rotate 180 degrees
  turnAround: async () => {
    set(state => ({
      playerState: {
        ...state.playerState,
        rotation: {
          ...state.playerState.rotation,
          y: (state.playerState.rotation.y + 180) % 360
        },
        moves: state.playerState.moves + 1
      }
    }))
  },

  // Face a cardinal direction: 'north' (0), 'east'(90), 'south'(180), 'west'(270)
  face: async (direction) => {
    const dirs = { north: 0, east: 90, south: 180, west: 270 }
    const target = dirs[(direction || '').toLowerCase()]
    if (typeof target !== 'number') return false
    set(state => ({
      playerState: {
        ...state.playerState,
        rotation: { ...state.playerState.rotation, y: target },
        moves: state.playerState.moves + 1
      }
    }))
    return true
  },

  // Move N steps forward (stops early if blocked); returns steps moved
  moveSteps: async (steps = 1) => {
    let moved = 0
    for (let i = 0; i < Math.max(0, Math.floor(steps)); i++) {
      // await each move to animate
      // eslint-disable-next-line no-await-in-loop
      if (await get().move()) moved++
      else break
    }
    return moved
  },

  // Return current direction as a string
  getDirection: () => {
    const y = ((get().playerState.rotation.y % 360) + 360) % 360
    if (y >= 315 || y < 45) return 'north'
    if (y >= 45 && y < 135) return 'east'
    if (y >= 135 && y < 225) return 'south'
    return 'west'
  }
}))

export default useGameStore


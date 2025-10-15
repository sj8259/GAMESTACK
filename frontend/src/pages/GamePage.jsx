import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, RotateCcw, Trophy, Target, Zap } from 'lucide-react'
import Split from 'react-split'
import { executePythonCode, initializePyodide } from '../utils/codeExecutor'
import useGameStore from '../store/gameStore'
import api from '../utils/api'
import CodeEditor from '../components/editor/CodeEditor'
import GameWorld from '../components/3d/GameWorld'

const GamePage = () => {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const [lesson, setLesson] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionError, setExecutionError] = useState(null)
  const [pyReady, setPyReady] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)

  const {
    setCurrentLesson,
    playerState,
    worldState,
    resetGame,
    enqueueAction,
    runQueue
  } = useGameStore()


  // Load lesson data
  useEffect(() => {
    // Preload Pyodide so the first Run is instant and errors surface early
    initializePyodide().then(() => setPyReady(true)).catch(err => {
      console.error('Pyodide init failed:', err)
      setExecutionError('Python runtime failed to load. Check your internet connection and try again.')
    })

    const loadLesson = async () => {
      try {
        const response = await api.get(`/lessons/${lessonId}`)
        const lessonData = response.data.lesson
        
        setLesson(lessonData)
        setCurrentLesson(lessonData)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to load lesson:', error)
        navigate('/levels')
      }
    }

    if (lessonId) {
      loadLesson()
    }
  }, [lessonId, navigate, setCurrentLesson])

  // Check if lesson is completed
  useEffect(() => {
    const completeLesson = async () => {
      try {
        await api.post(`/lessons/${lessonId}/complete`, {
          score: 100,
          moves: playerState.moves
        })
      } catch (error) {
        console.error('Failed to complete lesson:', error)
      }
    }

    if (lesson && playerState && worldState && lesson.targetState) {
      const target = lesson.targetState
      const player = playerState
      
      // Check position
      const positionMatch = 
        Math.abs(player.position.x - target.playerPosition.x) < 0.1 &&
        Math.abs(player.position.z - target.playerPosition.z) < 0.1
      
      // Check gems collected
      const gemsMatch = player.gemsCollected >= target.gemsCollected
      
      if (positionMatch && gemsMatch && !isCompleted) {
        setIsCompleted(true)
        setShowCompletion(true)
        completeLesson()
      }
    }
  }, [playerState, worldState, lesson, isCompleted, lessonId])

  const handleRunCode = async (code) => {
    // Always reset to the lesson's initial state before each run
    resetGame()
    setIsExecuting(true)
    setExecutionError(null)

    try {
      // Create game functions object
      const gameFunctions = {
        move: () => enqueueAction(() => useGameStore.getState().move()),
        moveBackward: () => enqueueAction(() => useGameStore.getState().moveBackward()),
        turnLeft: () => enqueueAction(() => useGameStore.getState().turnLeft()),
        turnRight: () => enqueueAction(() => useGameStore.getState().turnRight()),
        turnAround: () => enqueueAction(() => useGameStore.getState().turnAround()),
        face: (dir) => enqueueAction(() => useGameStore.getState().face(dir)),
        moveSteps: (n) => enqueueAction(() => useGameStore.getState().moveSteps(n)),
        pickGem: () => enqueueAction(() => useGameStore.getState().pickGem()),
        getPosition: () => {
          const state = useGameStore.getState()
          const pos = state.playerState?.position || { x: 0, z: 0 }
          return [pos.x, pos.z]
        },
        getGemsCollected: () => useGameStore.getState().playerState?.gemsCollected || 0,
        getDirection: () => useGameStore.getState().getDirection()
      }

      // Execute the Python code
      const result = await executePythonCode(code, gameFunctions)
      await runQueue()

      if (!result.success) {
        setExecutionError(result.error)
      }
    } catch (error) {
      console.error('Code execution error:', error)
      setExecutionError(error.message || 'Code execution failed')
    } finally {
      setIsExecuting(false)
    }
  }

  const handleReset = () => {
    resetGame()
    setIsCompleted(false)
    setExecutionError(null)
    setShowCompletion(false)
  }

  const handleNextLesson = () => {
    // Navigate to next lesson or back to levels
    navigate('/levels')
  }

  if (isLoading || !lesson || !worldState || !playerState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading lesson...</p>
          {!pyReady && <p className="text-slate-500 text-sm mt-2">Preparing Python runtime...</p>}
          {!lesson && <p className="text-slate-500 text-sm mt-2">Loading lesson data...</p>}
          {!worldState && <p className="text-slate-500 text-sm mt-2">Initializing world...</p>}
          {!playerState && <p className="text-slate-500 text-sm mt-2">Setting up player...</p>}
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400">Lesson not found</p>
          <button onClick={() => navigate('/levels')} className="btn-primary mt-4">
            Back to Levels
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/levels')}
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Levels</span>
            </button>
            
            <div className="h-6 w-px bg-slate-600"></div>
            
            <div>
              <h1 className="text-xl font-bold text-white">{lesson.title}</h1>
              <p className="text-sm text-slate-400">Level {lesson.level} • {lesson.difficulty}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Stats */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-yellow-500" />
                <span className="text-slate-300">{playerState?.gemsCollected || 0}/{lesson?.worldState?.gems?.length || 0}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-slate-300">{playerState?.moves || 0}</span>
              </div>
              {isCompleted && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-400 font-medium">Completed!</span>
                </div>
              )}
            </div>

            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Resizable panes */}
      <div className="h-[calc(100vh-80px)] px-6 py-6">
        <Split
          className="flex h-full gap-4"
          sizes={[70, 30]}
          minSize={[300, 280]}
          gutterSize={8}
        >
          {/* 3D World */}
          <div className="rounded-lg overflow-hidden bg-slate-800/30 border border-slate-700/50">
            <GameWorld 
              worldState={worldState}
              playerState={playerState}
              isCompleted={isCompleted}
            />
          </div>

          {/* Right Panel - vertical split */}
          <Split
            className="flex flex-col border-l border-slate-700/50 bg-slate-800/30 rounded-lg"
            direction="vertical"
            sizes={[45, 55]}
            minSize={160}
            gutterSize={8}
          >
          {/* Instructions */}
          <div className="p-6 border-b border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-3">Instructions</h3>
            <p className="text-slate-300 text-sm mb-4">{lesson.instructions}</p>
            
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Target className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm">
                  Collect {lesson?.targetState?.gemsCollected || 0} gems
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Trophy className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm">
                  Reach position ({lesson?.targetState?.playerPosition?.x || 0}, {lesson?.targetState?.playerPosition?.z || 0})
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Zap className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm">
                  Maximum {lesson?.targetState?.maxMoves || 10} moves
                </span>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 min-h-0 border-t border-slate-700/50">
            <CodeEditor
              onRunCode={handleRunCode}
              isRunning={isExecuting}
              error={executionError}
              isCompleted={isCompleted}
            />
          </div>
          </Split>
        </Split>
      </div>

      {/* Completion Modal */}
      {showCompletion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-8 max-w-md w-full mx-4 border border-slate-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Congratulations!</h2>
              <p className="text-slate-300 mb-6">{lesson?.successMessage || 'Great job!'}</p>
              
              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-slate-400">Gems Collected</div>
                    <div className="text-white font-semibold">{playerState?.gemsCollected || 0}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Moves Used</div>
                    <div className="text-white font-semibold">{playerState?.moves || 0}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleNextLesson}
                  className="flex-1 btn-primary"
                >
                  Next Lesson
                </button>
                <button
                  onClick={() => setShowCompletion(false)}
                  className="flex-1 btn-secondary"
                >
                  Continue Playing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GamePage


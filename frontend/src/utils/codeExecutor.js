// Python code execution using Pyodide
let pyodide = null
let isInitialized = false

// Initialize Pyodide
export const initializePyodide = async () => {
  if (isInitialized && pyodide) {
    return pyodide
  }

  try {
    // Load Pyodide
    const { loadPyodide } = await import('pyodide')
    
    // Try CDN first; if it fails (e.g., blocked), fall back to local node_modules
    try {
      pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.28.3/full/',
        fullStdLib: false
      })
    } catch (cdnErr) {
      console.warn('CDN Pyodide failed, falling back to local assets:', cdnErr)
      const localBase = new URL('/node_modules/pyodide/', window.location.origin).toString()
      pyodide = await loadPyodide({
        indexURL: localBase,
        fullStdLib: false
      })
    }

    // Set up the Python environment with game functions
    await setupPythonEnvironment(pyodide)
    
    isInitialized = true
    return pyodide
  } catch (error) {
    console.error('Failed to initialize Pyodide:', error)
    throw error
  }
}

// Set up Python environment with game functions
const setupPythonEnvironment = async (pyodide) => {
  // Make game functions available in Python
  pyodide.runPython(`
    import sys
    from js import window
    
    # Game state variables
    game_state = {
        'moves': 0,
        'max_moves': 100,
        'error': None
    }
    
    def move():
        """Move the player forward in the current direction"""
        try:
            result = window.gameFunctions.move()
            if result:
                game_state['moves'] += 1
                return True
            else:
                return False
        except Exception as e:
            game_state['error'] = str(e)
            raise e
    
    def turn_left():
        """Turn the player 90 degrees to the left"""
        try:
            window.gameFunctions.turnLeft()
            game_state['moves'] += 1
        except Exception as e:
            game_state['error'] = str(e)
            raise e
    
    def turn_right():
        """Turn the player 90 degrees to the right"""
        try:
            window.gameFunctions.turnRight()
            game_state['moves'] += 1
        except Exception as e:
            game_state['error'] = str(e)
            raise e
    
    def pick_gem():
        """Pick up a gem at the current position"""
        try:
            result = window.gameFunctions.pickGem()
            return result
        except Exception as e:
            game_state['error'] = str(e)
            raise e

    def move_backward():
        """Move the player one step backward"""
        try:
            result = window.gameFunctions.moveBackward()
            if result:
                game_state['moves'] += 1
                return True
            else:
                return False
        except Exception as e:
            game_state['error'] = str(e)
            raise e

    def turn_around():
        """Turn the player 180 degrees"""
        try:
            window.gameFunctions.turnAround()
            game_state['moves'] += 1
        except Exception as e:
            game_state['error'] = str(e)
            raise e

    def face(direction: str):
        """Face a cardinal direction: 'north', 'east', 'south', 'west'"""
        try:
            return bool(window.gameFunctions.face(direction))
        except Exception as e:
            game_state['error'] = str(e)
            raise e

    def move_steps(n: int):
        """Move n steps forward; returns steps actually moved"""
        try:
            return int(window.gameFunctions.moveSteps(int(n)))
        except Exception as e:
            game_state['error'] = str(e)
            raise e

    def get_direction():
        """Get current facing direction as a string"""
        return window.gameFunctions.getDirection()
    
    def get_moves():
        """Get the current number of moves"""
        return game_state['moves']
    
    def get_position():
        """Get the current player position"""
        return window.gameFunctions.getPosition()
    
    def get_gems_collected():
        """Get the number of gems collected"""
        return window.gameFunctions.getGemsCollected()
    
    # Make functions available globally
    globals()['move'] = move
    globals()['turn_left'] = turn_left
    globals()['turn_right'] = turn_right
    globals()['pick_gem'] = pick_gem
    globals()['move_backward'] = move_backward
    globals()['turn_around'] = turn_around
    globals()['face'] = face
    globals()['move_steps'] = move_steps
    globals()['get_moves'] = get_moves
    globals()['get_position'] = get_position
    globals()['get_direction'] = get_direction
    globals()['get_gems_collected'] = get_gems_collected

    # CodeCombat-style hero API aliases
    class _Hero:
        def moveRight(self, steps: int = 1):
            face('east')
            return move_steps(steps)

        def moveLeft(self, steps: int = 1):
            face('west')
            return move_steps(steps)

        def moveUp(self, steps: int = 1):
            face('north')
            return move_steps(steps)

        def moveDown(self, steps: int = 1):
            face('south')
            return move_steps(steps)

        def moveXY(self, x: int, z: int):
            # Naive grid movement: face along x then z
            pos = get_position()
            if x > pos[0]: face('east'); move_steps(x - pos[0])
            if x < pos[0]: face('west'); move_steps(pos[0] - x)
            pos = get_position()
            if z > pos[1]: face('north'); move_steps(z - pos[1])
            if z < pos[1]: face('south'); move_steps(pos[1] - z)
            return get_position()

        def say(self, message):
            # Simple debug output to browser console
            window.console.log(f"HERO: {message}")

    hero = _Hero()
    globals()['hero'] = hero

    # Directional convenience functions
    def move_right(n: int = 1):
        return hero.moveRight(n)
    def move_left(n: int = 1):
        return hero.moveLeft(n)
    def move_up(n: int = 1):
        return hero.moveUp(n)
    def move_down(n: int = 1):
        return hero.moveDown(n)
    globals()['move_right'] = move_right
    globals()['move_left'] = move_left
    globals()['move_up'] = move_up
    globals()['move_down'] = move_down
  `)
}

// Execute Python code
export const executePythonCode = async (code, gameFunctions) => {
  try {
    if (!pyodide || !isInitialized) {
      await initializePyodide()
    }

    // Ensure the Python helper environment is present before every run
    await setupPythonEnvironment(pyodide)

    // Set up game functions in global scope
    window.gameFunctions = gameFunctions

    // Reset game state
    pyodide.runPython(`
      game_state['moves'] = 0
      game_state['error'] = None
    `)

    // Execute the user's code
    const result = pyodide.runPython(code)
    
    return {
      success: true,
      result,
      moves: pyodide.globals.get('game_state').toJs().moves,
      error: null
    }
  } catch (error) {
    console.error('Code execution error:', error)
    
    return {
      success: false,
      result: null,
      moves: 0,
      error: error.message || 'Code execution failed'
    }
  }
}

// Validate Python code syntax
export const validatePythonCode = async (code) => {
  try {
    if (!pyodide || !isInitialized) {
      await initializePyodide()
    }

    // Try to compile the code
    pyodide.runPython(`compile('''${code}''', '<string>', 'exec')`)
    
    return {
      valid: true,
      error: null
    }
  } catch (error) {
    return {
      valid: false,
      error: error.message
    }
  }
}

// Get available functions for code completion
export const getAvailableFunctions = () => {
  return [
    {
      name: 'move()',
      description: 'Move the player forward in the current direction',
      category: 'Movement'
    },
    {
      name: 'turn_left()',
      description: 'Turn the player 90 degrees to the left',
      category: 'Movement'
    },
    {
      name: 'turn_right()',
      description: 'Turn the player 90 degrees to the right',
      category: 'Movement'
    },
    {
      name: 'pick_gem()',
      description: 'Pick up a gem at the current position',
      category: 'Actions'
    },
    {
      name: 'get_moves()',
      description: 'Get the current number of moves',
      category: 'Info'
    },
    {
      name: 'get_position()',
      description: 'Get the current player position',
      category: 'Info'
    },
    {
      name: 'get_gems_collected()',
      description: 'Get the number of gems collected',
      category: 'Info'
    }
  ]
}


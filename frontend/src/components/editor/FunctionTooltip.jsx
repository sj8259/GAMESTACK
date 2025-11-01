import { useState } from 'react'

const FunctionTooltip = ({ functionName, description, parameters, returnValue, category, children }) => {
  const [isVisible, setIsVisible] = useState(false)

  // Function definitions
  const functionInfo = {
    'move()': {
      description: 'Move the player forward one step in the current direction',
      parameters: [],
      returnValue: 'bool - True if move was successful, False if blocked',
      category: 'Movement'
    },
    'move_backward()': {
      description: 'Move the player backward one step',
      parameters: [],
      returnValue: 'bool - True if move was successful, False if blocked',
      category: 'Movement'
    },
    'turn_left()': {
      description: 'Turn the player 90 degrees to the left (counter-clockwise)',
      parameters: [],
      returnValue: 'None',
      category: 'Movement'
    },
    'turn_right()': {
      description: 'Turn the player 90 degrees to the right (clockwise)',
      parameters: [],
      returnValue: 'None',
      category: 'Movement'
    },
    'turn_around()': {
      description: 'Turn the player 180 degrees (face opposite direction)',
      parameters: [],
      returnValue: 'None',
      category: 'Movement'
    },
    'move_steps(n)': {
      description: 'Move the player forward N steps in the current direction',
      parameters: ['n: int - Number of steps to move'],
      returnValue: 'int - Number of steps actually moved (may be less if blocked)',
      category: 'Movement'
    },
    'face(dir)': {
      description: 'Make the player face a specific cardinal direction',
      parameters: ["dir: str - Direction: 'north', 'east', 'south', or 'west'"],
      returnValue: 'bool - True if facing was successful',
      category: 'Movement'
    },
    'pick_gem()': {
      description: 'Pick up a gem at the current position if one exists',
      parameters: [],
      returnValue: 'bool - True if gem was collected, False if no gem present',
      category: 'Action'
    },
    'get_position()': {
      description: 'Get the current position of the player',
      parameters: [],
      returnValue: 'tuple - (x, z) coordinates of player position',
      category: 'Information'
    },
    'get_direction()': {
      description: 'Get the current facing direction of the player',
      parameters: [],
      returnValue: "str - Current direction: 'north', 'east', 'south', or 'west'",
      category: 'Information'
    },
    'hero.moveRight(n)': {
      description: 'Face east and move the hero N steps to the right',
      parameters: ['n: int - Number of steps to move (default: 1)'],
      returnValue: 'int - Number of steps actually moved',
      category: 'Hero API'
    },
    'hero.moveLeft(n)': {
      description: 'Face west and move the hero N steps to the left',
      parameters: ['n: int - Number of steps to move (default: 1)'],
      returnValue: 'int - Number of steps actually moved',
      category: 'Hero API'
    },
    'hero.moveUp(n)': {
      description: 'Face north and move the hero N steps upward',
      parameters: ['n: int - Number of steps to move (default: 1)'],
      returnValue: 'int - Number of steps actually moved',
      category: 'Hero API'
    },
    'hero.moveDown(n)': {
      description: 'Face south and move the hero N steps downward',
      parameters: ['n: int - Number of steps to move (default: 1)'],
      returnValue: 'int - Number of steps actually moved',
      category: 'Hero API'
    },
    'hero.moveXY(x,z)': {
      description: 'Move the hero to specific X and Z coordinates (naive pathfinding)',
      parameters: ['x: int - Target X coordinate', 'z: int - Target Z coordinate'],
      returnValue: 'tuple - Final (x, z) position after movement',
      category: 'Hero API'
    }
  }

  const info = functionInfo[functionName] || {
    description: description || 'No description available',
    parameters: parameters || [],
    returnValue: returnValue || 'None',
    category: category || 'Unknown'
  }

  const categoryColors = {
    'Movement': {
      container: 'border-blue-500 bg-blue-900',
      badge: 'border-blue-500 bg-blue-900',
      border: 'border-blue-700'
    },
    'Action': {
      container: 'border-green-500 bg-green-900',
      badge: 'border-green-500 bg-green-900',
      border: 'border-green-700'
    },
    'Information': {
      container: 'border-purple-500 bg-purple-900',
      badge: 'border-purple-500 bg-purple-900',
      border: 'border-purple-700'
    },
    'Hero API': {
      container: 'border-indigo-500 bg-indigo-900',
      badge: 'border-indigo-500 bg-indigo-900',
      border: 'border-indigo-700'
    },
    'Unknown': {
      container: 'border-slate-500 bg-slate-900',
      badge: 'border-slate-500 bg-slate-900',
      border: 'border-slate-700'
    }
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 w-80 ${categoryColors[info.category].container} border-2 rounded-sm p-4 shadow-lg shadow-black/80`}>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className={`w-3 h-3 ${categoryColors[info.category].container} border-r-2 border-b-2 transform rotate-45`}></div>
          </div>
          
          {/* Header */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <code className="text-blue-300 font-mono font-bold text-sm">{functionName}</code>
              <span className={`text-xs px-2 py-1 rounded border ${categoryColors[info.category].badge}`}>
                {info.category}
              </span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">{info.description}</p>
          </div>

          {/* Parameters */}
          {info.parameters && info.parameters.length > 0 && (
            <div className={`mb-3 border-t ${categoryColors[info.category].border} pt-3`}>
              <h4 className="text-xs font-semibold text-blue-300 mb-2 uppercase tracking-wide">Parameters</h4>
              <ul className="space-y-1">
                {info.parameters.map((param, idx) => (
                  <li key={idx} className="text-xs text-blue-200 font-mono">
                    • {param}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Return Value */}
          {info.returnValue && info.returnValue !== 'None' && (
            <div className={`border-t ${categoryColors[info.category].border} pt-3`}>
              <h4 className="text-xs font-semibold text-blue-300 mb-2 uppercase tracking-wide">Returns</h4>
              <p className="text-xs text-blue-200 font-mono">{info.returnValue}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FunctionTooltip


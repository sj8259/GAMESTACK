import { useRef, useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import { Play, RotateCcw, HelpCircle, CheckCircle, XCircle } from 'lucide-react'
import useGameStore from '../../store/gameStore'

const CodeEditor = ({ onCodeChange, onRunCode, isRunning, error, isCompleted }) => {
  const editorRef = useRef(null)
  const [editorValue, setEditorValue] = useState('')
  const { code, setCode } = useGameStore()

  useEffect(() => {
    if (code) {
      setEditorValue(code)
    }
  }, [code])

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor

    // Ensure a Python language exists; some Monaco builds don't bundle it
    try {
      const hasPython = monaco.languages
        .getLanguages()
        .some(l => l.id === 'python')

      if (!hasPython) {
        // Register a minimal Python language to avoid crashes
        monaco.languages.register({ id: 'python' })
      }

      // Configure Python diagnostics if available in this build
      if (monaco.languages.python && monaco.languages.python.pythonDefaults?.setDiagnosticsOptions) {
        monaco.languages.python.pythonDefaults.setDiagnosticsOptions({
          noSyntaxValidation: false,
          noSemanticValidation: false,
          noSuggestionDiagnostics: true,
        })
      }
    } catch (e) {
      // Silently ignore if language configuration is unavailable
      // Editor will still function without pythonDefaults
    }

    // Add custom completions for game functions
    monaco.languages.registerCompletionItemProvider('python', {
      provideCompletionItems: () => {
        const suggestions = [
          {
            label: 'move',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'move()',
            documentation: 'Move the player forward in the current direction',
            detail: 'Game Function'
          },
          {
            label: 'move_backward',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'move_backward()',
            documentation: 'Move the player one step backward',
            detail: 'Game Function'
          },
          {
            label: 'turn_left',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'turn_left()',
            documentation: 'Turn the player 90 degrees to the left',
            detail: 'Game Function'
          },
          {
            label: 'turn_right',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'turn_right()',
            documentation: 'Turn the player 90 degrees to the right',
            detail: 'Game Function'
          },
          {
            label: 'turn_around',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'turn_around()',
            documentation: 'Turn the player 180 degrees',
            detail: 'Game Function'
          },
          {
            label: 'face',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "face('north')",
            documentation: "Face 'north' | 'east' | 'south' | 'west'",
            detail: 'Game Function'
          },
          {
            label: 'move_steps',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'move_steps(3)',
            documentation: 'Move N steps forward; returns steps moved',
            detail: 'Game Function'
          },
          {
            label: 'pick_gem',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'pick_gem()',
            documentation: 'Pick up a gem at the current position',
            detail: 'Game Function'
          },
          {
            label: 'get_moves',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'get_moves()',
            documentation: 'Get the current number of moves',
            detail: 'Game Function'
          },
          {
            label: 'get_position',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'get_position()',
            documentation: 'Get the current player position (x, z)',
            detail: 'Game Function'
          },
          {
            label: 'get_direction',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'get_direction()',
            documentation: 'Get the current facing direction',
            detail: 'Game Function'
          },
          // Hero (CodeCombat-style) helpers
          {
            label: 'hero.moveRight',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'hero.moveRight(3)',
            documentation: 'Face east and move N steps',
            detail: 'Hero API'
          },
          {
            label: 'hero.moveLeft',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'hero.moveLeft(3)',
            documentation: 'Face west and move N steps',
            detail: 'Hero API'
          },
          {
            label: 'hero.moveUp',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'hero.moveUp(3)',
            documentation: 'Face north and move N steps',
            detail: 'Hero API'
          },
          {
            label: 'hero.moveDown',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'hero.moveDown(3)',
            documentation: 'Face south and move N steps',
            detail: 'Hero API'
          },
          {
            label: 'hero.moveXY',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'hero.moveXY(2, 3)',
            documentation: 'Move to grid (x, z) naively',
            detail: 'Hero API'
          },
          {
            label: 'get_gems_collected',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'get_gems_collected()',
            documentation: 'Get the number of gems collected',
            detail: 'Game Function'
          }
        ]

        return { suggestions }
      }
    })

    // Configure editor theme and options
    monaco.editor.defineTheme('gamestack-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
        { token: 'keyword', foreground: '3b82f6', fontStyle: 'bold' },
        { token: 'string', foreground: '10b981' },
        { token: 'number', foreground: 'f59e0b' },
        { token: 'function', foreground: '8b5cf6' },
      ],
      colors: {
        'editor.background': '#0f172a',
        'editor.foreground': '#f1f5f9',
        'editorLineNumber.foreground': '#64748b',
        'editorLineNumber.activeForeground': '#94a3b8',
        'editor.selectionBackground': '#3b82f620',
        'editor.selectionHighlightBackground': '#3b82f610',
        'editorCursor.foreground': '#3b82f6',
        'editor.lineHighlightBackground': '#1e293b30',
        'editorIndentGuide.background': '#334155',
        'editorIndentGuide.activeBackground': '#475569',
      }
    })

    monaco.editor.setTheme('gamestack-dark')
  }

  const handleEditorChange = (value) => {
    setEditorValue(value || '')
    setCode(value || '')
    if (onCodeChange) {
      onCodeChange(value || '')
    }
  }

  const handleRunCode = () => {
    if (onRunCode) {
      onRunCode(editorValue)
    }
  }

  const handleReset = () => {
    const { currentLesson } = useGameStore.getState()
    const resetCode = currentLesson?.startingCode || '# Write your code here\n# Available functions: move(), turnLeft(), turnRight(), pickGem()\n\n'
    setEditorValue(resetCode)
    setCode(resetCode)
    if (onCodeChange) {
      onCodeChange(resetCode)
    }
  }

  const getStatusIcon = () => {
    if (isRunning) {
      return <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
    }
    if (error) {
      return <XCircle className="w-4 h-4 text-red-500" />
    }
    if (isCompleted) {
      return <CheckCircle className="w-4 h-4 text-green-500" />
    }
    return <Play className="w-4 h-4 text-blue-500" />
  }

  const getStatusText = () => {
    if (isRunning) return 'Running...'
    if (error) return 'Error'
    if (isCompleted) return 'Completed!'
    return 'Ready'
  }

  const getStatusColor = () => {
    if (isRunning) return 'text-blue-400'
    if (error) return 'text-red-400'
    if (isCompleted) return 'text-green-400'
    return 'text-slate-400'
  }

  return (
    <div className="h-full flex flex-col bg-slate-900 rounded-lg border border-slate-700">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-white">Python Code</h3>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-3 py-2 text-sm bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors"
            disabled={isRunning}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center space-x-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="px-4 py-2 bg-red-900/50 border-b border-red-700">
          <div className="flex items-start space-x-2">
            <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-red-400 font-medium">Execution Error</p>
              <p className="text-sm text-red-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language="python"
          value={editorValue}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            minimap: { enabled: false },
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            detectIndentation: false,
            renderLineHighlight: 'line',
            selectionHighlight: false,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: true,
            smoothScrolling: true,
            contextmenu: true,
            mouseWheelZoom: true,
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              useShadows: false,
              verticalHasArrows: false,
              horizontalHasArrows: false,
            },
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showFunctions: true,
              showConstructors: true,
              showFields: true,
              showVariables: true,
              showClasses: true,
              showStructs: true,
              showInterfaces: true,
              showModules: true,
              showProperties: true,
              showEvents: true,
              showOperators: true,
              showUnits: true,
              showValues: true,
              showConstants: true,
              showEnums: true,
              showEnumMembers: true,
              showColors: true,
              showFiles: true,
              showReferences: true,
              showFolders: true,
              showTypeParameters: true,
            },
          }}
        />
      </div>

      {/* Helper Functions */}
      <div className="p-4 border-t border-slate-700 bg-slate-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400">Available Functions:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">move()</span>
            <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">move_backward()</span>
            <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">turn_left()</span>
            <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">turn_right()</span>
            <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">turn_around()</span>
            <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">move_steps(n)</span>
            <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">face(dir)</span>
            <span className="px-2 py-1 bg-green-900/50 text-green-300 rounded">pick_gem()</span>
            <span className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded">get_position()</span>
            <span className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded">get_direction()</span>
            <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded">hero.moveRight(n)</span>
            <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded">hero.moveLeft(n)</span>
            <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded">hero.moveUp(n)</span>
            <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded">hero.moveDown(n)</span>
            <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded">hero.moveXY(x,z)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeEditor


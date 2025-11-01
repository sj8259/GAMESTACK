const sampleLessons = [
  {
    title: "First Steps",
    description: "Learn the basics of movement in our 3D world. Move forward and collect your first gem!",
    instructions: "Use the move() function to move forward one step. Try to reach the yellow gem!",
    hints: [
      "The move() function moves your character forward in the direction they're facing",
      "You can call move() multiple times to move further",
      "Gems will be collected automatically when you step on them"
    ],
    level: 1,
    order: 1,
    difficulty: "beginner",
    concepts: ["functions", "movement"],
    startingCode: "# Welcome to GameStack!\n# Use the move() function to move forward\n\nmove()\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 2, y: 0.5, z: 0 }, collected: false }
      ],
      obstacles: []
    },
    targetState: {
      playerPosition: { x: 2, y: 0, z: 0 },
      gemsCollected: 1,
      maxMoves: 5
    },
    successMessage: "Great job! You've taken your first steps in the 3D world. Now try collecting gems while moving!",
    isPublished: true
  },
  {
    title: "Turn and Move",
    description: "Learn to control your direction. Turn left and right to navigate around obstacles.",
    instructions: "Use turn_left() and turn_right() to change direction, then move() to walk. Collect all gems!",
    hints: [
      "turn_left() rotates your character 90 degrees to the left",
      "turn_right() rotates your character 90 degrees to the right",
      "You can chain multiple turns and moves together"
    ],
    level: 1,
    order: 2,
    difficulty: "beginner",
    concepts: ["functions", "movement", "direction"],
    startingCode: "# Learn to turn and move!\n# Use turn_left(), turn_right(), and move()\n\nmove()\nturn_right()\nmove()\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 2, y: 0.5, z: 0 }, collected: false },
        { position: { x: 2, y: 0.5, z: 2 }, collected: false }
      ],
      obstacles: [
        { position: { x: 1, y: 0.5, z: 1 }, type: "wall" }
      ]
    },
    targetState: {
      playerPosition: { x: 2, y: 0, z: 2 },
      gemsCollected: 2,
      maxMoves: 8
    },
    successMessage: "Excellent! You've mastered basic movement and turning. Try using loops to make your code more efficient!",
    isPublished: true
  },
  {
    title: "Loop the Loop",
    description: "Learn about loops to repeat actions. Use a for loop to move multiple times efficiently.",
    instructions: "Use a for loop to repeat the move() function. Collect all 3 gems using loops!",
    hints: [
      "for i in range(3): will repeat the code block 3 times",
      "Remember to indent code inside loops",
      "You can use loops to move multiple times without repeating move()"
    ],
    level: 1,
    order: 3,
    difficulty: "beginner",
    concepts: ["loops", "functions", "movement"],
    startingCode: "# Learn about loops!\n# Use for loops to repeat actions\n\nfor i in range(3):\n    move()\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 1, y: 0.5, z: 0 }, collected: false },
        { position: { x: 2, y: 0.5, z: 0 }, collected: false },
        { position: { x: 3, y: 0.5, z: 0 }, collected: false }
      ],
      obstacles: []
    },
    targetState: {
      playerPosition: { x: 3, y: 0, z: 0 },
      gemsCollected: 3,
      maxMoves: 5
    },
    successMessage: "Fantastic! You've learned about loops. This will make your code much more efficient!",
    isPublished: true
  },
  {
    title: "Conditional Logic",
    description: "Learn about if statements to make decisions in your code. Use conditions to navigate smartly.",
    instructions: "Use if statements to check conditions. Try using get_position() to make decisions based on your location.",
    hints: [
      "if condition: will execute code only if the condition is true",
      "get_position() returns your current x, z coordinates",
      "You can use == to check if two values are equal"
    ],
    level: 2,
    order: 1,
    difficulty: "intermediate",
    concepts: ["conditionals", "functions", "logic"],
    startingCode: "# Learn about conditions!\n# Use if statements to make decisions\n\npos = get_position()\nif pos[0] == 0:\n    move()\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 2, y: 0.5, z: 0 }, collected: false },
        { position: { x: 0, y: 0.5, z: 2 }, collected: false }
      ],
      obstacles: [
        { position: { x: 1, y: 0.5, z: 0 }, type: "wall" }
      ]
    },
    targetState: {
      playerPosition: { x: 0, y: 0, z: 2 },
      gemsCollected: 2,
      maxMoves: 10
    },
    successMessage: "Great work! You've learned to use conditions to make smart decisions in your code.",
    isPublished: true
  },
  {
    title: "Function Fundamentals",
    description: "Learn to create your own functions to organize and reuse code. Build a function to move in a square pattern.",
    instructions: "Create a function called move_square() that moves your character in a square pattern. Use it to collect all gems!",
    hints: [
      "def function_name(): defines a new function",
      "Functions help organize code and avoid repetition",
      "You can call your own functions just like built-in functions"
    ],
    level: 2,
    order: 2,
    difficulty: "intermediate",
    concepts: ["functions", "code_organization", "loops"],
    startingCode: "# Learn to create functions!\n# Define your own functions\n\ndef move_square():\n    for i in range(4):\n        move()\n        turn_right()\n\nmove_square()\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 2, y: 0.5, z: 0 }, collected: false },
        { position: { x: 2, y: 0.5, z: 2 }, collected: false },
        { position: { x: 0, y: 0.5, z: 2 }, collected: false },
        { position: { x: 0, y: 0.5, z: 0 }, collected: false }
      ],
      obstacles: []
    },
    targetState: {
      playerPosition: { x: 0, y: 0, z: 0 },
      gemsCollected: 4,
      maxMoves: 12
    },
    successMessage: "Outstanding! You've learned to create functions. This is a fundamental skill in programming!",
    isPublished: true
  },
  {
    title: "Python Variables",
    description: "Learn about variables in Python. Store values and use them to control movement.",
    instructions: "Create a variable called 'steps' and set it to 3. Use it in a loop to move that many steps. Collect all gems!",
    hints: [
      "variables = value creates a variable",
      "Variables store data that you can reuse",
      "You can use variables in loops: for i in range(variable):"
    ],
    level: 1,
    order: 4,
    difficulty: "beginner",
    concepts: ["variables", "loops", "movement"],
    startingCode: "# Learn about variables!\n# Variables store values you can reuse\n\nsteps = 3\nfor i in range(steps):\n    move()\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 3, y: 0.5, z: 0 }, collected: false }
      ],
      obstacles: []
    },
    targetState: {
      playerPosition: { x: 3, y: 0, z: 0 },
      gemsCollected: 1,
      maxMoves: 5
    },
    successMessage: "Perfect! You've learned to use variables. They're essential for storing and reusing data!",
    isPublished: true
  },
  {
    title: "While Loops",
    description: "Master while loops - repeat actions until a condition is met. Keep moving until you reach the goal!",
    instructions: "Use a while loop to keep moving forward until you collect a gem. Use get_gems_collected() to check progress!",
    hints: [
      "while condition: repeats as long as condition is true",
      "get_gems_collected() returns number of gems collected",
      "Make sure your loop has a way to stop, or it will run forever!"
    ],
    level: 2,
    order: 3,
    difficulty: "intermediate",
    concepts: ["loops", "conditionals", "logic"],
    startingCode: "# Learn while loops!\n# Repeat until condition is met\n\nwhile get_gems_collected() < 2:\n    move()\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 2, y: 0.5, z: 0 }, collected: false },
        { position: { x: 4, y: 0.5, z: 0 }, collected: false }
      ],
      obstacles: []
    },
    targetState: {
      playerPosition: { x: 4, y: 0, z: 0 },
      gemsCollected: 2,
      maxMoves: 8
    },
    successMessage: "Excellent! While loops are powerful for repeating actions until conditions are met!",
    isPublished: true
  },
  {
    title: "Python Lists",
    description: "Learn about Python lists! Store multiple values and iterate through them to collect gems.",
    instructions: "Create a list of directions: ['east', 'north', 'east']. Use a loop to face each direction and move. Collect all gems!",
    hints: [
      "my_list = [item1, item2, item3] creates a list",
      "for item in list: iterates through list items",
      "Lists can store any type of data"
    ],
    level: 2,
    order: 4,
    difficulty: "intermediate",
    concepts: ["arrays", "loops", "code_organization"],
    startingCode: "# Learn about lists!\n# Lists store multiple values\n\ndirections = ['east', 'north', 'east']\nfor dir in directions:\n    face(dir)\n    move()\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 1, y: 0.5, z: 0 }, collected: false },
        { position: { x: 1, y: 0.5, z: 1 }, collected: false },
        { position: { x: 2, y: 0.5, z: 1 }, collected: false }
      ],
      obstacles: []
    },
    targetState: {
      playerPosition: { x: 2, y: 0, z: 1 },
      gemsCollected: 3,
      maxMoves: 10
    },
    successMessage: "Awesome! Lists are perfect for storing multiple values and working with collections of data!",
    isPublished: true
  },
  {
    title: "If-Else Statements",
    description: "Learn if-else logic to make decisions. Turn different directions based on your position!",
    instructions: "Use if-else to check your x position. If x < 2, move east. Otherwise, move north. Collect all gems!",
    hints: [
      "if condition: else: provides alternative actions",
      "Use < for 'less than', > for 'greater than'",
      "get_position() returns [x, z] coordinates"
    ],
    level: 2,
    order: 5,
    difficulty: "intermediate",
    concepts: ["conditionals", "logic", "functions"],
    startingCode: "# Learn if-else statements!\n# Make decisions with alternatives\n\npos = get_position()\nif pos[0] < 2:\n    face('east')\n    move()\nelse:\n    face('north')\n    move()\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 1, y: 0.5, z: 0 }, collected: false },
        { position: { x: 1, y: 0.5, z: 1 }, collected: false }
      ],
      obstacles: []
    },
    targetState: {
      playerPosition: { x: 1, y: 0, z: 1 },
      gemsCollected: 2,
      maxMoves: 8
    },
    successMessage: "Great! If-else statements let you handle different situations in your code!",
    isPublished: true
  },
  {
    title: "Nested Loops",
    description: "Master nested loops - loops inside loops! Create patterns by combining multiple loops.",
    instructions: "Use nested loops to create a pattern. Outer loop 2 times, inner loop 2 times. Move and turn to collect gems in a grid!",
    hints: [
      "Nested loops: for i in range(2): for j in range(2):",
      "Inner loop completes fully for each outer loop iteration",
      "Use proper indentation for nested code blocks"
    ],
    level: 3,
    order: 1,
    difficulty: "advanced",
    concepts: ["loops", "code_organization", "logic"],
    startingCode: "# Learn nested loops!\n# Loops inside loops\n\nfor i in range(2):\n    for j in range(2):\n        move()\n    turn_right()\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 1, y: 0.5, z: 0 }, collected: false },
        { position: { x: 2, y: 0.5, z: 0 }, collected: false },
        { position: { x: 2, y: 0.5, z: 1 }, collected: false },
        { position: { x: 1, y: 0.5, z: 1 }, collected: false }
      ],
      obstacles: []
    },
    targetState: {
      playerPosition: { x: 2, y: 0, z: 1 },
      gemsCollected: 4,
      maxMoves: 15
    },
    successMessage: "Fantastic! Nested loops are essential for working with 2D grids and patterns!",
    isPublished: true
  },
  {
    title: "Functions with Parameters",
    description: "Create functions that accept parameters! Write reusable code that works with different values.",
    instructions: "Create a function move_steps(n) that takes a number and moves that many steps. Use it to collect all gems!",
    hints: [
      "def function_name(parameter): defines a function with parameters",
      "Parameters let functions work with different values",
      "Call the function: move_steps(3)"
    ],
    level: 3,
    order: 2,
    difficulty: "advanced",
    concepts: ["functions", "code_organization"],
    startingCode: "# Learn functions with parameters!\n# Functions that accept input\n\ndef move_steps(n):\n    for i in range(n):\n        move()\n\nmove_steps(2)\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 2, y: 0.5, z: 0 }, collected: false },
        { position: { x: 4, y: 0.5, z: 0 }, collected: false }
      ],
      obstacles: []
    },
    targetState: {
      playerPosition: { x: 4, y: 0, z: 0 },
      gemsCollected: 2,
      maxMoves: 10
    },
    successMessage: "Excellent! Functions with parameters make your code flexible and reusable!",
    isPublished: true
  },
  {
    title: "Python Dictionaries",
    description: "Learn dictionaries (key-value pairs)! Map coordinates to directions for smart navigation.",
    instructions: "Create a dictionary mapping positions to directions. Use it to navigate to specific coordinates and collect gems!",
    hints: [
      "my_dict = {'key': 'value'} creates a dictionary",
      "Access values: my_dict['key']",
      "Dictionaries store key-value pairs"
    ],
    level: 3,
    order: 3,
    difficulty: "advanced",
    concepts: ["objects", "logic", "code_organization"],
    startingCode: "# Learn dictionaries!\n# Key-value pairs for data mapping\n\nroutes = {(0, 0): 'east', (2, 0): 'north'}\npos = get_position()\nkey = (int(pos[0]), int(pos[1]))\nif key in routes:\n    face(routes[key])\n    move()\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 2, y: 0.5, z: 0 }, collected: false },
        { position: { x: 2, y: 0.5, z: 2 }, collected: false }
      ],
      obstacles: []
    },
    targetState: {
      playerPosition: { x: 2, y: 0, z: 2 },
      gemsCollected: 2,
      maxMoves: 12
    },
    successMessage: "Wonderful! Dictionaries are perfect for mapping and looking up related data!",
    isPublished: true
  },
  {
    title: "Elif Statements",
    description: "Master elif (else-if) for multiple conditions! Handle different cases with elif chains.",
    instructions: "Use if-elif-else to check your x position. If x == 0, go east. Elif x == 2, go north. Else, go west. Navigate to collect gems!",
    hints: [
      "if condition1: elif condition2: else: handles multiple cases",
      "Elif means 'else if' - checks next condition if previous was false",
      "Only one branch executes in if-elif-else chain"
    ],
    level: 3,
    order: 4,
    difficulty: "advanced",
    concepts: ["conditionals", "logic"],
    startingCode: "# Learn elif statements!\n# Multiple conditions in sequence\n\npos = get_position()\nif pos[0] == 0:\n    face('east')\n    move()\nelif pos[0] == 2:\n    face('north')\n    move()\nelse:\n    face('west')\n    move()\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 2, y: 0.5, z: 0 }, collected: false },
        { position: { x: 2, y: 0.5, z: 1 }, collected: false }
      ],
      obstacles: []
    },
    targetState: {
      playerPosition: { x: 2, y: 0, z: 1 },
      gemsCollected: 2,
      maxMoves: 10
    },
    successMessage: "Perfect! Elif statements let you handle multiple conditions elegantly!",
    isPublished: true
  },
  {
    title: "Recursive Patterns",
    description: "Learn recursion! Functions that call themselves to create repeating patterns.",
    instructions: "Create a recursive function that moves forward, turns right, then calls itself with one less step. Use it to create a spiral and collect gems!",
    hints: [
      "Recursive functions call themselves",
      "Always have a base case to stop recursion",
      "Each recursive call works on a smaller problem"
    ],
    level: 4,
    order: 1,
    difficulty: "advanced",
    concepts: ["functions", "logic", "code_organization"],
    startingCode: "# Learn recursion!\n# Functions that call themselves\n\ndef spiral(n):\n    if n > 0:\n        move()\n        turn_right()\n        spiral(n - 1)\n\nspiral(4)\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 1, y: 0.5, z: 0 }, collected: false },
        { position: { x: 1, y: 0.5, z: 1 }, collected: false },
        { position: { x: 0, y: 0.5, z: 1 }, collected: false },
        { position: { x: 0, y: 0.5, z: 0 }, collected: false }
      ],
      obstacles: []
    },
    targetState: {
      playerPosition: { x: 0, y: 0, z: 0 },
      gemsCollected: 4,
      maxMoves: 20
    },
    successMessage: "Incredible! Recursion is a powerful technique for solving problems that repeat with smaller versions!",
    isPublished: true
  },
  {
    title: "Complex Navigation",
    description: "Combine all concepts! Use variables, loops, conditionals, and functions together for advanced pathfinding.",
    instructions: "Use everything you've learned: variables, loops, conditionals, and functions to navigate through obstacles and collect all 5 gems efficiently!",
    hints: [
      "Combine multiple Python concepts",
      "Use variables to store positions and directions",
      "Use conditionals to avoid obstacles",
      "Use loops to repeat navigation patterns"
    ],
    level: 4,
    order: 2,
    difficulty: "advanced",
    concepts: ["variables", "loops", "conditionals", "functions", "logic", "code_organization"],
    startingCode: "# Combine all concepts!\n# Variables, loops, conditionals, functions\n\ndef navigate_to(target_x, target_z):\n    pos = get_position()\n    while pos[0] < target_x:\n        face('east')\n        move()\n        pos = get_position()\n    while pos[1] < target_z:\n        face('north')\n        move()\n        pos = get_position()\n\nnavigate_to(3, 3)\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 1, y: 0.5, z: 0 }, collected: false },
        { position: { x: 2, y: 0.5, z: 0 }, collected: false },
        { position: { x: 3, y: 0.5, z: 0 }, collected: false },
        { position: { x: 3, y: 0.5, z: 1 }, collected: false },
        { position: { x: 3, y: 0.5, z: 2 }, collected: false }
      ],
      obstacles: [
        { position: { x: 2, y: 0.5, z: 1 }, type: "wall" }
      ]
    },
    targetState: {
      playerPosition: { x: 3, y: 0, z: 2 },
      gemsCollected: 5,
      maxMoves: 25
    },
    successMessage: "Masterful! You've combined all Python concepts to solve complex problems!",
    isPublished: true
  },
  {
    title: "List Comprehension",
    description: "Learn Python list comprehensions - concise way to create lists from loops!",
    instructions: "Create a list of positions using list comprehension. Iterate through positions and navigate to each to collect gems!",
    hints: [
      "[expression for item in iterable] creates a list",
      "List comprehensions are concise and Pythonic",
      "Can include conditions: [x for x in range(5) if x > 2]"
    ],
    level: 4,
    order: 3,
    difficulty: "advanced",
    concepts: ["arrays", "loops", "code_organization"],
    startingCode: "# Learn list comprehensions!\n# Concise list creation\n\npositions = [(i, 0) for i in range(1, 4)]\nfor pos in positions:\n    target = pos\n    current = get_position()\n    while current[0] < target[0]:\n        face('east')\n        move()\n        current = get_position()\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 1, y: 0.5, z: 0 }, collected: false },
        { position: { x: 2, y: 0.5, z: 0 }, collected: false },
        { position: { x: 3, y: 0.5, z: 0 }, collected: false }
      ],
      obstacles: []
    },
    targetState: {
      playerPosition: { x: 3, y: 0, z: 0 },
      gemsCollected: 3,
      maxMoves: 15
    },
    successMessage: "Brilliant! List comprehensions make your code more Pythonic and readable!",
    isPublished: true
  },
  {
    title: "Error Prevention",
    description: "Learn defensive programming! Check conditions before actions to prevent errors.",
    instructions: "Before moving, check if there's an obstacle ahead using get_position(). Use conditionals to avoid walls and reach all gems safely!",
    hints: [
      "Always check conditions before actions",
      "Use if statements to prevent invalid moves",
      "Defensive programming prevents errors"
    ],
    level: 4,
    order: 4,
    difficulty: "advanced",
    concepts: ["conditionals", "logic", "code_organization"],
    startingCode: "# Learn error prevention!\n# Check before you act\n\npos = get_position()\nif pos[0] < 5:  # Check bounds\n    face('east')\n    move()\nelse:\n    face('north')\n    move()\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 1, y: 0.5, z: 0 }, collected: false },
        { position: { x: 3, y: 0.5, z: 0 }, collected: false },
        { position: { x: 3, y: 0.5, z: 2 }, collected: false }
      ],
      obstacles: [
        { position: { x: 2, y: 0.5, z: 0 }, type: "wall" },
        { position: { x: 4, y: 0.5, z: 0 }, type: "wall" }
      ]
    },
    targetState: {
      playerPosition: { x: 3, y: 0, z: 2 },
      gemsCollected: 3,
      maxMoves: 20
    },
    successMessage: "Excellent! Defensive programming keeps your code robust and error-free!",
    isPublished: true
  },
  {
    title: "String Operations",
    description: "Work with strings in Python! Use string methods and operations to control navigation logic.",
    instructions: "Create a string variable 'path' with value 'een' (east-east-north). Loop through each character, convert to direction, face that direction and move!",
    hints: [
      "Strings are sequences of characters",
      "for char in string: iterates through characters",
      "Strings can be used in conditional logic"
    ],
    level: 3,
    order: 5,
    difficulty: "advanced",
    concepts: ["variables", "loops", "logic"],
    startingCode: "# Learn string operations!\n# Work with text data\n\npath = 'een'\ndirection_map = {'e': 'east', 'n': 'north', 'w': 'west', 's': 'south'}\nfor char in path:\n    face(direction_map[char])\n    move()\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 1, y: 0.5, z: 0 }, collected: false },
        { position: { x: 2, y: 0.5, z: 0 }, collected: false },
        { position: { x: 2, y: 0.5, z: 1 }, collected: false }
      ],
      obstacles: []
    },
    targetState: {
      playerPosition: { x: 2, y: 0, z: 1 },
      gemsCollected: 3,
      maxMoves: 12
    },
    successMessage: "Great! String operations are essential for working with text data in Python!",
    isPublished: true
  },
  {
    title: "Logical Operators",
    description: "Master logical operators (and, or, not)! Combine conditions for complex decision making.",
    instructions: "Use 'and' and 'or' operators to check multiple conditions. Navigate only if position is safe (x < 3 AND z < 3) OR you've collected less than 2 gems!",
    hints: [
      "and: both conditions must be true",
      "or: at least one condition must be true",
      "not: reverses the condition"
    ],
    level: 4,
    order: 5,
    difficulty: "advanced",
    concepts: ["conditionals", "logic"],
    startingCode: "# Learn logical operators!\n# Combine conditions\n\npos = get_position()\ngems = get_gems_collected()\nif (pos[0] < 3 and pos[1] < 3) or gems < 2:\n    face('east')\n    move()\n",
    worldState: {
      player: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      gems: [
        { position: { x: 2, y: 0.5, z: 0 }, collected: false },
        { position: { x: 2, y: 0.5, z: 2 }, collected: false }
      ],
      obstacles: []
    },
    targetState: {
      playerPosition: { x: 2, y: 0, z: 2 },
      gemsCollected: 2,
      maxMoves: 15
    },
    successMessage: "Perfect! Logical operators let you build complex conditions for sophisticated logic!",
    isPublished: true
  }
]

module.exports = sampleLessons


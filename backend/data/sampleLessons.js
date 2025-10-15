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
  }
]

module.exports = sampleLessons


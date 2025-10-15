# GameStack 🎮

A gamified code learning platform inspired by Apple's Swift Playgrounds. Learn programming through interactive 3D visual feedback by controlling a character in virtual worlds.

![GameStack Preview](https://via.placeholder.com/800x400/1e293b/ffffff?text=GameStack+Preview)

## 🚀 Features

- **3D Interactive Learning**: Control a 3D character through Python code
- **Real-time Code Execution**: Write and run Python code in the browser using Pyodide
- **Progressive Difficulty**: Learn from beginner to advanced programming concepts
- **Achievement System**: Unlock achievements and track your progress
- **Leaderboards**: Compete with other learners worldwide
- **Monaco Editor**: Professional code editing experience with syntax highlighting
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React** with Vite for fast development
- **React Three Fiber** + **Three.js** for 3D graphics
- **Monaco Editor** for code editing
- **Zustand** for state management
- **TailwindCSS** for styling
- **React Router** for navigation
- **Pyodide** for Python code execution

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** authentication
- **RESTful API** design
- **CORS** + **Helmet** for security

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gamestack.git
   cd gamestack
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cd backend
   cp config.env.example config.env
   ```
   
   Edit `backend/config.env` with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/gamestack
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in config.env
   ```

5. **Seed the database**
   ```bash
   cd backend
   npm run seed
   ```

6. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - Frontend development server on http://localhost:5173

## 🎮 Usage

1. **Visit the application**: Open http://localhost:5173
2. **Create an account** or use the demo account:
   - Email: `demo@gamestack.dev`
   - Password: `demo123`
3. **Start learning**: Choose a level and begin coding!
4. **Write Python code** to control your 3D character
5. **Collect gems** and complete objectives
6. **Unlock achievements** and climb the leaderboard

## 🎯 Available Functions

In the game environment, you have access to these Python functions:

- `move()` - Move forward one step
- `turn_left()` - Turn 90 degrees left
- `turn_right()` - Turn 90 degrees right
- `pick_gem()` - Pick up a gem at current position
- `get_position()` - Get current x, z coordinates
- `get_gems_collected()` - Get number of gems collected
- `get_moves()` - Get current move count

## 📚 Learning Path

### Level 1: Basics
1. **First Steps** - Learn basic movement
2. **Turn and Move** - Master direction control
3. **Loop the Loop** - Introduction to loops

### Level 2: Intermediate
1. **Conditional Logic** - If statements and decision making
2. **Function Fundamentals** - Creating your own functions

### Level 3: Advanced
1. **Complex Navigation** - Advanced pathfinding
2. **Algorithm Design** - Efficient solutions
3. **Creative Challenges** - Open-ended problems

## 🔧 Development

### Project Structure
```
gamestack/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Zustand stores
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Main app component
│   └── package.json
├── backend/           # Express backend
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   ├── middleware/    # Express middleware
│   ├── data/          # Sample data
│   └── server.js      # Main server file
└── README.md
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

#### Lessons
- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/:id` - Get specific lesson
- `POST /api/lessons/:id/complete` - Complete lesson
- `GET /api/lessons/:id/progress` - Get lesson progress

#### Users
- `GET /api/users/profile` - Get user profile
- `GET /api/users/progress` - Get user progress
- `GET /api/users/achievements` - Get user achievements

#### Leaderboard
- `GET /api/leaderboard` - Get leaderboard
- `GET /api/leaderboard/my-position` - Get user's position

### Adding New Lessons

1. Create lesson data in `backend/data/sampleLessons.js`
2. Include all required fields:
   - `title`, `description`, `instructions`
   - `worldState` (player position, gems, obstacles)
   - `targetState` (completion conditions)
   - `level`, `difficulty`, `concepts`
3. Run `npm run seed` to update the database

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `dist` folder to your hosting service
3. Update API base URL in production

### Backend (Heroku/Railway)
1. Set environment variables in your hosting platform
2. Ensure MongoDB connection string is correct
3. Deploy the backend directory

### Environment Variables
```env
# Production
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_production_secret
PORT=5000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Apple's Swift Playgrounds
- Built with amazing open-source libraries
- 3D graphics powered by Three.js and React Three Fiber
- Python execution in browser thanks to Pyodide

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/gamestack/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Happy Coding! 🎮✨**


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
- **Spring Boot 3.2** with Java 17
- **Spring Data JPA** with Hibernate
- **H2 Database** (development) / **PostgreSQL** (production)
- **JWT** authentication with Spring Security
- **RESTful API** design
- **CORS** configuration

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher) for frontend
- Java 17 or higher for backend
- Maven 3.6 or higher for backend
- npm or yarn for frontend

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gamestack.git
   cd gamestack
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install and run backend**
   ```bash
   cd backend-spring
   mvn clean install
   mvn spring-boot:run
   ```
   
   The Spring Boot backend will:
   - Start on http://localhost:3001
   - Create H2 in-memory database
   - Seed with sample data automatically

4. **Start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```

   The frontend will start on http://localhost:5173

## 🎮 Usage

1. **Visit the application**: Open http://localhost:5173
2. **Create an account** or use the demo account:
   - Username: `demo`
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
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Zustand stores
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Main app component
│   └── package.json
├── backend-spring/        # Spring Boot backend
│   ├── src/main/java/com/gamestack/
│   │   ├── controller/    # REST controllers
│   │   ├── entity/        # JPA entities
│   │   ├── repository/    # JPA repositories
│   │   ├── service/       # Business logic
│   │   └── security/      # JWT & security config
│   └── pom.xml
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

To add lessons, you can either:

1. **Use the H2 Console** at http://localhost:3001/h2-console (JDBC URL: `jdbc:h2:mem:gamestack`)
2. **Create via API**: POST to `/api/lessons` with admin credentials
3. **Update DataSeeder.java**: Add lessons to the `seedLessons()` method in `backend-spring/src/main/java/com/gamestack/config/DataSeeder.java`

Required fields:
- `title`, `description`, `instructions`
- `worldState` (player position, gems, obstacles)
- `targetState` (completion conditions)
- `level`, `difficulty`, `concepts`

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `dist` folder to your hosting service
3. Update API base URL in production

### Backend (Railway/Render/Fly.io)
1. Set up PostgreSQL database
2. Update `application.yml` with production database connection
3. Set environment variables for JWT secret
4. Deploy using Maven wrapper or Docker

### Environment Variables
```yaml
# Production configuration in application.yml
spring:
  datasource:
    url: jdbc:postgresql://your-postgres-url/gamestack
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  security:
    jwt:
      secret: ${JWT_SECRET}
      expiration: 604800000
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


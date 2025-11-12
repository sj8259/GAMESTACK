# GameStack Tech Stack 🛠️

Complete technology stack breakdown for the GameStack gamified code learning platform.

---

## 📊 Tech Stack Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                           │
│  React 18.2 | Vite 5.0 | TypeScript/JavaScript             │
│  Zustand | React Router | TailwindCSS                       │
│  Three.js | React Three Fiber | Monaco Editor               │
│  Pyodide | Axios | Framer Motion                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            │ JSON
┌───────────────────────────▼─────────────────────────────────┐
│                    BACKEND LAYER                            │
│  Spring Boot 3.2 | Java 17                                 │
│  Spring Security | JWT | BCrypt                            │
│  Spring Data MongoDB | Maven                               │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ MongoDB Protocol
┌───────────────────────────▼─────────────────────────────────┐
│                    DATABASE LAYER                           │
│  MongoDB 7.0 | Document Database                           │
│  Collections: users, lessons, otps                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Frontend Tech Stack

### Core Framework
- **React** `18.2.0`
  - UI library
  - Component-based architecture
  - Hooks for state and lifecycle

- **Vite** `5.0.0`
  - Build tool and dev server
  - Fast HMR
  - Optimized production builds

### Routing & Navigation
- **React Router DOM** `6.20.1`
  - Client-side routing
  - Protected routes
  - Navigation guards

### State Management
- **Zustand** `4.4.7`
  - Lightweight state management
  - Persistence middleware (localStorage)
  - Stores: `authStore`, `gameStore`

### 3D Graphics & Rendering
- **Three.js** `0.180.0`
  - 3D graphics library
  - WebGL rendering
  - Scene, camera, lighting

- **React Three Fiber** `8.15.12`
  - React renderer for Three.js
  - Declarative 3D scenes
  - React integration

- **@react-three/drei** `9.88.13`
  - Helpers for React Three Fiber
  - Pre-built components and utilities

### Code Editor
- **Monaco Editor** `@monaco-editor/react` `4.6.0`
  - VS Code editor in browser
  - Syntax highlighting
  - IntelliSense and autocomplete

### Python Runtime
- **Pyodide** `0.28.3`
  - Python runtime in browser (WebAssembly)
  - Executes user Python code
  - Interacts with JavaScript game functions

### HTTP Client
- **Axios** `1.6.2`
  - HTTP client for API calls
  - Request/response interceptors
  - JWT token management

### Styling
- **TailwindCSS** `3.3.6`
  - Utility-first CSS framework
  - Responsive design
  - Dark theme support

### UI Components & Icons
- **Lucide React** `0.294.0`
  - Icon library
  - React components

### Animations
- **Framer Motion** `12.23.24`
  - Animation library
  - Page transitions
  - Component animations

### Background Effects
- **Vanta.js** `0.5.24`
  - Animated backgrounds
  - WebGL effects

### Layout Components
- **React Split** `2.0.14`
  - Resizable split panes
  - Code editor + 3D view layout

### OAuth Integration
- **@react-oauth/google** `0.12.2`
  - Google OAuth integration
  - Social login

### Development Tools
- **ESLint** `8.53.0`
  - Code linting
  - React-specific rules
  
- **PostCSS** `8.4.32`
  - CSS processing
  - TailwindCSS integration
  
- **Autoprefixer** `10.4.16`
  - CSS vendor prefixing

### Type Definitions
- **@types/react** `18.2.37`
- **@types/react-dom** `18.2.15`

---

## ⚙️ Backend Tech Stack

### Core Framework
- **Spring Boot** `3.2.0`
  - Application framework
  - Auto-configuration
  - Embedded server

- **Java** `17`
  - Programming language
  - LTS version

### Build Tool
- **Maven** `3.9+`
  - Dependency management
  - Build automation
  - Project structure

### Database & Data Access
- **Spring Data MongoDB** `(via Spring Boot)`
  - MongoDB integration
  - Repository pattern
  - Query methods

- **MongoDB Driver** `mongodb-driver-sync`
  - Native MongoDB driver
  - Connection management

### Security
- **Spring Security** `(via Spring Boot)`
  - Authentication & authorization
  - Security filters
  - CORS configuration

- **JWT (JSON Web Tokens)**
  - `jjwt-api` `0.11.5`
  - `jjwt-impl` `0.11.5`
  - `jjwt-jackson` `0.11.5`
  - Token-based authentication

- **BCrypt** `(via Spring Security)`
  - Password hashing
  - Secure password storage

### Web Framework
- **Spring Web** `(via Spring Boot)`
  - REST API
  - Controllers
  - Request/response handling

### Validation
- **Spring Validation** `(via Spring Boot)`
  - Input validation
  - Bean validation

### Monitoring & Health
- **Spring Actuator** `(via Spring Boot)`
  - Health checks
  - Metrics
  - Application info

### Email Support
- **Spring Mail** `(via Spring Boot)`
  - Email functionality
  - SMTP configuration
  - OTP email support

### OAuth Integration
- **Spring OAuth2 Client** `(via Spring Boot)`
  - OAuth2 integration
  - Google OAuth support

### JSON Processing
- **Jackson** `(via Spring Boot)`
  - JSON serialization/deserialization
  - Object mapping

### Development Tools
- **Spring Boot DevTools** `(via Spring Boot)`
  - Hot reload
  - Development utilities

### Testing
- **Spring Boot Test** `(via Spring Boot)`
  - Unit testing
  - Integration testing

- **Spring Security Test** `(via Spring Boot)`
  - Security testing utilities

---

## 🗄️ Database Tech Stack

### Database Engine
- **MongoDB** `7.0`
  - NoSQL document database
  - Flexible schema
  - JSON-like documents (BSON)

### Collections
- **users** - User accounts and progress
- **lessons** - Lesson definitions and world states
- **otps** - One-time passwords (if email OTP enabled)

### Features Used
- Document storage
- Indexing (username, email, level, order)
- Embedded documents (progress, worldState)
- Aggregation pipelines (leaderboard queries)

---

## 🔧 Development Environment

### Runtime Requirements
- **Node.js** `18+` (for frontend)
- **Java** `17+` (for backend)
- **Maven** `3.8+` (for backend builds)
- **MongoDB** `7.0+` (database)

### Development Tools
- **Git** - Version control
- **npm/yarn** - Package management (frontend)
- **Maven** - Build tool (backend)

### Local Development
- **Vite Dev Server** - Port `5173` (frontend)
- **Spring Boot** - Port `3001` (backend)
- **MongoDB** - Port `27017` (database)

---

## 🚀 Deployment Stack

### Containerization (Optional)
- **Docker** - Container platform
- **Docker Compose** - Multi-container orchestration

### CI/CD (Optional)
- **Jenkins** - Continuous Integration
- **Git** - Version control integration

### Cloud Platforms (Optional)
- **AWS** - EKS, EC2, S3
- **Azure** - AKS, App Service
- **Google Cloud** - GKE, Cloud Run
- **Railway/Render** - Platform-as-a-Service

---

## 📦 Package Management

### Frontend
```json
Package Manager: npm / yarn
Package File: package.json
Lock File: package-lock.json
```

### Backend
```xml
Build Tool: Maven
Config File: pom.xml
Dependencies: Managed via Maven Central
```

---

## 🔐 Security Technologies

### Authentication
- **JWT (JSON Web Tokens)** - Stateless authentication
- **BCrypt** - Password hashing
- **Spring Security** - Security framework

### Authorization
- **Role-Based Access Control (RBAC)**
- **@PreAuthorize** annotations
- **JWT token validation**

### Data Protection
- **HTTPS/TLS** - Encrypted communication
- **CORS** - Cross-origin resource sharing
- **Input Validation** - Prevent injection attacks

---

## 🎯 Key Technologies by Purpose

### User Interface
- React, TailwindCSS, Framer Motion, Lucide React

### 3D Visualization
- Three.js, React Three Fiber, @react-three/drei

### Code Execution
- Pyodide (Python in browser)

### Code Editing
- Monaco Editor (VS Code editor)

### API Communication
- Axios, REST API, JSON

### State Management
- Zustand (with localStorage persistence)

### Backend API
- Spring Boot, RESTful APIs, JSON

### Database
- MongoDB (NoSQL document store)

### Authentication
- JWT, Spring Security, BCrypt

### Routing
- React Router DOM

### Build Tools
- Vite (frontend), Maven (backend)

---

## 📈 Performance Optimizations

### Frontend
- **Code Splitting** - Route-based lazy loading
- **Tree Shaking** - Remove unused code
- **Vite Optimization** - Fast builds and HMR
- **React Three Fiber** - Efficient 3D rendering
- **Pyodide Caching** - Python runtime caching

### Backend
- **Spring Boot Auto-configuration** - Optimized startup
- **MongoDB Indexing** - Fast queries
- **Connection Pooling** - Efficient database connections
- **Stateless Design** - Horizontal scaling ready

### Database
- **MongoDB Indexes** - Fast lookups
- **Embedded Documents** - Reduced queries
- **Aggregation Pipelines** - Efficient data processing

---

## 🌐 Browser Support

### Modern Browsers
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

### Requirements
- WebGL support (for 3D graphics)
- WebAssembly support (for Pyodide)
- ES6+ JavaScript support
- LocalStorage support

---

## 📚 Learning Resources

### Frontend
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Three.js Documentation](https://threejs.org/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

### Backend
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security Documentation](https://spring.io/projects/spring-security)
- [MongoDB Documentation](https://www.mongodb.com/docs/)

### Tools
- [Pyodide Documentation](https://pyodide.org/)
- [Monaco Editor Documentation](https://microsoft.github.io/monaco-editor/)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber/)

---

## 🔄 Version Information

### Frontend
- **Node.js**: 18+ required
- **React**: 18.2.0
- **Vite**: 5.0.0

### Backend
- **Java**: 17+ required
- **Spring Boot**: 3.2.0
- **Maven**: 3.8+ required

### Database
- **MongoDB**: 7.0+ recommended

---

## 📝 Summary

**Frontend Stack:**
- React + Vite for UI
- Zustand for state
- Three.js for 3D
- Pyodide for Python execution
- Monaco Editor for code editing
- TailwindCSS for styling

**Backend Stack:**
- Spring Boot for API
- MongoDB for database
- JWT for authentication
- Maven for builds

**Key Features:**
- Full-stack JavaScript/Java application
- Real-time 3D visualization
- In-browser Python execution
- Modern, responsive UI
- Secure authentication
- Scalable architecture

---

**Last Updated:** November 2024  
**Project Version:** 1.0.0


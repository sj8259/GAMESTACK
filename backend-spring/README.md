# GameStack Backend - Spring Boot

A Spring Boot REST API for the GameStack educational platform, built with Java 17, Spring Boot 3.2, and H2/PostgreSQL database.

## Features

- **Authentication & Authorization**: JWT-based authentication with Spring Security
- **User Management**: User registration, login, profile management
- **Lesson System**: CRUD operations for educational lessons
- **Progress Tracking**: User progress and achievements
- **Leaderboard**: User rankings and statistics
- **Database**: H2 (development) / PostgreSQL (production) with JPA/Hibernate

## Tech Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** (JWT authentication)
- **Spring Data JPA** (Hibernate)
- **H2 Database** (development)
- **PostgreSQL** (production)
- **Maven** (dependency management)

## Quick Start

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

### Running the Application

1. **Clone and navigate to the backend-spring directory:**
   ```bash
   cd /Volumes/THUNDERBOY/gamestack/backend-spring
   ```

2. **Install dependencies:**
   ```bash
   mvn clean install
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

The API will be available at `http://localhost:3001`

### Database Access

- **H2 Console**: `http://localhost:3001/h2-console`
  - JDBC URL: `jdbc:h2:mem:gamestack`
  - Username: `sa`
  - Password: (empty)

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

#### Lessons
- `GET /api/lessons` - Get all published lessons
- `GET /api/lessons/{id}` - Get specific lesson
- `POST /api/lessons` - Create lesson (Admin only)
- `PUT /api/lessons/{id}` - Update lesson (Admin only)
- `DELETE /api/lessons/{id}` - Delete lesson (Admin only)

#### Leaderboard
- `GET /api/leaderboard` - Get user rankings

#### Health
- `GET /api/health` - Health check

### Default Credentials

The application seeds with demo data:

- **Admin User**: `demo` / `demo123`
- **Test Users**: `alice`, `bob`, `charlie` (password: `password123`)

### Configuration

The application uses `application.yml` for configuration:

```yaml
server:
  port: 3001

spring:
  datasource:
    url: jdbc:h2:mem:gamestack
    driver-class-name: org.h2.Driver
    username: sa
    password: 
  
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true

  security:
    jwt:
      secret: your_jwt_secret_key_here_make_it_long_and_secure
      expiration: 604800000 # 7 days
```

### Production Setup

For production, update the database configuration:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/gamestack
    driver-class-name: org.postgresql.Driver
    username: your_username
    password: your_password
  
  jpa:
    hibernate:
      ddl-auto: validate
```

### Development

The application includes:
- **Auto-seeding**: Sample users and lessons on startup
- **CORS**: Configured for frontend development
- **H2 Console**: Database management interface
- **Actuator**: Health and metrics endpoints

### API Documentation

The API follows RESTful conventions and returns JSON responses. All endpoints (except public ones) require JWT authentication via the `Authorization: Bearer <token>` header.

### Frontend Integration

The frontend should be configured to proxy API requests to `http://localhost:3001/api` or update the API base URL in the frontend configuration.










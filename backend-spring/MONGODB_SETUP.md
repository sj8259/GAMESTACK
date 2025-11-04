# MongoDB Setup for GameStack Spring Boot Backend

## Overview

The Spring Boot backend uses MongoDB as its primary database, matching the structure of the Node.js backend. MongoDB serves as the main data store, and Spring Boot accesses it directly for web interactions.

## Architecture

- **MongoDB** (Main Database): `mongodb://localhost:27017/gamestack`
- **Spring Boot**: Connects directly to MongoDB using Spring Data MongoDB
- **Data Sync Service**: Ensures Spring Boot has access to the latest data from MongoDB

## Configuration

MongoDB connection is configured in `application.yml`:

```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/gamestack
      auto-index-creation: true
```

## Data Models

All entities have been converted from JPA to MongoDB documents:

- **User**: Stored in `users` collection
- **Lesson**: Stored in `lessons` collection
- Nested documents: `UserProgress`, `WorldState`, `TargetState`, etc.

## Data Synchronization

The `DataSyncService` provides methods to sync data from MongoDB:

### Automatic Sync
- Runs every hour via scheduled task
- Logs sync statistics

### Manual Sync
- **Endpoint**: `POST /api/sync/all` (Admin only)
- **Statistics**: `GET /api/sync/statistics`

### Sync Methods
- `syncUsers()`: Sync all users
- `syncLessons()`: Sync all lessons
- `syncAll()`: Sync all data
- `syncUserById(String id)`: Sync specific user
- `syncLessonById(String id)`: Sync specific lesson

## Running the Application

1. **Ensure MongoDB is running**:
   ```bash
   mongod
   # or
   brew services start mongodb-community
   ```

2. **Start Spring Boot**:
   ```bash
   cd backend-spring
   mvn spring-boot:run
   ```

3. **Verify connection**:
   - Check logs for "MongoDB connected successfully"
   - Access `/api/sync/statistics` to see data counts

## Data Structure

The MongoDB collections match the Node.js backend schema:

### Users Collection
```javascript
{
  username: String,
  email: String,
  password: String,
  progress: {
    completedLessons: [...],
    currentLevel: Number,
    totalScore: Number
  },
  achievements: [String],
  avatar: String,
  customAvatar: String,
  isAdmin: Boolean
}
```

### Lessons Collection
```javascript
{
  title: String,
  description: String,
  instructions: String,
  hints: [String],
  level: Number,
  order: Number,
  difficulty: String,
  concepts: [String],
  startingCode: String,
  worldState: {
    player: {...},
    gems: [...],
    obstacles: [...]
  },
  targetState: {...},
  isPublished: Boolean,
  createdBy: ObjectId
}
```

## Notes

- Both Node.js and Spring Boot backends share the same MongoDB database
- Changes made by either backend are immediately available to both
- The sync service primarily logs access for monitoring purposes
- All data operations go directly through MongoDB repositories


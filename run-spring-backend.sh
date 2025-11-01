#!/bin/bash

# GameStack Spring Boot Backend Runner
echo "🚀 Starting GameStack Spring Boot Backend..."

# Navigate to Spring Boot backend directory
cd /Volumes/THUNDERBOY/gamestack/backend-spring

# Check if Java 17+ is available
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17 or higher."
    exit 1
fi

# Check Java version
JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | awk -F '.' '{print $1}')
if [ "$JAVA_VERSION" -lt 17 ]; then
    echo "❌ Java 17 or higher is required. Current version: $JAVA_VERSION"
    exit 1
fi

# Check if Maven is available
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven 3.6 or higher."
    exit 1
fi

echo "✅ Java and Maven are available"

# Install dependencies and run
echo "📦 Installing dependencies..."
mvn clean install -DskipTests

echo "🎯 Starting Spring Boot application..."
mvn spring-boot:run




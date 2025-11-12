#!/bin/sh
# Startup script for Railway deployment
# Finds and runs the Spring Boot JAR file

echo "=== Railway Startup Script ==="
echo "Current directory: $(pwd)"
echo "Listing current directory:"
ls -la

echo ""
echo "Checking if target directory exists..."
if [ -d "target" ]; then
    echo "Target directory found!"
    echo "Contents of target directory:"
    ls -la target/
else
    echo "WARNING: Target directory not found in current location"
fi

echo ""
echo "Looking for JAR files..."

# Try multiple possible locations
JAR_FILE=""

# Try current directory target/
if [ -d "target" ]; then
    echo "Checking target/ directory..."
    JAR_FILE=$(find target -name "*.jar" -not -name "*.original" 2>/dev/null | head -1)
fi

# Try backend-spring/target/ (if running from root)
if [ -z "$JAR_FILE" ] && [ -d "backend-spring/target" ]; then
    echo "Checking backend-spring/target/ directory..."
    JAR_FILE=$(find backend-spring/target -name "*.jar" -not -name "*.original" 2>/dev/null | head -1)
fi

# Try searching from root
if [ -z "$JAR_FILE" ]; then
    echo "Searching for JAR files recursively..."
    # Look for any jar (not just under target/) because Nixpacks may copy the jar to the image root as app.jar
    JAR_FILE=$(find . -name "*.jar" -not -name "*.original" 2>/dev/null | head -1)
fi

if [ -z "$JAR_FILE" ]; then
    echo ""
    echo "ERROR: No JAR file found!"
    echo ""
    echo "Directory structure:"
    find . -type d -name "target" 2>/dev/null | head -5
    echo ""
    echo "All JAR files found:"
    find . -name "*.jar" 2>/dev/null
    echo ""
    echo "Contents of current directory:"
    ls -la
    if [ -d "target" ]; then
        echo ""
        echo "Contents of target directory:"
        ls -la target/
    fi
    exit 1
fi

echo "Found JAR file: $JAR_FILE"
echo "Starting application..."
exec java -jar "$JAR_FILE"


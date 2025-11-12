#!/bin/bash
# Startup script for Railway deployment
# Finds and runs the Spring Boot JAR file

# Find the JAR file (exclude .original files)
JAR_FILE=$(find target -name "*.jar" -not -name "*.original" | head -1)

if [ -z "$JAR_FILE" ]; then
    echo "ERROR: No JAR file found in target directory"
    echo "Contents of target directory:"
    ls -la target/ || echo "target directory does not exist"
    exit 1
fi

echo "Starting application with JAR: $JAR_FILE"
java -jar "$JAR_FILE"


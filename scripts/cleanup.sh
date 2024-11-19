#!/bin/bash

# Function to check if a port is in use
check_port() {
    lsof -i :$1 >/dev/null 2>&1
    return $?
}

# Function to kill process on a port
kill_port() {
    echo "Checking port $1..."
    if check_port $1; then
        echo "Killing process on port $1..."
        lsof -ti :$1 | xargs kill -9
        echo "Process killed"
    else
        echo "No process running on port $1"
    fi
}

echo "🧹 Starting cleanup process..."

# Kill process on port 3003
kill_port 3003

# Clear Bun's cache
echo "🗑️  Clearing Bun's cache..."
bun pm cache rm

# Remove node_modules and other build artifacts
echo "🗑️  Removing node_modules and build artifacts..."
rm -rf node_modules
rm -rf .next
rm -rf dist
rm -rf build
rm -rf bun.lockb

# Clear watchman watches if watchman is installed
if command -v watchman >/dev/null 2>&1; then
    echo "🔄 Clearing watchman watches..."
    watchman watch-del-all
fi

# Install dependencies with Bun
echo "📦 Installing dependencies..."
bun install

# Build the project with Bun
echo "🏗️  Building project..."
bun run build

echo "✨ Cleanup complete! You can now start your development server with 'bun run dev'"

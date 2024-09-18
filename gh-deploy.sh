#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "Error: Git is not installed."
    exit 1
fi

# Check if the directory is a Git repository
if ! git rev-parse --is-inside-work-tree &> /dev/null; then
    echo "Error: This directory is not a Git repository."
    exit 1
fi

# Get the remote repository URL
REPO_URL=$(git remote get-url origin)

# Build the Flutter web app
flutter build web --web-renderer html

# Navigate to the build directory
cd build/web || exit

# Modify the index.html file
sed -i '/<base href="\/">/d' index.html # Comment this line if you need the base href specified

# Initialize a new Git repository
git init
git add .
git commit -m "GitHub Pages Deploy"
git branch -M ghpages

# Add remote origin only if it is not already set
if ! git remote get-url origin &> /dev/null; then
    git remote add origin "$REPO_URL"
fi

git push -u origin ghpages --force
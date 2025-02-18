#!/bin/bash

# Set Git user name and email
git config --global user.name "timirchandra"
git config --global user.email "chandra.timir33@outlook.com"

# Add changes to staging
git add .

# Commit the changes
git commit -m "Your commit message here"

# Check if 'origin' remote exists
git remote -v > /dev/null 2>&1
if [ $? -eq 0 ]; then
    # Remote exists, push to the appropriate branch
    current_branch=$(git branch --show-current)
    if [ "$current_branch" == "main" ]; then
        git push origin main
    else
        git push origin master
    fi
else
    # Remote doesn't exist, display an error message
    echo "No remote repository found. Please add a remote using 'git remote add origin <URL>'"
    exit 1
fi

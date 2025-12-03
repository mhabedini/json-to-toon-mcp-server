#!/bin/bash
# GitHub Repository Creation Helper Script

echo "🚀 GitHub Repository Creation Helper"
echo "===================================="
echo ""
echo "To create a GitHub repository for this project, please follow these steps:"
echo ""
echo "1. Go to https://github.com/new"
echo "2. Create a new repository with the following details:"
echo "   - Repository name: json-to-toon-mcp-server"
echo "   - Description: MCP server for converting JSON to TOON format - saves 30-60% on AI tokens"
echo "   - Public/Private: Choose as you prefer"
echo "   - Initialize with README: NO (we already have one)"
echo "   - Add .gitignore: NO (we already have one)"
echo "   - Add license: NO (we already have one)"
echo ""
echo "3. After creating the repository, copy the repository URL"
echo "4. Run the following commands to push your code:"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/json-to-toon-mcp-server.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "Replace YOUR_USERNAME with your actual GitHub username."
echo ""
echo "Your git configuration:"
git config --global user.name
git config --global user.email
echo ""
echo "Current repository status:"
git status
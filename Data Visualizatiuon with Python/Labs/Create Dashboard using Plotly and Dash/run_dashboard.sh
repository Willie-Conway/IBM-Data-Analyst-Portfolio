#!/usr/bin/env bash

# Exit immediately if a command fails
set -e

echo "🚀 Starting Dash Dashboard Setup..."

# Check for Python 3
if ! command -v python3 &> /dev/null
then
    echo "❌ Python3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv .venv
fi

# Activate virtual environment
echo "🔑 Activating virtual environment..."
source .venv/bin/activate

# Upgrade pip
echo "⬆️ Upgrading pip..."
pip install --upgrade pip

# Install required packages
echo "📥 Installing dependencies..."
pip install dash pandas plotly more-itertools packaging setuptools

# Run the Dash app
echo "▶️ Running Dash application..."
python DV0101EN-Final-Assign-Part-2-Questions.py


# ▶️ How to Use It
# chmod +x run_dashboard.sh
# ./run_dashboard.sh


# Once it runs:

# Watch the terminal for the port number

# Use Launch Application in Skills Network

# Enter that port
#!/bin/bash

# Exit immediately if a command fails
set -e

echo "🚀 Starting Dash Basics setup..."

# Step 1: Install required Python packages
echo "📦 Installing required Python packages..."
python3.8 -m pip install --upgrade pip
python3.8 -m pip install packaging pandas dash plotly httpx==0.20

# Step 2: Create dash_basics.py
echo "📝 Creating dash_basics.py..."

cat << 'EOF' > dash_basics.py
# Import required packages
import pandas as pd
import plotly.express as px
import dash
from dash import dcc
from dash import html

# Read the airline data into pandas dataframe
airline_data = pd.read_csv(
    'https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMDeveloperSkillsNetwork-DV0101EN-SkillsNetwork/Data%20Files/airline_data.csv',
    encoding="ISO-8859-1",
    dtype={
        'Div1Airport': str,
        'Div1TailNum': str,
        'Div2Airport': str,
        'Div2TailNum': str
    }
)

# Randomly sample 500 data points
data = airline_data.sample(n=500, random_state=42)

# Pie Chart Creation
fig = px.pie(
    data,
    values='Flights',
    names='DistanceGroup',
    title='Distance group proportion by flights'
)

# Create a dash application
app = dash.Dash(__name__)

# Application layout
app.layout = html.Div(children=[
    html.H1(
        'Airline Dashboard',
        style={'textAlign': 'center', 'color': '#503D36', 'font-size': 40}
    ),
    html.P(
        'Proportion of distance group (250 mile distance interval group) by flights.',
        style={'textAlign': 'center', 'color': '#F57241'}
    ),
    dcc.Graph(figure=fig)
])

# Run the application
if __name__ == '__main__':
    app.run()
EOF

# Step 3: Run the Dash app
echo "✅ Setup complete!"
echo "🌐 Running Dash application..."
python3.8 dash_basics.py



# ▶️ How to Use It
# chmod +x run_dash_basics.sh
# ./run_dash_basics.sh


# Watch the terminal for the port number

# Click Launch Application

# Enter the port

# Dashboard opens 🎉
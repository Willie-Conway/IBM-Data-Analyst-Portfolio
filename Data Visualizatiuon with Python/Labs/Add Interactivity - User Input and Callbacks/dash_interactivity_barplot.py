# Import required libraries
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
import dash
from dash import dcc
from dash import html
from dash.dependencies import Input, Output

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

# Create a dash application
app = dash.Dash(__name__)

# Application layout
app.layout = html.Div(children=[
    html.H1(
        'Total number of flights to the destination state split by reporting airline',
        style={'textAlign': 'center', 'color': '#503D36', 'font-size': 50}
    ),

    html.Div(
        [
            "Input Year: ",
            dcc.Input(
                id='input-year',
                value='2010',
                type='number',
                style={'height': '50px', 'font-size': 35}
            )
        ],
        style={'font-size': 40}
    ),

    html.Br(),
    html.Br(),

    html.Div(dcc.Graph(id='bar-plot'))
])

# Callback decorator
@app.callback(
    Output(component_id='bar-plot', component_property='figure'),
    Input(component_id='input-year', component_property='value')
)
def get_graph(entered_year):
    # Filter data by selected year
    df = airline_data[airline_data['Year'] == int(entered_year)]

    # Group data by destination state and sum flights
    bar_data = df.groupby('DestState')['Flights'].sum().reset_index()

    # Create bar chart
    fig = px.bar(
        bar_data,
        x='DestState',
        y='Flights',
        title='Flights to Destination State'
    )

    fig.update_layout(
        xaxis_title='Destination State',
        yaxis_title='Total Flights'
    )

    return fig

# Run the app
if __name__ == '__main__':
    app.run(port=8060)

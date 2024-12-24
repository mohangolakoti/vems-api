import pandas as pd
import numpy as np
import pickle
import sys
import json
from datetime import datetime, timedelta
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import os
script_dir = os.path.dirname(os.path.abspath(__file__))
data_file_path = os.path.join(script_dir, '../models/industry_data.csv') 
model_file_path = os.path.join(script_dir, '../models/energymodel.pkl')

# Load the dataset (historical data) to calculate day numbers
data = pd.read_csv(data_file_path)  # Replace with your file path
data['date'] = pd.to_datetime(data['Date'])  # Ensure correct column name
data['day_number'] = (data['date'] - data['date'].min()).dt.days

# Load the trained model
with open(model_file_path, 'rb') as f:
    model = pickle.load(f)

def predict_next_week(model, data, start_date):
    """Predict energy consumption for the next 7 days starting from start_date."""
    day_offset = (start_date - data['date'].min()).days
    next_week_days = pd.DataFrame({'day_number': [day_offset + i for i in range(1, 8)]})  # Create DataFrame
    predictions = model.predict(next_week_days)
    return [
        {
            'date': (start_date + timedelta(days=i)).strftime('%Y-%m-%d'),
            'predicted_units': round(pred, 2)
        }
        for i, pred in enumerate(predictions)
    ]

def predict_next_month(model, data, start_date):
    """Predict the total energy consumption for the next 30 days starting from start_date."""
    day_offset = (start_date - data['date'].min()).days
    next_month_days = pd.DataFrame({'day_number': [day_offset + i for i in range(1, 31)]})
    predictions = model.predict(next_month_days)
    return round(sum(predictions), 2)

# Get the current date from command-line arguments or default to today
if len(sys.argv) > 1:
    today = datetime.strptime(sys.argv[1], '%Y-%m-%d')
else:
    today = datetime.now()

# Predictions for the next 7 days
next_week_predictions = predict_next_week(model, data, today)

# Predictions for the next month
next_month_prediction = predict_next_month(model, data, today)

# Output as JSON
output = {
    "next_week_predictions": next_week_predictions,
    "next_month_prediction": next_month_prediction
}

# Print JSON output (this will be consumed by the Node.js controller)
print(json.dumps(output))

""" import joblib
import pandas as pd
import sys
from datetime import datetime, timedelta
import json

# Load the trained model
model = joblib.load(r'D:/VS Code/EEE-PNEW/energy-api/models/energymodel.pkl')

# Get the start date (default to today if not provided)
if len(sys.argv) > 1:
    start_date = sys.argv[1]
else:
    start_date = datetime.now().strftime('%Y-%m-%d')

start_date = datetime.strptime(start_date, '%Y-%m-%d')

# Generate dates for the next 7 days
future_dates = [start_date + timedelta(days=i) for i in range(7)]

# Create input data
input_data = pd.DataFrame({
    'day_of_year': [date.timetuple().tm_yday for date in future_dates],
    'year': [date.year for date in future_dates]
})

# Make predictions
predictions = model.predict(input_data)

# Prepare results as JSON-serializable data
result = [
    {'date': date.strftime('%Y-%m-%d'), 'predicted_units': float(units)}
    for date, units in zip(future_dates, predictions)
]

# Output the result as JSON
print(json.dumps(result)) """
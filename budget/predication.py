import pandas as pd
from sklearn.linear_model import LinearRegression

# Step 1: Load the dataset
data = pd.read_csv('budget.csv')


# Filter data for years 2015 to 2026
data = data[(data['f_year'] >= 2015) & (data['f_year'] <= 2025)]

# Step 3: Train models for each item and department combination
items = data['item'].unique()
depts = data['dept'].unique()

models_budgeted = {}

for item in items:
    for dept in depts:
        # Filter data for the current item and department
        item_dept_data = data[(data['item'] == item) & (data['dept'] == dept)]
        
        # Create lagged features
        item_dept_data['actual_exp_lag1'] = item_dept_data['actual_exp'].shift(1)
        
        # Drop the first row since it will have NaN values due to shifting
        item_dept_data = item_dept_data.dropna()
        
        # Define features and target variable
        X = item_dept_data[['actual_exp_lag1']]
        y_budgeted = item_dept_data['budgeted_amt']
        
        # Train the model
        model = LinearRegression()
        model.fit(X, y_budgeted)
        
        # Store the trained model in a dictionary
        models_budgeted[(item, dept)] = model

# Step 4: Make predictions for the year 2027
predictions = []

for item in items:
    for dept in depts:
        # Get the trained model for the current item and department
        model_budgeted = models_budgeted[(item, dept)]
        
        # Predict budgeted_amt for the year 2027
        predicted_budgeted_amt = int(model_budgeted.predict([[data.loc[(data['item'] == item) & (data['dept'] == dept) & (data['f_year'] == 2025), 'actual_exp'].values[0]]]))
        
        # Append predictions to the list
        predictions.append({'item': item, 'dept': dept, 'predicted_budgeted_amt': predicted_budgeted_amt})

# Step 5: Save predictions to a CSV file
predictions_df = pd.DataFrame(predictions)
predictions_df.to_csv('predictions_2026.csv', index=False)
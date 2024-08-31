import pandas as pd
import numpy as np
import pickle

def predict_budgeted_amount(budget_data, target_dept, model_file='model.pkl'):
    # Load the saved models
    with open(model_file, 'rb') as f:
        models_budgeted = pickle.load(f)
    # Convert queryset to DataFrame
    data = pd.DataFrame(list(budget_data.values()))
    # Filter data for the target department only
    data = data[data['dept'] == target_dept]
    items = data['item'].unique()
    predictions = []
    for item in items:
        model_budgeted, pca = models_budgeted[item]
        # Convert the feature to NumPy array
        X_next_year = np.array(data.loc[data['item'] == item, 'actual_exp'].values[-1]).reshape(1, -1)
        X_next_year_pca = pca.transform(X_next_year)
        predicted_budgeted_amt = int(model_budgeted.predict(X_next_year_pca))
        item_mapping = {
            'LAB-CONSUME': 'Laboratory Consumables',
            'LAB-EQ': 'Laboratory Equipment',
            'MAINT-SPARE': 'Maintenance and Spares',
            'MISC': 'Miscellaneous expenses',
            'RND': 'Research and Development',
            'SOFT': 'Software',
            'T&T': 'Training and Travel'
        }
        item_ = item_mapping.get(item, item)
        predictions.append({'item': item_, 'predicted_budgeted_amt': predicted_budgeted_amt})
    return pd.DataFrame(predictions)
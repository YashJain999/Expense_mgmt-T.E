import pandas as pd
import numpy as np
from sklearn.decomposition import PCA
from sklearn.linear_model import LinearRegression
import pickle

def train_and_save_model(budget_data, target_dept, model_file='model.pkl'):
    # Convert queryset to DataFrame
    data = pd.DataFrame(list(budget_data.values()))

    # Filter data for the target department only
    data = data[data['dept'] == target_dept]

    items = data['item'].unique()
    models_budgeted = {}

    for item in items:
        item_data = data[data['item'] == item].copy()
        item_data['actual_exp_lag1'] = item_data['actual_exp'].shift(1)
        item_data.dropna(inplace=True)

        X = item_data[['actual_exp_lag1']].values  # Convert to NumPy array
        y_budgeted = item_data['budgeted_amt'].values  # Convert to NumPy array

        pca = PCA(n_components=1)
        X_pca = pca.fit_transform(X)

        model = LinearRegression()
        model.fit(X_pca, y_budgeted)

        models_budgeted[item] = (model, pca)

    # Save the models to a file
    with open(model_file, 'wb') as f:
        pickle.dump(models_budgeted, f)

    print(f"Model saved to {model_file}")

# Example usage
# train_and_save_model(budget_data, target_dept)

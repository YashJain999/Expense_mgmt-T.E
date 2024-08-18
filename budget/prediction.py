import pandas as pd
from sklearn.decomposition import PCA
from sklearn.linear_model import LinearRegression
import warnings
from sklearn.exceptions import DataConversionWarning

warnings.filterwarnings("ignore", category=DataConversionWarning)

def predict_budgeted_amount(budget_data, target_dept):
    # Convert queryset to DataFrame
    data = pd.DataFrame(list(budget_data.values()))

    # Filter data for the target department only
    data = data[data['dept'] == target_dept]

    # Train models for each item and department combination
    items = data['item'].unique()

    models_budgeted = {}

    for item in items:
        # Filter data for the current item
        item_data = data[data['item'] == item].copy()

        # Create lagged features
        item_data.loc[:, 'actual_exp_lag1'] = item_data['actual_exp'].shift(1)

        # Drop the first row since it will have NaN values due to shifting
        item_data.dropna(inplace=True)

        # Define features and target variable
        X = item_data[['actual_exp_lag1']]
        y_budgeted = item_data['budgeted_amt']

        # Apply Principal Component Analysis (PCA)
        pca = PCA(n_components=1)
        X_pca = pca.fit_transform(X)

        # Train the model
        model = LinearRegression()
        model.fit(X_pca, y_budgeted)

        # Store the trained model in a dictionary
        models_budgeted[item] = (model, pca)

    # Make predictions for the next year
    predictions = []

    for item in items:
        # Get the trained model for the current item
        model_budgeted, pca = models_budgeted[item]

        # Predict budgeted_amt for the next year
        X_next_year = data.loc[data['item'] == item, 'actual_exp'].values[-1].reshape(1, -1)
        X_next_year_pca = pca.transform(X_next_year)
        predicted_budgeted_amt = int(model_budgeted.predict(X_next_year_pca))

        # Append predictions to the list
        if item == 'LAB-CONSUME':
            item_='Laboratory Consumables'
        if item == 'LAB-EQ':
            item_='Laboratory Equipment'
        if item == 'MAINT-SPARE':
            item_='Maintenance and Spares'
        if item == 'MISC':
            item_='Miscellaneous expenses'
        if item == 'RND':
            item_='Research and Development'
        if item == 'SOFT':
            item_='Software'
        if item == 'T&T':
            item_='Training and Travel'
        predictions.append({'item': item_, 'predicted_budgeted_amt': predicted_budgeted_amt})

    return pd.DataFrame(predictions)

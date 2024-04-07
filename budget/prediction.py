# import pandas as pd
# from sklearn.decomposition import PCA
# from sklearn.linear_model import LinearRegression

# def predict_budgeted_amount(budget_data):
#     # Convert queryset to DataFrame
#     data = pd.DataFrame(list(budget_data.values()))

#     # Train models for each item and department combination
#     items = data['item'].unique()
#     depts = data['dept'].unique()

#     models_budgeted = {}

#     for item in items:
#         for dept in depts:
#             # Filter data for the current item and department
#             item_dept_data = data[(data['item'] == item) & (data['dept'] == dept)]

#             # Create lagged features
#             item_dept_data.loc[:, 'actual_exp_lag1'] = item_dept_data['actual_exp'].shift(1)

#             # Drop the first row since it will have NaN values due to shifting
#             item_dept_data = item_dept_data.dropna()

#             # Define features and target variable
#             X = item_dept_data[['actual_exp_lag1']]
#             y_budgeted = item_dept_data['budgeted_amt']

#             # Apply Principal Component Analysis (PCA)
#             pca = PCA(n_components=1)
#             X_pca = pca.fit_transform(X)

#             # Train the model
#             model = LinearRegression()
#             model.fit(X_pca, y_budgeted)

#             # Store the trained model in a dictionary
#             models_budgeted[(item, dept)] = (model, pca)

#     # Make predictions for the next year
#     predictions = []

#     for item in items:
#         for dept in depts:
#             # Get the trained model for the current item and department
#             model_budgeted, pca = models_budgeted[(item, dept)]

#             # Predict budgeted_amt for the next year
#             X_next_year = data.loc[(data['item'] == item) & (data['dept'] == dept), 'actual_exp'].values[-1].reshape(1, -1)
#             X_next_year_pca = pca.transform(X_next_year)
#             predicted_budgeted_amt = int(model_budgeted.predict(X_next_year_pca))

#             # Append predictions to the list
#             predictions.append({'item': item, 'dept': dept, 'predicted_budgeted_amt': predicted_budgeted_amt})

#     return pd.DataFrame(predictions)



# import pandas as pd
# from sklearn.decomposition import PCA
# from sklearn.linear_model import LinearRegression
# import warnings
# from sklearn.exceptions import DataConversionWarning

# warnings.filterwarnings("ignore", category=DataConversionWarning)


# def predict_budgeted_amount(budget_data):
#     # Convert queryset to DataFrame
#     data = pd.DataFrame(list(budget_data.values()))

#     # Train models for each item and department combination
#     items = data['item'].unique()
#     depts = data['dept'].unique()

#     models_budgeted = {}

#     for item in items:
#         for dept in depts:
#             # Filter data for the current item and department
#             item_dept_data = data[(data['item'] == item) & (data['dept'] == dept)].copy()  # Use .copy() to avoid SettingWithCopyWarning

#             # Create lagged features
#             item_dept_data.loc[:, 'actual_exp_lag1'] = item_dept_data['actual_exp'].shift(1)

#             # Drop the first row since it will have NaN values due to shifting
#             item_dept_data.dropna(inplace=True)  # Use inplace=True to modify the DataFrame in place

#             # Define features and target variable
#             X = item_dept_data[['actual_exp_lag1']]
#             y_budgeted = item_dept_data['budgeted_amt']

#             # Apply Principal Component Analysis (PCA)
#             # pca = PCA(n_components=1, svd_solver='full', suppress=True)     
#             pca = PCA(n_components=1)        
#             X_pca = pca.fit_transform(X)

#             # Train the model
#             model = LinearRegression()
#             model.fit(X_pca, y_budgeted)

#             # Store the trained model in a dictionary
#             models_budgeted[(item, dept)] = (model, pca)

#     # Make predictions for the next year
#     predictions = []

#     for item in items:
#         for dept in depts:
#             # Get the trained model for the current item and department
#             model_budgeted, pca = models_budgeted[(item, dept)]

#             # Predict budgeted_amt for the next year
#             X_next_year = data.loc[(data['item'] == item) & (data['dept'] == dept), 'actual_exp'].values[-1].reshape(1, -1)
#             X_next_year_pca = pca.transform(X_next_year)
#             predicted_budgeted_amt = int(model_budgeted.predict(X_next_year_pca))

#             # Append predictions to the list
#             predictions.append({'item': item, 'dept': dept, 'predicted_budgeted_amt': predicted_budgeted_amt})

#     return pd.DataFrame(predictions)
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
        predictions.append({'item': item, 'dept': target_dept, 'predicted_budgeted_amt': predicted_budgeted_amt})

    return pd.DataFrame(predictions)


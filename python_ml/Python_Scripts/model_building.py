# *************** MODEL BUILDING FUNCTIONS *******************
# add libraries
import json
from Python_Scripts.utility_functions import *
from sklearn import linear_model

def run_linear_regression(read_path, write_path):
    X_train, X_test, Y_train, Y_test = read_split_sets(read_path)
    lm = linear_model.LinearRegression()
    lm.fit(X_train, Y_train)
    Y_pred = lm.predict(X_test)
    write_model_results(write_path, Y_pred, Y_test)
    return('done')
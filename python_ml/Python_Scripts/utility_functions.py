import pandas as pd
import json

from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
from sklearn.metrics import mean_squared_error

def read_data(path):
    res = pd.read_json(path)
    return(res)

def df_to_json(df):
    res = df.to_json(orient='records')
    return(res)

cnt = 0
def ndarray_to_list(nd_array):
    global cnt
    cnt += 1
    if(cnt == 1):
        res = nd_array.tolist()
    else:
        res = nd_array[0].tolist()
    return(res)

def read_split_sets(read_path):
    with open(read_path) as f:
        all_sets = json.load(f)
    X_train = pd.DataFrame(all_sets[0]['X_train'])
    X_test = pd.DataFrame(all_sets[0]['X_test'])
    Y_train = pd.DataFrame(all_sets[0]['Y_train'])
    Y_test = pd.DataFrame(all_sets[0]['Y_test'])
    return X_train, X_test, Y_train, Y_test

def read_model_results(read_path):
    with open(read_path) as f:
        all_sets = json.load(f)
    Y_pred = all_sets[0]['Y_pred']
    Y_test = all_sets[0]['Y_test']
    return Y_pred, Y_test

def write_split_sets(write_path, X_train, X_test, Y_train, Y_test):
    datasets = [X_train, X_test, Y_train, Y_test]
    dataset_names = ['X_train', 'X_test', 'Y_train', 'Y_test']
    hold_outer = {}
    hold_final = []
    for i in range(len(datasets)):
        res = df_to_json(datasets[i])
        hold_outer[dataset_names[i]] = json.loads(res)
    hold_final.append(hold_outer)
    with open(write_path, 'w') as f:
        json.dump(hold_final, f)

def write_model_results(write_path, Y_pred, Y_test):
    datasets = [Y_pred, Y_test]
    dataset_names = ['Y_pred', 'Y_test']
    hold_outer = {}
    hold_final = []
    for i in range(len(datasets)):
        res = ndarray_to_list(datasets[i])
        hold_outer[dataset_names[i]] = res
    hold_final.append(hold_outer)
    with open(write_path, 'w') as f:
        json.dump(hold_final, f)

def create_train_test(read_path, target_feature, split_percentage=0.33):
    res = read_data(read_path)
    X = res.drop(target_feature, axis=1)
    X = X._get_numeric_data()
    Y = res[target_feature]
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=split_percentage, random_state=5)
    return X_train, X_test, Y_train, Y_test

def r_squared(y_true, y_predict):
    score = r2_score(y_true, y_predict)
    return(score)

def mse(y_true, y_predict):
    m_s_error = mean_squared_error(y_true, y_predict)
    return(m_s_error)
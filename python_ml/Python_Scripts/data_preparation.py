# *************** DATA PREPARATION FUNCTIONS *******************
# add libraries
from Python_Scripts.utility_functions import *
import json

def split_data(read_path, write_path, target_feature, split_percentage):
    X_train, X_test, Y_train, Y_test = create_train_test(read_path, target_feature, split_percentage)
    write_split_sets(write_path, X_train, X_test, Y_train, Y_test)

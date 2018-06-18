# *************** DATA GATHERING AND EXPLORATION FUNCTIONS *******************
# add libraries
from Python_Scripts.utility_functions import *
import matplotlib.pyplot as plt
import missingno as mn

def show_missing(read_path, write_path):
    res = read_data(read_path)
    mn.matrix(res)
    plt.savefig(write_path)
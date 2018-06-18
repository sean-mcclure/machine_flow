# *************** MODEL VALIDATION FUNCTIONS *******************
# add libraries
from Python_Scripts.utility_functions import *
import matplotlib.pyplot as plt
from sklearn import metrics

plt.rcParams["figure.figsize"] = (6, 3)

def actual_vs_predicted(read_path, write_path):
    Y_pred, Y_test = read_model_results(read_path)
    plt.scatter(Y_test, Y_pred, color="#33AADE")
    plt.xlabel("Actual")
    plt.ylabel("Predicted")
    plt.title("Actual vs Predicted")
    plt.subplots_adjust(bottom=0.2)
    plt.savefig(write_path, dpi = 300)

def show_mse(read_path, write_path):
    Y_pred, Y_test = read_model_results(read_path)
    mse_res = mse(Y_test, Y_pred)
    plt.bar(1, mse_res, align='center', alpha=0.5)
    plt.title('Mean Squared Error')
    plt.ylabel('Error')
    plt_msg = 'Error: ' + str(round(mse_res, 3))
    plt.xlabel(plt_msg)
    plt.xticks([])
    plt.savefig(write_path, dpi=300)

def show_r_squared(read_path, write_path):
    Y_pred, Y_test = read_model_results(read_path)
    r_s = r_squared(Y_test, Y_pred)
    plt.bar(1, r_s, align='center', alpha=0.5)
    plt.title('Coefficient of Determination')
    plt.ylabel('R^2')
    plt_msg = 'R-Squared: ' + str(round(r_s, 3))
    plt.xlabel(plt_msg)
    plt.xticks([])
    plt.savefig(write_path, dpi=300)


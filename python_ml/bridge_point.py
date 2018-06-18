import sys
import os

from Python_Scripts.data_gathering import *
from Python_Scripts.data_preparation import *
from Python_Scripts.model_building import *
from Python_Scripts.model_validation import *
from Python_Scripts.utility_functions import *

function_choice = sys.argv[1]

result = eval(function_choice)

print(result)
sys.stdout.flush()
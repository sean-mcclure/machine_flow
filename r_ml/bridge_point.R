source('R_Scripts/data_gathering.R')
source('R_Scripts/data_preparation.R')
source('R_Scripts/model_building.R')
source('R_Scripts/model_validation.R')
source('R_Scripts/utility_functions.R')

eval(parse(text=function_choice))
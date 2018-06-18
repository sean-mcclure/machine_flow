myArgs <- commandArgs(trailingOnly = TRUE)
function_choice <- myArgs[1]

# *************** DATA PREPARATION FUNCTIONS *******************
library(methods)
library(jsonlite)

normalize_data <- function(read_path, write_path) {
    res <- read_json(read_path)
    res <- res[sapply(res, is.numeric)]
    res <- data.frame(lapply(res, normalize))
    res_json <- toJSON(res)
    write(res_json, file=write_path)
    return('done')
    }

remove_features <- function(read_path, write_path, features) {
    res <- read_json(read_path)
    rem_vec <- unlist(strsplit(features, ', '))
    res <- res[,!(names(res) %in% rem_vec)]
    res_json <- toJSON(res)
    write(res_json, file=write_path)
    return('done')
    }

# ************************************************
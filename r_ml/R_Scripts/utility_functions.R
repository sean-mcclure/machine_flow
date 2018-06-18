library(methods)
library(jsonlite)

list_data <- function(read_path, write_path) {
    res <- toJSON(list.files(read_path, pattern = ".json"))
    write(res, file=write_path)
    return('done')
    }

#******** other useful functions

read_json <- function(path) {
    res <- fromJSON(path)
    return(res)
    }

draw_multiple <- function(frame) {
    use_frame <- frame[sapply(frame, is.numeric)]
    if(length(names(use_frame)) > 4) { use_frame <- use_frame[,-(5:ncol(use_frame))]}
    par(mfrow = c(1, length(names(use_frame))))
    for(i in 1:length(names(use_frame))) {
        hist(use_frame[[i]], main = names(use_frame)[i], col='#33AADE', xlab='')
    }
    }

normalize <- function(x) {
    return ((x - min(x)) / (max(x) - min(x)))
    }
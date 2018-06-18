myArgs <- commandArgs(trailingOnly = TRUE)
function_choice <- myArgs[1]

# *************** DATA GATHERING & EXPLORATION FUNCTIONS *******************
# add libraries
library(methods)

show_outliers <- function(read_path, write_path, feature) {
    res <- read_json(read_path)
    res <- res[sapply(res, is.numeric)]
    png(write_path, 10, 4, res=300, units='in')
    if(feature == 'ALL') {boxplot(res, col="#33AADE", outcol="red")} else {boxplot(res[[feature]], col="#33AADE", outcol="red")}
    title(feature)
    return('done')
    }

show_distribution <- function(read_path, write_path, feature) {
    res <- read_json(read_path)
    res <- res[sapply(res, is.numeric)]
    png(write_path, 10, 4, res=300, units='in')
    if(feature == 'ALL') {draw_multiple(res)} else {hist(res[[feature]], probability=TRUE, col="#33AADE", main=NA, xlab='')}
    lines(density(res[[feature]]), col='red', lwd=3)
    title(feature)
    return('done')
    }

# ************************************************
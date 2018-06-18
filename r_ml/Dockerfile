FROM r-base

# install R packages
RUN R -e  "install.packages(c('dplyr', 'tidyr'), repos = 'http://cran.us.r-project.org', dependencies=TRUE)"

# install node
RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm

ADD . /app

# install node dependencies
RUN cd /app; npm install

WORKDIR /app

EXPOSE 9191

CMD node connect.js

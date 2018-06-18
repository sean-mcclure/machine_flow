FROM nikolaik/python-nodejs

# install Python modules
RUN pip3 install -U numpy
RUN pip3 install -U scipy
RUN pip3 install -U scikit-learn

ADD . /app

# install node dependencies
#RUN cd /app; npm install

WORKDIR /app

EXPOSE 8181

CMD node connect.js

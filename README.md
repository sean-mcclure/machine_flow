
# MACHINE FLOW  
  
Machine Flow is an application for GUI-fying machine learning workflows to rapidly discover viable pipelines. Machine Flow keeps track of data dependencies using dependency graphs (created dynamically on the front-end).
  
## Getting Started  
  
These instructions will get Machine Flow up-and-running on your local machine. Machine Flow can be run in 2 different modes; **Develop Mode** and **Service Mode**. The following instructions are for Develop Mode.  
See the Deployment section for how to deploy Machine Flow in Service Mode.  
  
### Prerequisites  
You will need the following installed on your machine:  
* R  
* Python  
* Node.js / Express  
* Docker (if running in service mode)  
  
Installing R  
https://www.r-project.org  
  
Installing Python 3  
https://www.python.org/downloads/  
  
Installing Node.js  
https://nodejs.org/en/download/  
  
Installing Express  
https://expressjs.com/en/starter/installing.html  
  
Installing Docker  
https://docs.docker.com/install/  
  
  
### Downloading Machine Flow  
  
You can click the **Clone or download** button on this page to get all necessary files. Even quicker, run the following command in terminal:  
```  
git clone https://github.com/WorldofDataScience/machine_flow.git  
```  
  
### Launch App
Once you have cloned the Machine Flow project from GitHub you can change into the machine_flow directory. You can then launch a simple web server using Python:
```
python3 -m http.server
```
**NOTE**: You must run this command *from inside the machine_flow directory*.  

Open your browser and head to: http://localhost:8000/app/machine_flow.html 

### Adding Data  
Datasets are added to the *data folder*. Any dataset added must be in JSON format. Here is an example using **R** to add the [Boston Housing Dataset](https://raw.githubusercontent.com/selva86/datasets/master/BostonHousing.csv) from a URL:  
```  
library(jsonlite)  
  
df <- read.csv('https://url_to_boston.csv')  
df_json <- toJSON(df)  
write(df_json, file='data/boston.json')  
```  
This adds the Boston dataset in JSON format to the data folder. In **Python** this can be done as follows:  
```  
import pandas as pd  
import json  
  
df = pd.read_csv('https://url_to_boston.csv')  
  
with open('data/boston.json', 'w') as f:  
    f.write(df.to_json(orient='records'))  
```  
  
NOTE: The above examples write **JSON** data in the following expected format, with each observation as its own object inside the final array:  
  
```  
[{  
 "feature_a": "100",  
 "feature_b": "150",  
 "feature_c": "40"  
}, {  
 "feature_a": "720",  
 "feature_b": "14",  
 "feature_c": "431"  
},  
....  
}]  
```  
### Starting Develop Mode  
Develop Mode allows real-time changes to R and Python code in the back-end, without having to restart the service. This enables rapid back-and-forth prototyping between your machine learning code and your front-end workflow.  
  
To start Develop Mode, open terminal and change into the r_ml directory. Open a new tab and change into the python_ml directory.  In each of these tabs run the following command:  
```  
node connect.js  
```  
**NOTE**: You must run this command *from inside the r_ml and python_ml directories*.  
  
This will expose all R code on port **9191** and all python code on port **8181**.  
  
### Writing Functions  
All functions must be written in either R or Python, and placed in one of the following files:  
  
 **R_Scripts**  
* data_gathering.R  
* data_preparation.R  
* model_building.R  
* model_validation.R  
  
**Python_Scripts**  
* data_gathering.py  
* data_preparation.py  
* model_building.py  
* model_validation.py  
  
There is also a *utility_functions* file provided for each language.  
  
Any function written in these files is automatically exposed through its respective service.  
  
All functions must conform to a few **requirements** in order to work with Machine Flow. The following shows an example R function meeting these requirements:  
  
![example function in Machine Flow](http://collaboratescience.com/gifs/example_function.png)  
  
The first 2 arguments are **read_path** and **write_path**, followed by any arguments needed for the function. The read_path and write_path are automatically passed by Machine Flow's front-end. Custom code must live between where data are read and where files are written. Also, each function must end with a return('done') statement.  
  
YOUR FIRST FUNCTION  
  
You *must* provide the following **list_data** function so Machine Flow can access any data added to the data folder. Here is an example of the list_data function written in R:  
```  
list_data <- function(read_path, write_path) {  
    res <- toJSON(list.files(read_path, pattern = ".json"))  
    write(res, file=write_path)  
    return('done')  
    }  
```  
The above function can be added to the **utility_functions.R** file.  
  
### Adding Endpoints  
For Machine Flow to access functions in the front-end simply add the endpoint and the function name. The default port for all R functions is 9191. The endpoint on a local machine for any R function will look like this:  
```  
http://localhost:9191/api  
```  
... and for any Python function:  
```  
http://localhost:8181/api  
```  
For example, to **add the list_data function** do the following:  
1. Open ENDPOINTS on the front-end;  
2. Add http://localhost:9191/api to endpoints...;  
3. Add list_data for function name...  
4. Click on DATA option  
5. Click on ADD  
  
![adding list_data function to Machine Flow](http://collaboratescience.com/gifs/list_data.gif)  
  
This same approach is used to add all functions to Machine Flow. The only difference between R and Python functions are the ports on the endpoint.  
  
In the above example we chose **data** as the *expected output*. Expected outputs tell Machine Flow what kind of result to show on a node.  
  
**NOTE**: You must provide an expected output for any added function.  
  
### Adding Function Parameters  
Any function requiring parameters can be added by clicking on the parameters icon:  
  
![adding parameters to function in Machine Flow](http://collaboratescience.com/gifs/params.gif)  
  
Any added parameters will be made available when creating a new task. This ensures added functions run with the correct parameters.  
  
### CREATING TASKS  
Tasks are added by creating nodes in Machine Flow. A new node is created by clicking on any existing node and pressing enter. There are 2 types of nodes in Machine Flow; ADD DATA nodes and ADD TASK nodes.  
  
### ADD DATA nodes  
 ADD DATA nodes start a new *branch* on the workflow, and thus appear in the first layer.  
  
![First layer nodes in Machine Flow.](http://collaboratescience.com/gifs/first_layer.png)  
  
Clicking on ADD DATA of a first-layer node will pop-up a dropdown from which to choose the dataset. Any dataset added to your data folder will appear here (see above section on Adding Data).  
  
 ![Showing added dataset in Machine Flow](http://collaboratescience.com/gifs/show_data.gif)  
  
### ADD TASK nodes  
ADD TASK nodes are where you run any added R or Python functions. Clicking on ADD TASK reveals a dropdown with any function we added in the ENDPOINTS section:  
  
![Choosing a function on an ADD TASK node in Machine Flow.](http://collaboratescience.com/gifs/choosing_feature.png)  
  
Any parameters corresponding to the chosen function are shown as input fields. Filling in the parameters and clicking RUN executes the function in the back-end and returns the result:  
  
![Adding features to a task in Machine Flow.](http://collaboratescience.com/gifs/add_feature.gif)  
  
Choosing a function from the dropdown also shows the BACK-END FUNCTION to be called at the bottom. The first 2 arguments are the read_path and write_path passed to the R or Python function in the back-end. These paths are created and tracked automatically by Machine Flow:  
  
![Machine Flow automatically creates and managed read and write paths.](http://collaboratescience.com/gifs/read_write_paths.png)  
  
The read_path is used to read data from the previous node, while the write_path is where the results of the current node's function are written. If the previous node is an image, Machine Flow will search the current node's path until it reaches the most recently generated dataset.  
  
### Log Files  
Log files are saved to the data folder for both R and Python and are named as follows:  
  
* r_log.log  
* py_log.log  
  
When functions fail, you should check logs to inspect the error.  
  
### Highlighting Paths  
A useful feature in Machine Flow is the ability to highlight any path in the workflow. For example, you can inspect a particularly good (or bad) result by clicking on the **show path** icon in the upper left corner of a task popup:  
  
 ![enter image description here](http://collaboratescience.com/gifs/highlight.gif)  
  
## Deployment (Service Mode)  
  
The true goal of Machine Flow is to automate as many machine learning tasks as possible. Teams should look to actively add R and Python functionality to their team's Machine Flow service, enabling thier practitioners to quickly prototype machine learning workflows.  
  
**NOTE**: Machine Flow does not come with any deployment guarantees baked-in. Organizations are expected to place best-practices around this application as needed.  
  
### Building and Running R and Python Services  
Machine Flow comes with a **docker-compose.yml** file for starting both R and Python services with a single command. This will run R and Python services inside their own Docker containers, each sharing the same data folder. To start Machine Flow in Service Mode open terminal and run the following command:  
```  
docker-compose up  
```  
Docker compose will generate the data folder automatically, mounting it as a volume that exists both inside and outside the container. This means any results written to the data folder inside the R and Python containers are *available real-time to the data folder outside* the running service.  
  
This enables teams to add new data without shutting down the service. In addition, any generated datesets can be taken offline and used separately (e.g. in a Jupyer notebook).  
  
### Setting Read, Write and Results Paths  
You can let Machine Flow know where to read and write results by specifying the read_path and write_path. Click on the gear icon in the upper right corner of the front-end application. These paths are relative to the bridge_point.R and bridge_point.py files and are already set by default. *If you choose to sit the front-end application in a different directory you will need to change the result path*.  
  
  
## Built With  
  
* [Azle](http://azlejs.com) - Rapid front-end prototyping library
* Node.js/Express - Web Framework  
  
  
## Contributing  
  
FRONT-END  
Please familiarize yourself with the Azle library before submitting pull requests.  
  
BACK-END  
Back-end functionality is written in Node.js/Express, Python and R.  
  
NON-TECHNICAL CONTRIBUTION  
Codeless contributions are welcome. If you run into a common machine learning situation not supported by Machine Flow please submit a feature request.  
  
## Versioning  
  
Machine Flow versions are released using GitHub Releases.  
  
## Authors  
  
* **Sean McClure** - *Creator*  
  
## License  
  
This project is licensed under the MIT License.

## Interactive machine learning with Cocktail-Mash

This is a machine learning implementation for Cocktail-Mash. 
Cocktail-Mash is a game developed by inovex and can be controlled by 
a AI trained by this NEAT implementation. 

The process of training the AI can therefore be watched with this implementation.

Additionally to the model a visualized image of the Neural Network and statistic of the learning process will be saved. 

The best Neural Network and statistics supporting the understanding of the learning process are visualized at 
the end of the learning process. 


## How to setup:

### Install all dependencies

For visualizing the neural network ```graphviz``` must be installed at your system:

```
sudo apt-get install graphviz
```

All dependencies for this project can be installed by:

``` 
python3 -m pip install -r requirements.txt
```

## How to run:

### Run a model already trained:

Models saved to the disk can be run directly by providing their path to the ```neat_run.py```. For exammple to run the sample models provided in the repository use:

```
python3.6 neatrun.py model_ai_finish
```

If no path is provided the newest model from the history folder will be loaded.

### Train a new model:

To train a new model just start the training process with the following command:

```
python3.6 neattrain.py
```

All progress will be saved to the ```history/[date_time] ``` folder including: config, graph, network and checkpoints

## Individualize the learning process

There are two config files in this project ``` neat_config.json ``` for general setting and ``` config``` to change
the behaviour of the machine learning process. By changing their settings you can take impact in the traing setup and process.

### neat_config.json

The ``` neat_config.json ``` specifies the learning setup of the game. The options are described in the following:

``` numberOfEvolutions  ```
The numbers of evolutions the model will take by training. Default is 100 the 

``` runNewBest ```
If a genome with a better fitness then all genomes of all generations before emerges run it.

``` runEachGeneration ```
Each n-th generation will be run in the browser so you can watch the training process.



``` numberOfRandomRecipes```
Denotes with which kind of recips the Model will be trained with. There are three options:

- numberOfRandomRecipes > 0: The specified number of random recipes will be used to train the model 

- numberOfRandomRecipes == 0: All 18 possible recipes of the game will be used for training

- numberOfRandomRecipes < 0: All possible recipes plus abs(numberOfRandomRecipes) random recipes will be used for training


```fillSteps``` The amouth of units filled in the glass each step. Default is 10.

```viewNetwork``` True if the Network-Image should be shown after training. They will be saved in any case.

```viewSpeciesGraph``` True if the Species-Graph should be shown after training. They will be saved in any case.

```viewFitnessGraph```True if the Fitness-Graph should be shown after training. They will be saved in any case.

```logToFile``` True if all output should be writen to a logfile. This is usufull if you want to run the training on a server and inspect the output later.

### config 

Only one option has an impact to our implementation all others are just for modifying the training process.

##### num_outputs 
 ```num_outputs``` specifies how many output nodes the model will have. 
If there are 3 outputs the level will be finished by the algorithem as soon as the glass filling exceed 90%. 
This is staticly programmed and thus the network doesn't has any impact on this decision. 
If there are 4 outputs the fourth output will be used to decide if a level is finished. Thus the network is taking this decision by it's own.

- num_outputs == 3: The Algorithem will stop the Level as soon as the Glass is filled by more than 90%.

- num_outputs == 4: The Model itself will decide if when to stop the filling process


All other options are best described in the [NEAT-documentation ](https://neat-python.readthedocs.io/en/latest/config_file.html). 
Feel free to play around with them to learn about their impact to the models quiality. 

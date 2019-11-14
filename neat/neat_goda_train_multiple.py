

import neat_goda_train as godtrain
import os

#This script runs multiple training sessions one after another
#Thus it starts be laoding config0 train a model and continues mit config1
#if there is no directly following numbered config it will stop
if __name__ == '__main__':

    counter = 0
    conf_name = "config" + str(counter)
    run = os.path.isfile(conf_name)
    root = os.getcwd()

    while(os.path.isfile(conf_name)):
        godtrain.main(conf_name)
        counter = counter + 1
        conf_name = "config" + str(counter)
        os.chdir(root)

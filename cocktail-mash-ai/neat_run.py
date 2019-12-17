#!/usr/bin/python3
"""
Implementation of Goda Game
"""

from __future__ import print_function

import asyncio
import fnmatch
import os
import sys
import json
import argparse

import neat.checkpoint as load
from neat.six_util import itervalues
from neat_play import runSingleGame


#Loads best model from a checkpoint folder and runs a game of Goda with it
#If no checkpoint folder is specified the newest checkpoint folder from history folder will be loaded
def main(checkpoint_folder = None):

    if checkpoint_folder is not None:
        #check if specified checkpoint folder exists
        assert (os.path.isdir(checkpoint_folder)), ("Couldn't find specified checkpoint folder:" + checkpoint_folder)
        os.chdir(checkpoint_folder)
    else:
        #search for newest checkpoint
        assert (os.path.isdir("history")), "Couldn't find a history folder. Train model first!"
        checkpoint_folder = os.listdir("history") #all folders
        checkpoint_folder = max(checkpoint_folder) #only most resent folder
        checkpoint_folder = "history/"+checkpoint_folder
        os.chdir(checkpoint_folder)

    #check if config is present
    assert (os.path.isfile("config")), ("config file is missing in folder"+checkpoint_folder)

    #extract newest checkpoint
    checkpoint = os.listdir(".")  # all folders
    checkpoint = fnmatch.filter(checkpoint, 'neat-checkpoint*')  # only checkpoints
    checkpoint = max(checkpoint)  # only newest checkpoints
    assert (checkpoint != None), "Couldn't find any checkpoints or genomes in folder."

    #load genomes newest checkpoint
    population = load.Checkpointer.restore_checkpoint(checkpoint)
    config = population.config
    genomes = population.population

    # load neat_config.json data
    assert (os.path.isfile('neat_config.json')), "neat_config.json file is missing"
    with open('neat_config.json') as config_file:
        config_data = json.load(config_file)
    fillSteps = config_data['fillSteps']

    #find best genome on all genomes
    bestGenome = None
    for g in itervalues(genomes):
        if g.fitness is not None and (bestGenome is None or g.fitness > bestGenome.fitness):
            bestGenome = g

    print("Run game with model from folder {} and fitness of {}".format(checkpoint_folder, bestGenome.fitness))
    asyncio.get_event_loop().run_until_complete(runSingleGame(bestGenome, config, fillSteps))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-f', '--folder',
                        help="Specifiy a folder containing a genome", default=None)
    args = parser.parse_args()
    main(args.folder)


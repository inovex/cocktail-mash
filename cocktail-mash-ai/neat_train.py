#!/usr/bin/python3
"""
Implementation of Goda Game
"""

from __future__ import print_function
import argparse
import os
import asyncio
import neat
import random
import datetime
import shutil
import multiprocessing as mp
import sys
import json

#import from local files
import visualize
#from .visualize import *
from neat_game_emulator import playGameEmulator
from neat_play import runSingleGame

#changeable parameters
numberOfEvolutions = 0
runEachGeneration = 0
runNewBest = False
numberOfRandomRecipes = 0
fillSteps = 0
viewGraphs = False
trainRecipes  = []
viewNetwork = False
viewSpeciesGraph = False
viewFitnessGraph = False

'''recipes = [[255, 255, 255],
           [255,0,0],
           [0,255,0],
           [0,0,255],
           [255, 51, 255],
           [255, 153, 51]] #random training set
'''

#default not chanageable parameters
counter = 0
pool = None
globalBestGenomeFitness = 0


def addRandomColors(n=10):
    global trainRecipes
    for i in range(n):
        trainRecipes.append([random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)])

def addRatioColors():
    global trainRecipes
    ratiosInLevels = [[60,30,10],
             [90,50,30],
             [40,20,10]]

    #for each combination of ratios
    for ratio in ratiosInLevels:
        for ratioA in ratio:
            for ratioB in ratio:
                for ratioC in ratio:
                    if (ratioA is not ratioB is not ratioC):
                        trainRecipes.append(generateRatioColor(ratioA, ratioB, ratioC))

def generateRatioColor(ratioC, ratioM, ratioY):

    sumTotal = ratioC + ratioM + ratioY
    ratioCyan = ratioC / sumTotal
    ratioMagenta = ratioM / sumTotal
    ratioYellow = ratioY / sumTotal
    valueRed = round((ratioMagenta + ratioYellow) * 255)
    valueGreen = round((ratioCyan + ratioYellow) * 255)
    valueBlue = round((ratioCyan + ratioMagenta) * 255)
    return [valueRed, valueGreen, valueBlue]


#evaluate all genomes in a generation
def eval_genomes(genomes, config):
    global trainRecipes, counter, runEachGeneration, pool, fillSteps, globalBestGenomeFitness

    #parallel approach
    pool = mp.Pool(mp.cpu_count())
    jobs = []

    #start a async job for each genome
    for genome_id, genome in genomes:
        jobs.append(pool.apply_async(evaluate_single_genome, (genome_id, genome, config, fillSteps, trainRecipes)))

    # assign the fitness back to each genome
    for job, (ignored_genome_id, genome) in zip(jobs, genomes):
        #job.get is a blocking func waiting for the results of execution above
        genome.fitness = job.get(timeout=None)

    pool.close()
    counter += 1

    #if a better genome has emerged from crossover and if option is set in configuration run new best genome
    if (runNewBest == True):
        bestGenome, bestGenomeFitness = findBestGenome(genomes)
        if(bestGenomeFitness > globalBestGenomeFitness):
            globalBestGenomeFitness = bestGenomeFitness
            runGameWithGenome(bestGenome, config, fillSteps)

    #run each n-th generation in browser n = runEachGeneration
    if (runEachGeneration != 0 and counter % runEachGeneration == 0):
        bestGenome, bestGenomeFitness = findBestGenome(genomes)
        runGameWithGenome(bestGenome, config, fillSteps)
    return

#finds the best genome from a array of genomes
def findBestGenome(genomes):
    # find fittest genome
    bestGenomeFitness = 0
    for genome_id, genome in genomes:
        if bestGenomeFitness <= genome.fitness:
            bestGenomeFitness = genome.fitness
            bestGenome = genome

    return bestGenome, bestGenomeFitness

#opens a browser and starts game with specified genomes model
def runGameWithGenome(genome, config, fillSteps):
    print("Run game with fitness of "+str(genome.fitness))
    loop = asyncio.get_event_loop()
    loop.run_until_complete(runSingleGame(genome, config, fillSteps))


#evaluate a single genome
def evaluate_single_genome(genome_id, genome, config, fillSteps, recipes):
    fitness = 0
    #run genome for each recipe once and calculate it's fitness
    capacitys = [400]
    for capacity in capacitys:
        for recipe in recipes:
            fitness += playGameEmulator(genome, config, fillSteps, recipe, capacity)

    fitness = fitness / (len(recipes)*len(capacitys))
    return fitness

#trains a model with specified config settings
def train(config_file):
    global recipe, numberOfEvolutions, pool, numberOfRandomRecipes, \
        viewGraphs, viewNetwork, viewSpeciesGraph, viewFitnessGraph

    addRandomColors(abs(numberOfRandomRecipes))

    if numberOfRandomRecipes <= 0:
        addRatioColors()

    config = neat.Config(neat.DefaultGenome, neat.DefaultReproduction,
                         neat.DefaultSpeciesSet, neat.DefaultStagnation,
                         config_file)

    # Create the population, which is the top-level object for a NEAT run.
    p = neat.Population(config)

    # Add a stdout reporter to show progress in the terminal.
    p.add_reporter(neat.StdOutReporter(True))
    stats = neat.StatisticsReporter()
    p.add_reporter(stats)
    p.add_reporter(neat.Checkpointer(10))

    #create pool for multiprocessing
    pool = mp.Pool(mp.cpu_count())

    # Run for up to x generations.
    winner = p.run(eval_genomes, numberOfEvolutions)

    # Display the winning genome.
    print('\nBest genome:\n{!s}'.format(winner))

    node_names = {-1:'glassR (-1)', -2: 'glassG (-2)' , -3: 'glassB(-3)', -4: 'recipeR(-4)', -5: 'recipeG(-5)', -6: 'recipeB(-6)', -7: 'fillState(-7)', 0:'outC (0)', 1: 'outM (1)', 2: 'outY(2)', 3: 'stop(3)'}
    visualize.draw_net(config, winner, view=viewNetwork, node_names=node_names)
    visualize.plot_stats(stats, ylog=False, view=viewFitnessGraph)
    visualize.plot_species(stats, view=viewSpeciesGraph)

#Run the training process by
#Load all necessary data
#Setup all necessary folders
#Starting the trainings process
def main(config_name = "config"):
    global numberOfEvolutions, runEachGeneration, runNewBest, numberOfRandomRecipes, fillSteps, \
        viewNetwork, viewSpeciesGraph,viewFitnessGraph

    # load config file data
    assert (os.path.isfile('neat_config.json')), "neat_config.json file is missing"
    with open('neat_config.json') as config_file:
        config_data = json.load(config_file)

    numberOfEvolutions = config_data['numberOfEvolutions']
    runEachGeneration = config_data['runEachGeneration']
    runNewBest = config_data['runNewBest']
    numberOfRandomRecipes = config_data['numberOfRandomRecipes']
    fillSteps = config_data['fillSteps']
    logToFile = config_data['logToFile']
    viewNetwork = config_data['viewNetwork']
    viewSpeciesGraph = config_data['viewSpeciesGraph']
    viewFitnessGraph = config_data['viewFitnessGraph']


    assert (os.path.isfile(config_name)), ("config file is missing filename:" + config_name)

    # Determine path to configuration file. This path manipulation is
    # here so that the script will run successfully regardless of the
    # current working directory.

    if not os.path.isdir('./history'):
        os.mkdir("history")

    # create new savefoleder in history
    savefolderName = str(datetime.datetime.now())
    savefolderName = savefolderName.replace(" ", "_")
    local_dir = os.path.dirname(__file__)
    os.chdir("history")
    os.mkdir(savefolderName)
    os.chdir("..")

    # move neat config to savefolder
    savefolderPath = "history/" + savefolderName
    shutil.copy('config', savefolderPath + "/" + config_name)
    shutil.copy('neat_config.json', savefolderPath + "/" + 'neat_config.json')
    config_path = os.path.join(local_dir, config_name)
    os.chdir(savefolderPath)

    #if logFile is true all print outputs will be redirected to a logfile
    if (logToFile):
        print("All output will be redirected to the log.txt file in " + savefolderPath)
        orig_stdout = sys.stdout
        logFile = open('log.txt', 'w')
        sys.stdout = logFile

    train(config_path)


if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('-c', '--config',
                        help="Specifiy a alternative configuration", default='config')
    args = parser.parse_args()
    main(args.config)


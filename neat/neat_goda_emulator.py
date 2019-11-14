import math
import neat


class GameEmulation:
  def __init__(self, capacity, fillSteps, recipe):
    self.stateCyan = 0
    self.stateMagenta = 0
    self.stateYellow = 0
    self.capacity = capacity
    self.fillSteps = fillSteps
    self.recipe = recipe
    self.stepCounter = 0
    self.stopGame = False
    self.fillInPercent = 0.0

#get current Glass color
def getGlassColorRGB(g):
    #RGB Werte herausschneiden und in int array parsen
    sum = g.stateCyan + g.stateMagenta + g.stateYellow
    ratioCyan = 0
    ratioMagenta = 0
    ratioYellow = 0

    if sum != 0 :
        ratioCyan = g.stateCyan / sum
        ratioMagenta = g.stateMagenta / sum
        ratioYellow = g.stateYellow / sum

    redValue = int((ratioMagenta + ratioYellow)*255)
    greenValue = int((ratioCyan + ratioYellow)*255)
    blueValue = int((ratioCyan + ratioMagenta)*255)

    return [redValue, greenValue, blueValue]

#Calculates current fill state of provided gameState and saves it to the gameState.fillInPercent
#returns fill state in percent
def calcFillPercent(g):
    g.fillInPercent = (g.stateCyan + g.stateMagenta + g.stateYellow) / g.capacity * 100
    return g.fillInPercent

#Calc points based on filling and color NO TIME YET!!!
def getPoints(game):

    fillPercent = calcFillPercent(game)
    if fillPercent > 107:
        # if the glass overflows once player gets no points at all
        return 0
    elif fillPercent < 85:
        fillScore = -(85 - fillPercent) / 85 * 50
    else:
        fillScore = max(abs(fillPercent - 90) / 17 * 5, 0)

    colorGlass = getGlassColorRGB(game)
    distance = math.sqrt(math.pow(colorGlass[0]-game.recipe[0], 2) + math.pow(colorGlass[1]-game.recipe[1], 2) + math.pow(colorGlass[2]-game.recipe[2], 2))
    color_distance_zero = 150
    if distance > color_distance_zero:
        colorAccuracy = 0
    else:
        colorAccuracy = 1 - distance / color_distance_zero

    colorScore = int(colorAccuracy * 10000)
    fillScore = int(colorAccuracy * 10000 * fillScore / 100)

    #TODO:Include time bonus in fitness calculation
    #timeBonus = math.min(timeLeft / 1000, 15) / 15 * 5
    #timeBonusScore = math.round(colorAccuracy * 10000 * timeBonus / 100)

    return colorScore + fillScore #+timeScore

#play a emulated game with reduced functionality for faster training
#fillSteps = amouth of Color added each time when using fillColor
#recipe is a RGB recipe in a array
def playGameEmulator(genome, config, fillSteps, recipe, capacity = 400):
    fillThreshold = 0

    net = neat.nn.FeedForwardNetwork.create(genome, config)
    gameState = GameEmulation(capacity, fillSteps, recipe)

    if len(net.output_nodes) == 3:
        #will be be stoped by algotihem at specified threshold
        fillThreshold = 95
    elif len(net.output_nodes) == 4:
        #AI decides by it's own when to stop
        #If the glas is filled more then 107 it will get 0 points
        fillThreshold = 107


    while gameState.stopGame == False:

        currentColor = getGlassColorRGB(gameState)

        #ask the model what to do
        output = net.activate(currentColor + recipe + [gameState.fillInPercent])

        #extract and execute models decision
        maxValue = max(output)
        maxIndex = output.index(maxValue)

        # if maxValue == 0:
        # network didn't made any decision? no colors will be filled
        #    return

        if maxIndex == 0:
            gameState.stateCyan += gameState.fillSteps

        elif maxIndex == 1:
            gameState.stateMagenta += gameState.fillSteps

        elif maxIndex == 2:
            gameState.stateYellow += gameState.fillSteps

        elif maxIndex == 3:
            gameState.stopGame = True

        if calcFillPercent(gameState) > fillThreshold:
            #end game if threshold has been passed
            gameState.stopGame = True

    return getPoints(gameState)
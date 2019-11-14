import asyncio
import neat

from pyppeteer import launch


CYAN_KEY = "a"
MAGENTA_KEY = "s"
YELLOW_KEY = "d"
DONE_KEY ="j"
ABORT_KEY = "o"

COLOR_KEYS = [CYAN_KEY, MAGENTA_KEY, YELLOW_KEY, DONE_KEY]

globalScore = -1
globalFinalScore = -1
capacyityLevel = [400, 400, 250, 100]

#Get the RGB color in the glass of specified page game
async def getGlassColor(page):
    data = await page.evaluate('''() => {
            return {
                glassColor: document.getElementById('CocktailGlassColor').getAttribute('fill'),
            }              
        }'''
    )
    #RGB Werte herausschneiden und in int array parsen
    colorString = data["glassColor"]
    colorString = colorString[5:len(colorString)-3].split(",")
    return list(map(int, colorString))

#Get the RBG recipe of specified page game
async def getRecipe(page):
    data = await page.evaluate('''() => {
            return {
                glassColor: document.getElementById('HINTGLASS').getAttribute('fill'),
            }              
        }'''
    )
    #RGB Werte herausschneiden und in int array parsen
    colorString = data["glassColor"]
    colorString = colorString[5:len(colorString)-3].split(",")
    return list(map(int, colorString))

#Get fill status in percent of specified page game
async def getGlassFillPercent(page):
    data = await page.evaluate('''() => {
            return {
                glassFill: document.getElementsByClassName('Glass__Filling').item(0).getAttribute('data-fillpercent'),
            }              
        }'''
    )
    return float(data["glassFill"])

#Get the current color and fill in Percent of specified page game
async def getGlassFillPercentAndColor(page):
    data = await page.evaluate('''() => {
            return {
                glassFill: document.getElementsByClassName('Glass__Filling').item(0).getAttribute('data-fillpercent'),
                glassColor: document.getElementById('CocktailGlassColor').getAttribute('fill')
            }              
        }'''
    )

    colorString = data["glassColor"]
    colorString = colorString[5:len(colorString) - 3].split(",")
    return float(data["glassFill"]), list(map(int, colorString))


#Setups a observer in the game which calls updateGlassFill each time the content of the glass changes
#page: page in which the game is running
#At the moment this approach isn't used because it is uses a lot of perfomance
async def setupUpdateGlassFillHandler(page):
    await page.exposeFunction("handleColorFill",updateGlassFill)

    await page.evaluate('''    
    const glassFill = document.getElementById('Glass__Filling').item(0).getAttribute('data-fillpercent');
    const observerFill = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        window.handleColorGlass(mutation.target.getAttribute('fill'));   
    })
    });
    const config = { characterData: false, attributes: true, childList: false, subtree: false };
    observer.observe(glass, config);'''
        , force_expr=True)

#updates the global glass fill variable this function should only be called by setupUpdateGlassFillHandler
def updateGlassFill(glassFill):
    globalGlassFill = glassFill

#Setups a observer in the game which calls updateGlassColor each time the content of the glass changes
#page: page in which the game is running
#At the moment this approach isn't used because it is uses a lot of perfomance
async def setupUpdateGlassColorHandler(page):
    await page.exposeFunction("handleColorGlass",updateGlassColor)

    await page.evaluate('''    
    const glass = document.getElementById('CocktailGlassColor');
    const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        window.handleColorGlass(mutation.target.getAttribute('fill'));   
    })
    });
    const config = { characterData: false, attributes: true, childList: false, subtree: false };
    observer.observe(glass, config);'''
        , force_expr=True)

#updates the global glass color variable this function should only be called by setupUpdateGlassColorHandler
def updateGlassColor(glassColor):
    glassColor = glassColor[5:len(glassColor) - 3].split(",")
    golbalGlassColor = list(map(int, glassColor))

#Setups a observer in the game which calls updateScore each time the score changes
#page: page in which the game is running
#At the moment this approach isn't used because it is uses a lot of perfomance
async def setupUpdateScoreHandler(page):
    await page.exposeFunction("handleIntermediate",updateScore)
    await page.evaluate("window.addEventListener('intermediateScore', (e)=>{window.handleIntermediate(e.detail.totalScore) }) ", force_expr=True)

#updates the global score variable this function should only be called by setupUpdateScoreHandler
def updateScore(currentScore):
    global globalScore
    globalScore = currentScore

#Setups a observer in the game which calls finalScore each time the final score changes
#page: page in which the game is running
#At the moment this approach isn't used because it is uses a lot of perfomance
async def setupUpdateFinalScoreHandler(page):
    await page.exposeFunction("handleFinalScore",updateFinalScore)
    await page.evaluate("window.addEventListener('finalScore', (e)=>{window.handleFinalScore(e.detail.totalScore) }) ", force_expr=True)

#updates the global score variable this function should only be called by setupUpdateFinalScoreHandler
def updateFinalScore(finalScore):
    global globalFinalScore
    print("Final score", finalScore)
    globalFinalScore = finalScore

#setups the butten press logic thus only one button is pressed at the same time
async def setupButtonPressHandler(page):
    #only one button a time can be pressed
    #a button is pressed and released after a specified timeout
    #if a butten is pressed while another button is still pressed the previous button will be released and the new one is pressed
    return await page.evaluate('''
        window.myButtonTimeouts = {a: null, s:null, d:null, j:null, o:null };
        window.pressMyButton = (button, time) => {
            if (window.myButtonTimeouts[button] !== null) {
                clearTimeout(window.myButtonTimeouts[button]);
            }
            const e_down = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: button, char: button, shiftKey: false });
            document.dispatchEvent(e_down);
    
            window.myButtonTimeouts[button] = setTimeout(() => {
                const e_up = new KeyboardEvent("keyup", { bubbles: true, cancelable: true, key: button, char: button, shiftKey: false });
                document.dispatchEvent(e_up);
            }, time); 
        };        
    ''', force_expr=True)

#press a button for a specified time
#This function is used to press the color buttons and to continue a level
#page: page running the game
#key: key which should be pressed as char
#duration: is time in SECONDS
async def pressButton(page, key, duration):
    duration *= 1000  # seconds to milliseconds
    # wenn zweimal die selbe taste gedrückt wird und die events dazu verzahnt sind muss das folgende key up event gelösch werden
    return await page.evaluate('''(keyP, time) => {
        window.pressMyButton(keyP, time)
    }''', key, duration)

#Chrome does loose connection after 20 seconds due to it's default timeout
#This function fixes this issue
def patch_pyppeteer():
    import pyppeteer.connection
    original_method = pyppeteer.connection.websockets.client.connect

    def new_method(*args, **kwargs):
        kwargs['ping_interval'] = None
        kwargs['ping_timeout'] = None
        return original_method(*args, **kwargs)

    pyppeteer.connection.websockets.client.connect = new_method

#browser: a chrome browser where the game will be startet in a new page
#genome: the model which should play the game
#config: config specifing the models settings
#fillSteps: Amount of color added each interval thus also specifies number of intervals
async def playGame(browser, genome, config, fillSteps):

    global globalFinalScore, globalScore, capacyityLevel

    net = neat.nn.FeedForwardNetwork.create(genome, config)

    page = await browser.newPage()
    await page.setViewport({'width': 1280, 'height': 720})
    await page.goto('https://inovex.github.io/cocktail-mash/')
    await setupButtonPressHandler(page)
    await setupUpdateScoreHandler(page)
    await setupUpdateFinalScoreHandler(page)

    for index in range(len(capacyityLevel)):
        await playLevel(page, net, fillSteps, capacyityLevel[index])

        await pressButton(page, DONE_KEY, 0.1); # finish game
        await asyncio.sleep(5)#show score screen for 5 secconds

        await pressButton(page, DONE_KEY, 0.1); #continue to next level
        await asyncio.sleep(0.1)#test buffer

    #TODO: GET FITNESS WITH POINTS MADE IN THE GAME!
    #points = 0
    #genome.fitness = points

    await page.close()
    return

#plays a level of Goda with provided Model
#net: Model network making decision each interval
#fillSteps: Amount of color added each interval thus also specifies number of intervals
#capacity: Capacity of the glass in this level
async def playLevel(page, net, fillSteps, capacity):

    #all time units are in MS
    fillRatePerSecond = 50 #one second color-butten press will fill 50 unit of color in the glass
    timeSteps = fillSteps / fillRatePerSecond #in seconds fillSteps / 50 units/s
    stopGame = False
    oldFillPercent = 0

    recipe = await getRecipe(page)

    numberOutputs = len(net.output_nodes)


    while stopGame == False :
        fillPercent, currentColor = await getGlassFillPercentAndColor(page)

        if numberOutputs == 3 and fillPercent >= 90:
            #stop game by algo
            break

        output = net.activate(currentColor + recipe + [fillPercent])

        maxValue = max(output)
        maxIndex = output.index(maxValue)

        #if maxIndex < 3 and maxValue != 0: # model can decide to make no fill at all
        if maxIndex < 3 : #always wil take highest input as fill
            await pressButton(page, COLOR_KEYS[maxIndex], timeSteps)

        if maxIndex == 3: #if AI decides to stop
            stopGame = True

        #TODO: If Glass overruns the level should be ended
        #if oldFillPercent > fillPercent:
        #    #if glass has been spilled end game
        #    endLevel() # end level by waiting till time is over?
        #    break

        oldFillPercent = fillPercent

        await asyncio.sleep(timeSteps)#sleep is in seconds ... wired

#This function will open a new browser and run a game of Goda with specified model
#genome: the model which should play the game
#config: config specifing the models settings
#fillSteps: Amount of color added each interval thus also specifies number of intervals
async def runSingleGame(genome, config, fillSteps):
    patch_pyppeteer() #prevents browser timeout after 20 sec
    browser = await launch({'headless': False, 'args': ['--window-size=1920,1080']})
    await playGame(browser, genome, config, fillSteps)
    await browser.close()



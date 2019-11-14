import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { LoopContext } from '../../components/Loop';

import {
    CocktailGlass,
    ColorTap,
    Gopher,
    Modal,
    SpeechBubble,
    WaterParticle
} from '../../components';

import { AppState } from '../../reducers';
import { ButtonsActionType } from '../../reducers/buttons.reducer';
import { FillActionType, FillState } from '../../reducers/fills.reducer';
import { ScoreActionType } from '../../reducers/score.reducer';
import { SettingsActionType } from '../../reducers/settings.reducer';

import { calcTargetColor3, calculateFillColor, colorDistanceNormalized, getShuffledColors, postLevelStats, postSpill, RGBColor, toColorString } from '../../utils';

import ButtonLegend from '../../components/ButtonLegend';
import { ColorHintLevel3 } from '../../components/ColorHints';
import EndOfLevelGopher from '../../components/EndOfLevelGopher';
import LevelBox from '../../components/LevelBox';
import PreLevel from '../../components/PreLevel';
import ScoreHelper from '../../components/ScoreHelper';
import Spilled from '../../components/Spilled';
import Table from '../../components/Table';
import TimeBox from '../../components/TimeBox/TimeBox';
import getRandomDrink from '../../utils/randomDrink';

interface Level3State {
    next: boolean;
    timeLeft: number;
    timedMessaged: string | null;

    finalFills: FillState | null;
    finalFillPercent: number | null;
}

class Level3 extends React.Component<any & DispatchProp, Level3State> {
    public static contextType = LoopContext;
    private loopId: number | null = null;
    private scoreSubmitted = false;
    private TARGET_COLOR: RGBColor;
    private COLORS: string[];
    private DRINK_NAME: string;

    private intermediateScore = -1;

    constructor(props: any) {
        super(props);

        this.COLORS = getShuffledColors();
        this.TARGET_COLOR = calcTargetColor3(this.COLORS);
        this.DRINK_NAME = getRandomDrink();

        this.state = {
            finalFillPercent: null,
            finalFills: null,
            next: false,
            timeLeft: 17000,
            timedMessaged: null,
        }
    }

    public dispatchIntermediateScore() {
        // calculate score
        if (!this.state.finalFills) {
            const finalColor = calculateFillColor(this.props.fills);
            const colorAccuracy = 1 - colorDistanceNormalized(finalColor, this.TARGET_COLOR);
            const fillBonus = this.props.fillPercent < 85
                ? -(85 - this.props.fillPercent)/85*50
                : Math.max(Math.abs(this.props.fillPercent - 90)/17*5, 0);

            const timeBonus = Math.min(this.state.timeLeft/1000, 15) / 15 * 5;

            const colorScore = Math.round(colorAccuracy*10000);
            const fillBonusScore = Math.round(colorAccuracy*10000*fillBonus/100);
            const timeBonusScore = Math.round(colorAccuracy*10000*timeBonus/100); 

            const totalScore = colorScore
                            + fillBonusScore
                            + timeBonusScore;

            if (this.intermediateScore !== totalScore) {
                const event = new CustomEvent('intermediateScore', { detail: { totalScore, level: this.props.level }});
                window.dispatchEvent(event);
            }

            this.intermediateScore = totalScore;
        }
    }

    public componentDidMount() {
        this.loopId = this.context.register(this.loop);
        this.props.dispatch({
            payload: {
                capacity: 100,
                fillrate: 50
            },
            type: SettingsActionType.SET_SETTINGS
        });
    }

    public componentWillUnmount() {
        this.context.unregister(this.loopId);
    }

    public loop = (timestamp: DOMHighResTimeStamp, dt: number) => {
        if (this.state.timeLeft > 0 && this.state.timeLeft > dt) {
            this.setState(state => ({
                timeLeft: state.timeLeft - dt
            }), () => this.dispatchIntermediateScore());
        } else {
            this.setState({
                timeLeft: 0
            });
        }
        if (this.props.activeButton !== null) {
            this.context.spawn(<WaterParticle fillValue={this.props.settings.fillRate*dt/1000} color={this.props.activeButton}/>)
        }
    }

    private get speechBubble() {
        const { fillPercent } = this.props;
        let message;
        if ( this.state.timedMessaged) {
            message = this.state.timedMessaged;
        } else if (fillPercent < 10) {
            message = "I'm thirsty, go pour me a drink";
        } else if (fillPercent < 40) {
            message = "Nice, keep going";
        } else if (fillPercent < 80) {
            message = "Getting there";
        } else if (fillPercent < 93) {
            message = "Almost there";
        } else {
            message = "Can i haz drink pls?";
        }
        return <SpeechBubble>
            {message}
        </SpeechBubble>;
    }

    public componentDidUpdate(prevProps: any, prevState: Level3State) {
        if (this.props.fillPercent > 107 && prevProps.fillPercent <= 107) {
            this.context.spawn(<Spilled />);
            postSpill();
            this.props.dispatch({
                type: FillActionType.RESET_FILL
            });

            this.setState({
                timedMessaged: "Oh no, you spilled over!"
            }, () => {
                setTimeout(() => {
                    this.setState({ timedMessaged: null });
                }, 3000)
            });
        }
        if (this.state.timeLeft === 0 && prevState.timeLeft > 0) {
            this.setState({ finalFills: this.props.fills, finalFillPercent: this.props.fillPercent, next: true });
        }
        if (this.props.continue === true && prevProps.continue === false) {
            if (this.props.fillPercent < 10) {
                this.props.dispatch({
                    payload: {
                        key: 'continue',
                        value: false
                    },
                    type: ButtonsActionType.SET_BUTTON
                });
                this.setState({
                    timedMessaged: "MORE pls!",
                }, () => {
                    setTimeout(() => {
                        this.setState({ timedMessaged: null });
                    }, 3000)
                });
            } else if(this.state.next === false) {
                this.setState({ finalFills: this.props.fills, finalFillPercent: this.props.fillPercent, next: true });
            }
        }
    }

    public render() {
        const { next } = this.state;

        if (next) {
            this.context.unregister(this.loopId);

            // calculate score
            const finalColor = calculateFillColor(this.state.finalFills!);
            const colorAccuracy = 1 - colorDistanceNormalized(finalColor, this.TARGET_COLOR);
            const fillBonus = this.state.finalFillPercent! < 85
                ? -(85 - this.state.finalFillPercent!)/85*50
                : Math.max(Math.abs(this.state.finalFillPercent! - 90)/17*5, 0);

            const timeBonus = Math.min(this.state.timeLeft/1000, 15) / 15 * 5;
            
            const colorScore = Math.round(colorAccuracy*10000);
            const fillBonusScore = Math.round(colorAccuracy*10000*fillBonus/100);
            const timeBonusScore = Math.round(colorAccuracy*10000*timeBonus/100); 

            const totalScore = colorScore
                            + fillBonusScore
                            + timeBonusScore;

            postLevelStats(Object.assign({}, this.state.finalFills, {
                level: this.props.level,
                points: totalScore
            }));

            if (this.scoreSubmitted === false) {
                this.scoreSubmitted = true;
                this.props.dispatch({
                    payload: {
                        level: 'level3',
                        score: totalScore,
                    },
                    type: ScoreActionType.SET_SCORE
                });
                postLevelStats(Object.assign({}, this.state.finalFills, {
                    level: this.props.level,
                    points: totalScore
                }));

                const event = new CustomEvent('finalScore', { detail: { totalScore, level: this.props.level }});
                window.dispatchEvent(event);
            }
            
            return <div>
                <Modal prompt={true}>
                    <LevelBox level={this.props.level} />
                    <ColorHintLevel3
                        name={this.DRINK_NAME}
                        colorResult={toColorString(this.TARGET_COLOR)}
                    />

                    <EndOfLevelGopher color={toColorString(finalColor!)}/>

                    <ScoreHelper
                        colorAccuracy={Math.round(colorAccuracy*10000)/100}
                        colorScore={colorScore}
                        fillBonus={fillBonusScore}
                        totalScore={totalScore}
                        timeBonus={timeBonusScore}
                        />
                </Modal>
            </div>;
        } else {
            return <div>
                <PreLevel title="Level 3"/>
                <Table />
                <TimeBox time={this.state.timeLeft} />
                <LevelBox level={this.props.level} />
                <ColorHintLevel3
                    name={this.DRINK_NAME}
                    colorResult={toColorString(this.TARGET_COLOR)}
                />
                <ColorTap active={this.props.activeButton === null ? undefined : this.props.activeButton}/>

                <CocktailGlass isSmall={true} fillPercent={this.props.fillPercent} fillColor={toColorString(this.props.fillColor)}/>

                <ButtonLegend />

                <Gopher reach={this.props.fillPercent > 50} speechBubble={this.speechBubble}/>
            </div>;
        }
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        activeButton: Object.keys(state.buttons).reduce((acc, buttonKey) => {
            return (['cyan', 'magenta', 'yellow'].includes(buttonKey) 
            && state.buttons[buttonKey] === true ? buttonKey : acc) as any;
        }, null),
        continue: state.buttons.continue,
        fillColor: calculateFillColor(state.fills),
        fillPercent: (state.fills.cyan + state.fills.magenta + state.fills.yellow)/state.settings.capacity*100,
        fills: state.fills,
        level: state.level,
        settings: state.settings
    }
}

export default connect(mapStateToProps)(Level3);
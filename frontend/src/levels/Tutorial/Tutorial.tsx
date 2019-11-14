import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';

import {
    CocktailGlass,
    ColorTap,
    Gopher,
    LoopContext,
    Modal,
    SpeechBubble,
    WaterParticle
} from '../../components';

import { AppState } from '../../reducers';
import { ButtonsActionType } from '../../reducers/buttons.reducer';
import { FillActionType, FillState } from '../../reducers/fills.reducer';
import { SettingsActionType } from '../../reducers/settings.reducer';

import { calculateFillColor, colorDistanceNormalized, postLevelStats, postSpill, RGBColor, toColorString } from '../../utils';

import ButtonLegend from '../../components/ButtonLegend';
import { ColorHintTutorial } from '../../components/ColorHints';
import ContinueButton from '../../components/ContinueButton';
import EndOfLevelGopher from '../../components/EndOfLevelGopher';
import LevelBox from '../../components/LevelBox';
import PreLevel from '../../components/PreLevel';
import ScoreHelper from '../../components/ScoreHelper';
import Spilled from '../../components/Spilled';
import Table from '../../components/Table';
import './Tutorial.css';

interface TutorialState {
    next: boolean;
    timedMessaged: string | null;
    finalFills: FillState | null;
    finalFillPercent: number | null;
}

const TARGET_COLOR: RGBColor = {
    blue: 255,
    green: 127,
    red: 127,
};

class Tutorial extends React.Component<any & DispatchProp, TutorialState> {
    public static contextType = LoopContext;
    private loopId: number | null = null;
    private scoreSubmitted = false;

    constructor(props: any) {
        super(props);
        this.state = {
            finalFillPercent: null,
            finalFills: null,
            next: false,
            timedMessaged: null,
        };
    }

    public dispatchIntermediateScore() {
        if (this.state.finalFills === null) {
            const finalColor = calculateFillColor(this.props.fills);
            const colorAccuracy = 1 - colorDistanceNormalized(finalColor, TARGET_COLOR);
            const fillBonus = this.props.fillPercent < 85
                ? -(85 - this.props.fillPercent)/85*50
                : Math.max(Math.abs(this.props.fillPercent - 90)/17*5, 0);
            
            const colorScore = Math.round(colorAccuracy*10000);
            const fillBonusScore = Math.round(colorAccuracy*10000*fillBonus/100);

            const totalScore = colorScore
                            + fillBonusScore;
            const event = new CustomEvent('intermediateScore', { detail: { totalScore, level: this.props.level }});
            window.dispatchEvent(event);
        }
    }

    public componentDidUpdate(prevProps: any) {
        if (prevProps.fillPercent !== this.props.fillPercent) {
            this.dispatchIntermediateScore();
        }
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
            } else {
                this.setState({ finalFills: this.props.fills, finalFillPercent: this.props.fillPercent, next: true });
            }
        }
    }

    public componentDidMount() {
        this.loopId = this.context.register(this.loop);
        this.props.dispatch({
            payload: {
                capacity: 400,
                fillrate: 50
            },
            type: SettingsActionType.SET_SETTINGS
        });
    }

    public componentWillUnmount() {
        this.context.unregister(this.loopId);
    }

    public loop = (timestamp: DOMHighResTimeStamp, dt: number) => {
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
            message = <>Hand me the drink with <ContinueButton/></>;
        }
        return <SpeechBubble>
            {message}
        </SpeechBubble>;
    }

    public render() {

        const { next } = this.state;

        if (next) {
            const finalColor = calculateFillColor(this.state.finalFills!);
            const colorAccuracy = 1 - colorDistanceNormalized(finalColor, TARGET_COLOR);
            const fillBonus = this.state.finalFillPercent! < 85
                ? -(85 - this.state.finalFillPercent!)/85*50
                : Math.max(Math.abs(this.state.finalFillPercent! - 90)/17*5, 0);
            
            const colorScore = Math.round(colorAccuracy*10000);
            const fillBonusScore = Math.round(colorAccuracy*10000*fillBonus/100);

            const totalScore = colorScore
                            + fillBonusScore;

            if (this.scoreSubmitted === false) {
                this.scoreSubmitted = true;

                postLevelStats(Object.assign({}, this.state.finalFills, {
                    level: this.props.level,
                    points: totalScore
                }));

                const event = new CustomEvent('finalScore', { detail: { totalScore, level: this.props.level }});
                window.dispatchEvent(event);
            }

            return <div className="Tutorial">
                <Modal prompt={true}>
                    <LevelBox level={this.props.level} />
                    <ColorHintTutorial/>

                    <EndOfLevelGopher color={toColorString(finalColor!)}/>

                    <ScoreHelper
                        colorAccuracy={Math.round(colorAccuracy*10000)/100}
                        colorScore={colorScore}
                        fillBonus={fillBonusScore}
                        totalScore={totalScore}
                        />

                    <p style={{margin: 0}}>But that was just the training. Wanna play for points?</p>
                </Modal>
            </div>;
        } else {
            return <div>
                <PreLevel title="Training" training={true} />
                <Table />
                <LevelBox level={this.props.level} />
                <ColorHintTutorial/>
                <ColorTap active={this.props.activeButton === null ? undefined : this.props.activeButton}/>
                <CocktailGlass fillPercent={this.props.fillPercent} fillColor={toColorString(this.props.fillColor)}/>

                <ButtonLegend reset="Reset Training"/>
                
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

export default connect(mapStateToProps)(Tutorial);

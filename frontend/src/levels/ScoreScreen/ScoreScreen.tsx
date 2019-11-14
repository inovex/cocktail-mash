import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { LoopContext } from '../../components/Loop';

import ButtonLegend from '../../components/ButtonLegend';
import EndOfLevelGopher from '../../components/EndOfLevelGopher';
import ScoreScreenHelper from '../../components/ScoreScreenHelper';

import { AppState } from '../../reducers';
import { ButtonsActionType } from '../../reducers/buttons.reducer';
import { LevelActionType } from '../../reducers/level.reducer';
import { ScoreState } from '../../reducers/score.reducer';

import './ScoreScreen.css';
interface ScoreScreenProps {
    continue: boolean;
    score: ScoreState;
}

class ScoreScreen extends React.Component<ScoreScreenProps & DispatchProp, any> {
    public static contextType = LoopContext;
    // private loopId: number;

    public componentWillUnmount() {
        this.props.dispatch({
            payload: {
                key: 'continue',
                value: false
            },
            type: ButtonsActionType.SET_BUTTON
        });
    }

    public componentDidUpdate(prevProps: ScoreScreenProps) {
        if (prevProps.continue === false && this.props.continue === true) {
            this.props.dispatch({
                type: LevelActionType.NEXT_LEVEL
            });
        }
    }

    public render() {
        const { score } = this.props;
        const totalScore = Math.round(score.level1)
                        + Math.round(score.level2)
                        + Math.round(score.level3);

        return <div className="ScoreScreen">
                    <EndOfLevelGopher color={"cyan"} finalScreen={true}/>
                    <ScoreScreenHelper
                        score1={Math.round(score.level1)}
                        score2={Math.round(score.level2)}
                        score3={Math.round(score.level3)}
                        totalScore={totalScore}
                    />

                    <ButtonLegend continue="Enter Leaderboard" reset="Chicken out"/>
        </div>;
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        continue: state.buttons.continue,
        score: state.score
    }
}

export default connect(mapStateToProps)(ScoreScreen);

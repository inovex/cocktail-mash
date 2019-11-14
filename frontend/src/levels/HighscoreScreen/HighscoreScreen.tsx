import cx from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';

import { v1 as uuidv1 } from 'uuid';

import { AppState } from '../../reducers';
import { getHighScore, getPosition, postHighScore } from '../../utils/highScore';
import getRandomName from '../../utils/randomName';

import ResetButton from '../../components/ResetButton';
import './HighscoreScreen.css';

interface HighscoreScreenState {
    entries: any[];
    position: number;
    name: string;
    totalEntries: number;
    totalScore: number;
    uuid: string;
}

class HighscoreScreen extends React.PureComponent<any, HighscoreScreenState> {
    constructor(props: any) {
        super(props);

        this.state = {
            entries: [],
            name: '',
            position: 0,
            totalEntries: 0,
            totalScore: 0,
            uuid: ''
        }
    }

    public componentDidMount() {
        const { score } = this.props;
        const totalScore = Math.round(score.level1)
                        + Math.round(score.level2)
                        + Math.round(score.level3);
        const name = getRandomName();
        const uuid = uuidv1();
        postHighScore({ name, uuid, score: totalScore });
        const hs = getHighScore();
        this.setState({
            entries: hs.entries.slice(0, 10),
            name,
            position: getPosition(uuid),
            totalEntries: hs.entries.length,
            totalScore,
            uuid,
        });
    }

    public render() {
        return <div className="HighscoreScreen">
            <div className="HighscoreScreen__Title">Highscores</div>
            <div className="HighscoreScreen__SubTitle">({this.state.totalEntries} total)</div>

            {this.state.entries.map((entry, index) => <div 
                    key={index} className={cx("HighscoreScreen__Row", {
                        'HighscoreScreen__Row--highlight': entry.uuid === this.state.uuid
                    })}
                >
                <div>{index + 1}.</div>
                <div>{entry.name}</div>
                <div>{entry.score}</div>
            </div>)}

            {this.state.position > 10 && <div 
                    className="HighscoreScreen__Row HighscoreScreen__Row--highlight HighscoreScreen__Row--spacer"
                >
                <div>{this.state.position}.</div>
                <div>{this.state.name}</div>
                <div>{this.state.totalScore}</div>
            </div>}

            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Press <ResetButton /> to play again</p>
        </div>;
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        continue: state.buttons.continue,
        score: state.score
    }
}

export default connect(mapStateToProps)(HighscoreScreen);

import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';

import HighscoreScreen from '../../levels/HighscoreScreen';
import Level1 from '../../levels/Level1';
import Level2 from '../../levels/Level2';
import Level3 from '../../levels/Level3';
import ScoreScreen from '../../levels/ScoreScreen';
import Tutorial from '../../levels/Tutorial';

import { AppState } from '../../reducers';
import { Level } from '../../reducers/level.reducer';

import Loop from '../Loop';
import ResetDialog from '../ResetDialog';

import './World.css';

class World extends React.PureComponent<{level: any, resetDialog: boolean, timestamp: string} & DispatchProp, { key: string }> {

    public render() {
        const CurrentLevel: React.ComponentClass = this.props.level;

        return <div className="World">
            <Loop>
                {this.props.resetDialog && <ResetDialog />}
                <CurrentLevel key={this.props.timestamp}/>
            </Loop>
        </div>;
    }
}

const mapStateToProps = (state: AppState) => {
    let level;
    switch (state.level) {
        case Level.Level1:
            level = Level1;
            break;
        
        case Level.Level2:
            level = Level2;
            break;

        case Level.Level3:
            level = Level3;
            break;
        
        case Level.ScoreScreen:
            level = ScoreScreen;
            break;
        
        case Level.HighscoreScreen:
            level = HighscoreScreen;
            break;

        default:
            level = Tutorial;
            break;
    
    }
    return {
        level,
        resetDialog: state.reset,
        timestamp: state.timestamp
    };
}

export default connect(mapStateToProps)(World);

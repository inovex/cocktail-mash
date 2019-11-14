import * as React from 'react';

import './ScoreScreenHelper.css';

export const ScoreScreenHelper = (props: { score1: number, score2: number, score3: number, totalScore: number }) => <div className="ScoreScreenHelper">
    <div className="ScoreScreenHelper__TotalScore">
        <p>total score:</p>
        <p>{props.totalScore}</p>
    </div>

    <div className="ScoreScreenHelper__DetailScoreWrapper">
        <div>
            <p>level 1 score:</p>
            <p>{props.score1}</p>
        </div>
        <div>
            <p>level 2 score:</p>
            <p>{props.score2}</p>
        </div>
        <div>
            <p>level 3 score:</p>
            <p>{props.score3}</p>
        </div>
    </div>
</div>;

export default ScoreScreenHelper;

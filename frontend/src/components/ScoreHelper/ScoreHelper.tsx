import * as React from 'react';

import './ScoreHelper.css';

export const ScoreHelper = (props: { colorAccuracy: number, colorScore: number, fillBonus: number, totalScore: number, timeBonus?: number }) => {
    let titleText = '';
    const { totalScore: score } = props;

    if (score > 10500) {
        titleText = 'Holy Moly! That was Epic!';
    } else if (score > 10000) {
        titleText = 'Fantastic!';
    } else if (score > 9000) {
        titleText = 'Awesome!'
    } else if (score > 8000) {
        titleText = 'Great work!';
    } else if (score > 5000) {
        titleText = 'Not bad!';
    } else if (score > 2000) {
        titleText = 'Gopher says you can do better!'
    } else {
        titleText = "Gopher won't touch your drink!";
    }
    return <div className="ScoreHelper">
        <div className="ScoreHelper__Title">{titleText}</div>

        <div className="ScoreHelper__Taste">{props.colorAccuracy}% Taste</div>

        <div className="ScoreHelper__DetailScoreWrapper">
            <div className="ScoreHelper__DetailsScoreWrapperTaste">
                <div>taste:</div>
                <div>{props.colorScore}</div>
            </div>
            <div className="ScoreHelper__DetailsScoreWrapperFill">
                <div>+ generousity:</div>
                <div 
                    className={props.fillBonus<0 ? 'ScoreHelper__FillBonus--Penalty ScoreHelper__Gauge' : 'ScoreHelper__Gauge'}
                >{props.fillBonus}</div>
            </div>
            {typeof props.timeBonus !== 'undefined' && <div className="ScoreHelper__DetailsScoreWrapperTime">
                <div>+ speed</div>
                <div>{props.timeBonus}</div>
            </div>}
            <div className="ScoreHelper__DetailsScoreWrapperTotal">
                <div>total score</div>
                <div>{props.totalScore}</div>
            </div>
        </div>
    </div>;
}

export default ScoreHelper;

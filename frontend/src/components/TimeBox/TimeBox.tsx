import cx from 'classnames';
import * as React from 'react';

import './TimeBox.css';

const TimeBox = (props: { time: number }) => {

    const timeElement = Math.floor(props.time/100)/10;
    const timeClassNames = cx('TimeBox', {
        'TimeBox--warn': props.time < 5000
    });

    return <svg className={timeClassNames} width="137px" height="108px" viewBox="0 0 137 108" version="1.1">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="gopher_game_Zeichenfläche-1" transform="translate(-854.000000, -24.000000)">
                <g id="timer" transform="translate(684.000000, 25.000000)">
                    <rect id="Rectangle" stroke="#000000" strokeWidth="2" fill="#898588" strokeLinecap="round" strokeLinejoin="round" x="179" y="0" width="127" height="100" rx="17.2"/>
                    <rect id="Rectangle" stroke="#000000" strokeWidth="2" fill="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" x="171.32" y="6" width="127" height="100" rx="17.2"/>
                    <text className="TimeBox__Title" x="195" y="34">
                        Time left:
                    </text>
                    <text className="TimeBox__Time" x="232" y="81">
                        {timeElement}
                    </text>
                    <path d="M178,9 L189.23,1" id="Path" stroke="#000000" strokeWidth="2" fill="#898588" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M291.39,103.49 L302.03,94.47" id="Path" stroke="#000000" strokeWidth="2" fill="#898588" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
            </g>
        </g>
    </svg>;
};

export default TimeBox;

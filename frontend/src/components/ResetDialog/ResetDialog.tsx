import * as React from 'react';

import ContinueButton from '../ContinueButton';
import ResetButton from '../ResetButton';

import './ResetDialog.css';

const ResetDialog = () => {
    return <div className="ResetDialog">
        <div className="ResetDialog__Wrapper">
            <svg width="530px" height="388px" viewBox="0 0 530 388" version="1.1">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Ebene_12" transform="translate(1.000000, 1.000000)">
                        <path d="M525,327 L505,360 C489,384 479.84,386 461,386 L34.11,386 C15.2715672,386 0,370.728433 0,351.89 L0,73.11 C0,54.27 12,44 33,15" id="Path" stroke="#000000" strokeWidth="2" fill="#AAAAAA" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect id="Rectangle" stroke="#000000" strokeWidth="2" fill="#FFFFFF" x="27" y="0" width="501" height="347" rx="34.11"/>
                        <text id="Do-you-realy-want-to" fill="#000000" fontFamily="ArialMT, Arial" fontSize="26" fontWeight="normal">
                            <tspan x="87.2" y="83.3">Do you really want to go back to</tspan>
                            <tspan x="87.2" y="114.150586">training and abort your game?</tspan>
                        </text>
                        <text id="No,-continue-game!" fill="#000000" fontFamily="ArialMT, Arial" fontSize="24" fontWeight="normal">
                            <tspan x="217" y="204.65">No, continue game!</tspan>
                        </text>
                        <text id="Yes,-reset!" fill="#000000" fontFamily="ArialMT, Arial" fontSize="24" fontWeight="normal">
                            <tspan x="217" y="270.65">Yes, reset!</tspan>
                        </text>
                    </g>
                </g>
            </svg>
            <div className="ResetDialog__Buttons">
                <ContinueButton />
                <ResetButton />
            </div>
        </div>
    </div>;
};

export default ResetDialog;
import * as React from 'react';

import './ResetButton.css';

const ResetButton = () => <svg width="50px" height="50px" viewBox="0 0 100 100" style={{margin: '0 5px'}}>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <rect stroke="#000000" strokeWidth="4" fill="#ff454b" x="2" y="2" width="96" height="96" rx="10"/>
        <text className="ResetButton__Text" x="50" y="80">↻</text>
    </g>
</svg>;

export default ResetButton;

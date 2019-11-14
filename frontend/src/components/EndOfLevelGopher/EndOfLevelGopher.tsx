import * as React from 'react';

import './EndOfLevelGopher.css';

const EndOfLevelGopher = (props: { color: string, finalScreen?: boolean } = { color: 'cyan', finalScreen: false }) => {
    const doFill = props.color !== 'rgb(0, 0, 0)';

    return <svg className={props.finalScreen ? "EndOfLevelGopher EndOfLevelGopher--final" : "EndOfLevelGopher"} width="174px" height="178px" viewBox="0 0 174 178" version="1.1">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="gopher_game-02" transform="translate(-268.000000, -32.000000)">
                <g id="glas" transform="translate(269.000000, 33.000000)">
                    <circle id="Oval" stroke="#000000" strokeWidth="2" fill="#5277FF" cx="83.26" cy="91.77" r="82.58"/>
                    <path d="M32.73,57 C32.73,57 9.47,43.28 25,66.5" id="Path" stroke="#000000" fill="#B9CAD8"/>
                    <path d="M89.26,45 C89.26,45 88.62,17.93 78.1,42" id="Path" stroke="#1D1D1B" fill="#FDEA90"/>
                    <path d="M33,116.5 C33,116.5 -10.78,114.3 34.49,127.28" id="Path" stroke="#000000" fill="#B9CAD8"/>
                    <path d="M112.29,82.79 C112.29,82.79 131.03,59.07 127.21,75.22 C124.1,88.37 116.86,95.22 116.86,95.22" id="Path" stroke="#1D1D1B" fill="#FDEA90" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M104.85,151.32 C104.85,151.32 108.14,166.58 102.93,168.5 C98.27,170.22 93.18,157.19 93.18,157.19" id="Path" stroke="#1D1D1B" fill="#D9BFA5"/>
                    <path d="M67.39,161.08 C67.39,161.08 61.85,179.08 56.39,175.53 C54.29,174.16 54.75,159.53 54.75,159.53" id="Path" stroke="#1D1D1B" fill="#D9BFA5"/>
                    <path d="M119.4,105 C119.4,105 110.57,79.92 109.83,76.5 C109.09,73.08 104.83,41.37 73.01,41.79 C41.19,42.21 25.01,66.53 25.01,66.53 C25.01,66.53 14.76,84.29 28.08,104.44 C35.86,116.21 35.61,131.92 36.74,135.93 C37.87,139.94 37.83,165.47 77.74,160.24 C117.65,155.01 125.29,129.47 119.4,105 Z" id="Path" stroke="#000000" fill="#B9CAD8"/>
                    <ellipse id="Oval" stroke="#1D1D1B" fill="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" transform="translate(94.399428, 71.745045) rotate(-7.020000) translate(-94.399428, -71.745045) " cx="94.3994283" cy="71.745045" rx="18.68" ry="18.55"/>
                    <ellipse id="Oval" stroke="#1D1D1B" fill="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" transform="translate(40.513221, 89.745096) rotate(-7.020000) translate(-40.513221, -89.745096) " cx="40.5132214" cy="89.7450962" rx="18.68" ry="18.55"/>
                    <path d="M75.21,90.69 L76.27,97.69 C76.27,97.69 72.6,96.69 70.74,98.94 L68,93.24" id="Path" stroke="#1D1D1B" fill="#FFFFFF" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M73.69,82.74 C73.69,82.74 83.53,90.52 75.21,90.69 C70.21,90.79 69.56,91.69 68.33,92.78 C67.1,93.87 61.73,96.65 63.25,89.65 L65.25,85.51" id="Path" stroke="#1D1D1B" fill="#D9BFA5"/>
                    <ellipse id="Oval" stroke="#1D1D1B" fill="#1D1D1B" strokeLinecap="round" strokeLinejoin="round" transform="translate(69.135971, 83.261826) rotate(-16.050000) translate(-69.135971, -83.261826) " cx="69.1359714" cy="83.2618264" rx="4.55" ry="2.08"/>
                    <ellipse id="Oval" stroke="#1D1D1B" fill="#1D1D1B" transform="translate(104.411551, 63.781337) rotate(-7.020000) translate(-104.411551, -63.781337) " cx="104.411551" cy="63.7813366" rx="2.58" ry="2.7"/>
                    <circle id="Oval" stroke="#1D1D1B" fill="#1D1D1B" cx="49.87" cy="85.2" r="2.81"/>
                    <path d="M112.16,83 C112.16,83 130.9,59.28 127.08,75.42 C123.96,88.58 116.72,95.42 116.72,95.42" id="Path" stroke="#000000" fill="#B9CAD8"/>
                    <path d="M105,151.6 C105,151.6 108.28,166.85 103.08,168.78 C98.42,170.5 93.33,157.47 93.33,157.47" id="Path" stroke="#1D1D1B" fill="#1D1D1B" opacity="0.2"/>
                    <path d="M61,161.18 C61,161.18 60,172.86 56.09,173.03 C52.18,173.2 57.09,176.76 59.48,175.03 C61.87,173.3 67.48,161.03 67.48,161.03" id="Path" fill="#1D1D1B" opacity="0.2"/>
                    <path d="M89.14,44.39 C89.14,44.39 88.51,17.32 77.98,41.39" id="Path" stroke="#000000" fill="#B9CAD8"/>
                    <path d="M75.89,42.64 C75.89,42.64 89.99,42.79 98.42,52.75 C98.42,52.75 92.23,52.15 87.69,53.53 C87.69,53.53 91,49 75.89,42.64 Z" id="Path" fill="#000000" opacity="0.1"/>
                    <path d="M110.76,82.26 C106.765399,88.2001221 99.9006926,91.5523872 92.76,91.05 C92.76,91.05 105.88,92.38 109.14,101.05 C117.87,124.25 110.77,149.47 82.89,158.52 C82.89,158.52 130.07,152.89 118.64,105.59 L110.76,82.26 Z" id="Path" fill="#000000" opacity="0.1"/>
                    <path d="M74.9,91.18 L75.7,97.01 C75.1479141,96.9574541 74.5920859,96.9574541 74.04,97.01 L72.65,91.29 L74.9,91.18 Z" id="Path" fill="#000000" opacity="0.1"/>
                    <path d="M97.08,54.14 C97.08,54.14 114.44,55.88 112.18,74.43 C110.34,89.6 94,89.5700002 94,89.5700002 C94,89.5700002 114.51,81.57 104.36,61.07 C103.06,58.37 99.69,56.49 97.08,54.14 Z" id="Path" fill="#000000" opacity="0.1"/>
                    <path d="M43.35,72.33 C43.35,72.33 60.71,74.06 58.46,92.61 C56.61,107.78 40.3,107.75 40.3,107.75 C40.3,107.75 60.81,99.75 50.67,79.25 C49.34,76.56 46,74.67 43.35,72.33 Z" id="Path" fill="#000000" opacity="0.1"/>
                    <path d="M149.25,26.74 C148.47,25.45 139.5,29.42 129.25,35.6 C119,41.78 111.25,47.84 112,49.13 C112,49.13 131.38,84.43 138.54,88.75 C138.767057,88.9453487 139.044107,89.0734844 139.34,89.12 L139.44,89.12 L139.62,89.12 C142.55,89.43 149.71,86.64 157.42,82.01 C164.84,77.55 170.53,72.74 171.92,69.95 C176.12,65 149.25,26.74 149.25,26.74 Z" id="Path" fill="#D3E3EF"/>
                    <path d="M138.08,88.68 C136.88,86.68 143.46,80.52 152.78,74.93 C162.1,69.34 170.62,66.42 171.78,68.42 C172.94,70.42 166.4,76.58 157.09,82.17 C147.78,87.76 139.28,90.68 138.08,88.68 Z" id="Path" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                    {doFill && <path d="M163.22,53.69 C163.22,53.69 168.51,59.8 167.59,66.78 C167.59,66.78 169.9,69.14 154.19,78.57 C138.48,88 137.41,84.9 137.41,84.9 C132.59,82.17 120.41,60.12 120.41,60.12" id="Path" className="EndOfLevelGopherFill" fill={props.color}/>}
                    <path d="M111.7,49.25 C110.92,47.96 118.65,41.91 128.95,35.72 C139.25,29.53 148.22,25.57 148.95,26.86 C149.68,28.15 141.95,34.2 131.7,40.39 C121.45,46.58 112.47,50.54 111.7,49.25 Z" id="Path" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M111.7,49.25 C111.7,49.25 133.36,88.71 139.34,89.3" id="Path" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M149,26.86 C149,26.86 175.87,65.16 171.65,70.15" id="Path" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M137.76,84.62 C136.93,83.24 143.01,78.05 151.34,73.05 C159.67,68.05 167.11,65.12 167.94,66.51 C168.77,67.9 162.69,73.08 154.36,78.08 C146.03,83.08 138.59,86 137.76,84.62 Z" id="Path" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M114.78,50.72 C114.78,50.72 132.95,81.89 137.78,84.62" id="Path" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M149.28,30.53 C149.28,30.53 168.86,59.53 167.94,66.53" id="Path" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                    {doFill && <path d="M120.09,59.8 C119.86,58.19 129.34,55.53 141.25,53.86 C153.16,52.19 163,52.13 163.25,53.74 C163.5,55.35 154,58 142.07,59.68 C130.14,61.36 120.31,61.41 120.09,59.8 Z" id="Path" stroke="#000000" strokeWidth="0.5" className="EndOfLevelGopherFill" fill={props.color}/>}
                    {doFill && <path d="M144.28,17.8 C145.08,15.2 145.75,12.15 148.17,10.45 C148.899707,9.9914837 149.748464,9.75842341 150.61,9.78 C153.18,9.72 154.08,11.78 153.28,14.17 C152.28,17.17 149.28,16.71 146.89,17.17 C146.039008,17.4521252 145.165988,17.6628542 144.28,17.8 Z" id="Path" stroke="#000000" strokeWidth="0.5" className="EndOfLevelGopherFill" fill={props.color}/>}
                    {doFill && <path d="M156.62,3.39 C158.88,1.88 161.34,-0.05 164.29,0.17 C165.140194,0.274071347 165.942287,0.621298002 166.6,1.17 C168.6,2.76 168.02,4.9 165.88,6.26 C163.22,7.95 161.18,5.69 159.02,4.54 C158.188742,4.22563978 157.385828,3.84091042 156.62,3.39 Z" id="Path" stroke="#000000" strokeWidth="0.5" className="EndOfLevelGopherFill" fill={props.color}/>}
                </g>
            </g>
        </g>
    </svg>;
}

export default EndOfLevelGopher;

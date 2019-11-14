import * as React from 'react';

export const ColorHintLevel3 = (props: {
    name: string,
    colorResult: string
}) => {
    return <div className="ColorHint">
        <svg width="283px" height="485px" viewBox="0 0 283 485" version="1.1">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path d="M43.68,34.72 L239.34,34.72 C262.9,34.72 282,56.16 282,82.61 L282,436.11 C282,462.56 262.9,484 239.34,484 L43.68,484 C20.12,484 1.02,462.56 1.02,436.11 L1.02,82.61 C1,56.16 20.12,34.72 43.68,34.72 Z" id="Path" stroke="#020202" strokeWidth="2" fill="#BFB078"/>
                <path d="M25,56.15 L255.25,56.15 C261.37,56.15 266.33,60.84 266.33,66.62 L266.33,452.87 C266.33,458.65 261.33,463.34 255.25,463.34 L25,463.34 C18.87,463.34 13.91,458.65 13.91,452.87 L13.91,66.62 C13.91,60.84 18.87,56.15 25,56.15 Z" id="Path" stroke="#000000" strokeWidth="2" fill="#FFFFFF" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M81.18,62.91 L205.29,63.01 C205.29,63.01 210.17,30.11 165.79,23.56 C165.79,23.56 168.38,0.79 142.37,1.18 C116.66,1.58 114.65,20.28 116.51,23.35 C118.37,26.42 79.05,31.82 81.18,62.91 Z" id="Path" stroke="#000000" strokeWidth="2" fill="#898588" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M133.59,18.79 C133.59,14.65 137.52,11.3 142.36,11.3 C147.2,11.3 151.12,14.65 151.12,18.79 C151.12,22.93 147.2,26.28 142.36,26.28 C137.52,26.28 133.59,22.92 133.59,18.79 Z" id="Path" stroke="#000000" strokeWidth="2" fill="#FFFFFF" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M178.58,143.28 C178.58,140.33 159.45,137.94 135.86,137.94 C112.27,137.94 93.14,140.33 93.14,143.28 C93.14,143.28 90.08,222.28 97.78,236.82 C97.9695339,237.382584 98.3166195,237.878917 98.78,238.25 L98.93,238.38 C99.0125481,238.471037 99.1028915,238.554688 99.2,238.63 C103.82,242.1 118.7,244.63 136.35,244.63 C153.35,244.63 167.8,242.27 172.96,238.99 L172.96,239.06 C185.11,234.94 178.58,143.28 178.58,143.28 Z" id="Path" fill="#D3E3EF"/>
                <path d="M97.46,237.49 C97.46,232.91 114.76,229.2 136.1,229.2 C157.44,229.2 174.74,232.91 174.74,237.49 C174.74,242.07 157.44,245.78 136.1,245.78 C114.76,245.78 97.46,242.07 97.46,237.49 Z" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M92.88,144.43 C92.88,144.43 89.47,232.77 98.95,239.81" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M178.32,144.43 C178.32,144.43 184.86,236.09 172.7,240.22" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M175.71,153.89 C175.71,153.89 178.71,219.51 170.14,230.34 C170.14,230.34 171.65,236.64 135.66,236.64 C99.67,236.64 101.01,230.34 101.01,230.34 C95.66,220.88 96.77,153.89 96.77,153.89" id="Path" stroke="#000000" fill={props.colorResult} strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M101,230.34 C101,227.16 116.48,224.58 135.57,224.58 C154.66,224.58 170.13,227.16 170.13,230.34 C170.13,233.52 154.66,236.1 135.57,236.1 C116.48,236.1 101,233.52 101,230.34 Z" id="HINTGLASS" stroke="#000000" fill={props.colorResult}/>
                <path d="M96.79,153.38 C96.79,150.19 114.63,147.61 136.65,147.61 C158.67,147.61 176.5,150.19 176.5,153.38 C176.5,156.57 158.66,159.15 136.65,159.15 C114.64,159.15 96.79,156.57 96.79,153.38 Z" id="Path" stroke="#000000" fill={props.colorResult}/>
                <path d="M92.88,144.43 C92.88,141.49 112.01,139.09 135.6,139.09 C159.19,139.09 178.32,141.49 178.32,144.43 C178.32,147.37 159.2,149.77 135.6,149.77 C112,149.77 92.88,147.38 92.88,144.43 Z" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M96.77,153.89 C96.77,153.89 102.58,159.37 136.24,159.37 C169.9,159.37 176.87,153.89 176.87,153.89" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>

                <text className="ColorHint__Title" x="140" y="113.2">{props.name}</text>
                <text className="ColorHint__Recipe" x="140" y="292.96">Recipe:</text>

                <text className="ColorHint__Question" x="110" y="420">?</text>
            </g>
        </svg>
    </div>;
}

export default ColorHintLevel3;

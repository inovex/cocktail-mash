import * as React from 'react';

export const ColorHintLevel2 = (props: {
    name: string,
    colorResult: string,
    color9: string,
    color5: string,
    color3: string
}) => {
    return <div className="ColorHint">
        <svg width="283px" height="485px" viewBox="0 0 283 485" version="1.1">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path d="M43.68,34.72 L239.34,34.72 C262.9,34.72 282,56.16 282,82.61 L282,436.11 C282,462.56 262.9,484 239.34,484 L43.68,484 C20.12,484 1,462.56 1,436.11 L1,82.61 C1,56.16 20.12,34.72 43.68,34.72 Z" id="Path" stroke="#020202" strokeWidth="2" fill="#BFB078"/>
                <path d="M25,56.15 L255.25,56.15 C261.37,56.15 266.33,60.84 266.33,66.62 L266.33,452.87 C266.33,458.65 261.33,463.34 255.25,463.34 L25,463.34 C18.87,463.34 13.91,458.65 13.91,452.87 L13.91,66.62 C13.91,60.84 18.87,56.15 25,56.15 Z" id="Path" stroke="#000000" strokeWidth="2" fill="#FFFFFF" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M81.18,62.91 L205.29,63.01 C205.29,63.01 210.17,30.11 165.79,23.56 C165.79,23.56 168.38,0.79 142.37,1.18 C116.66,1.58 114.65,20.28 116.51,23.35 C118.37,26.42 79.05,31.82 81.18,62.91 Z" id="Path" stroke="#000000" strokeWidth="2" fill="#898588" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M133.59,18.79 C133.59,14.65 137.52,11.3 142.36,11.3 C147.2,11.3 151.12,14.65 151.12,18.79 C151.12,22.93 147.2,26.28 142.36,26.28 C137.52,26.28 133.59,22.92 133.59,18.79 Z" id="Path" stroke="#000000" strokeWidth="2" fill="#FFFFFF" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M178.58,143.28 C178.58,140.33 159.45,137.94 135.86,137.94 C112.27,137.94 93.14,140.33 93.14,143.28 C93.14,143.28 90.08,222.28 97.78,236.82 C97.9695339,237.382584 98.3166195,237.878917 98.78,238.25 L98.93,238.38 C99.0125481,238.471037 99.1028915,238.554688 99.2,238.63 C103.82,242.1 118.7,244.63 136.35,244.63 C153.35,244.63 167.8,242.27 172.96,238.99 L172.96,239.06 C185.11,234.94 178.58,143.28 178.58,143.28 Z" id="Path" fill="#D3E3EF"/>
                <path d="M97.46,237.49 C97.46,232.91 114.76,229.2 136.1,229.2 C157.44,229.2 174.74,232.91 174.74,237.49 C174.74,242.07 157.44,245.78 136.1,245.78 C114.76,245.78 97.46,242.07 97.46,237.49 Z" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M92.88,144.43 C92.88,144.43 89.47,232.77 98.95,239.81" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M178.32,144.43 C178.32,144.43 184.86,236.09 172.7,240.22" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M175.71,153.89 C175.71,153.89 178.71,219.51 170.14,230.34 C170.14,230.34 171.65,236.64 135.66,236.64 C99.67,236.64 101.01,230.34 101.01,230.34 C95.66,220.88 96.77,153.89 96.77,153.89" id="Path" stroke="#000000" fill={props.colorResult} strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M101,230.34 C101,227.16 116.48,224.58 135.57,224.58 C154.66,224.58 170.13,227.16 170.13,230.34 C170.13,233.52 154.66,236.1 135.57,236.1 C116.48,236.1 101,233.52 101,230.34 Z"id="HINTGLASS" stroke="#000000" fill={props.colorResult}/>
                <path d="M96.79,153.38 C96.79,150.19 114.63,147.61 136.65,147.61 C158.67,147.61 176.5,150.19 176.5,153.38 C176.5,156.57 158.66,159.15 136.65,159.15 C114.64,159.15 96.79,156.57 96.79,153.38 Z" id="Path" stroke="#000000" fill={props.colorResult}/>
                <path d="M92.88,144.43 C92.88,141.49 112.01,139.09 135.6,139.09 C159.19,139.09 178.32,141.49 178.32,144.43 C178.32,147.37 159.2,149.77 135.6,149.77 C112,149.77 92.88,147.38 92.88,144.43 Z" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M173.66,361 C173.66,358.79 159.31,357 141.66,357 C124.01,357 109.66,358.79 109.66,361 C109.66,361 107.37,420.27 113.14,431.15 C113.275289,431.569487 113.528764,431.941018 113.87,432.22 C113.909129,432.254119 113.945881,432.290871 113.98,432.33 C114.05,432.39 114.11,432.46 114.18,432.51 C117.64,435.11 128.8,437.02 142.04,437.02 C154.8,437.02 165.63,435.25 169.5,432.79 L169.5,432.84 C178.56,429.73 173.66,361 173.66,361 Z" id="Path" fill="#D3E3EF"/>
                <path d="M113,430.78 C113,427.35 126,424.56 142,424.56 C158,424.56 171,427.35 171,430.78 C171,434.21 158,437 142,437 C126,437 113,434.22 113,430.78 Z" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M172.29,375 C172.29,375 174.45,412.93 168,425 C168,425 168.46,429.37 141.47,429.37 C114.48,429.37 115,424 115,424 C111,413.46 113.09,375 113.09,375" id="Path" fill={props.color5}/>
                <path d="M109.58,361 C109.58,358.79 123.92,357 141.58,357 C159.24,357 173.58,358.79 173.58,361 C173.58,363.21 159.23,365 141.58,365 C123.93,365 109.58,363.2 109.58,361 Z" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M109.58,361 C109.58,361 107.02,427.25 114.13,432.53" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M173.66,361 C173.66,361 178.56,429.74 169.44,432.83" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M115.67,425.42 C115.67,423.03 127.28,421.1 141.6,421.1 C155.92,421.1 167.52,423.03 167.52,425.42 C167.52,427.81 155.91,429.74 141.6,429.74 C127.29,429.74 115.67,427.8 115.67,425.42 Z" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M112.36,365.18 C112.36,365.18 111.66,418.32 115.67,425.42" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M171.23,365.84 C171.23,365.84 173.97,417.3 167.52,425.42" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M112.51,374.78 C112.51,372.39 125.89,370.45 142.4,370.45 C158.91,370.45 171.5,372.11 171.5,374.5 C171.5,376.89 158.91,379.1 142.4,379.1 C125.89,379.1 112.51,377.17 112.51,374.78 Z" id="Path" stroke="#000000" fill={props.color5}/>
                <path d="M92.66,361 C92.66,358.79 78.31,357 60.66,357 C43.01,357 28.66,358.79 28.66,361 C28.66,361 26.37,420.27 32.14,431.15 C32.2752895,431.569487 32.5287642,431.941018 32.87,432.22 C32.9091286,432.254119 32.9458808,432.290871 32.98,432.33 C33.05,432.39 33.11,432.46 33.18,432.51 C36.64,435.11 47.8,437.02 61.04,437.02 C73.8,437.02 84.63,435.25 88.5,432.79 L88.5,432.84 C97.56,429.73 92.66,361 92.66,361 Z" id="Path" fill="#D3E3EF"/>
                <path d="M32,430.78 C32,427.35 45,424.56 61,424.56 C77,424.56 90,427.35 90,430.78 C90,434.21 77,437 61,437 C45,437 32,434.22 32,430.78 Z" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M91.29,375 C91.29,375 93.45,412.93 87,425 C87,425 87.46,429.37 60.47,429.37 C33.48,429.37 34,424 34,424 C30,413.46 32.09,375 32.09,375" id="Path" fill={props.color9}/>
                <path d="M28.58,361 C28.58,358.79 42.92,357 60.58,357 C78.24,357 92.58,358.79 92.58,361 C92.58,363.21 78.23,365 60.58,365 C42.93,365 28.58,363.2 28.58,361 Z" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M28.58,361 C28.58,361 26.02,427.25 33.13,432.53" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M92.66,361 C92.66,361 97.56,429.74 88.44,432.83" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M34.67,425.42 C34.67,423.03 46.28,421.1 60.6,421.1 C74.92,421.1 86.52,423.03 86.52,425.42 C86.52,427.81 74.91,429.74 60.6,429.74 C46.29,429.74 34.67,427.8 34.67,425.42 Z" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M31.36,365.18 C31.36,365.18 30.66,418.32 34.67,425.42" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M90.23,365.84 C90.23,365.84 92.97,417.3 86.52,425.42" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M31.51,374.78 C31.51,372.39 44.89,370.45 61.4,370.45 C77.91,370.45 90.5,372.11 90.5,374.5 C90.5,376.89 77.91,379.1 61.4,379.1 C44.89,379.1 31.51,377.17 31.51,374.78 Z" id="Path" stroke="#000000" fill={props.color9}/>
                <path d="M255.66,361 C255.66,358.79 241.31,357 223.66,357 C206.01,357 191.66,358.79 191.66,361 C191.66,361 189.37,420.27 195.14,431.15 C195.275289,431.569487 195.528764,431.941018 195.87,432.22 C195.909129,432.254119 195.945881,432.290871 195.98,432.33 C196.05,432.39 196.11,432.46 196.18,432.51 C199.64,435.11 210.8,437.02 224.04,437.02 C236.8,437.02 247.63,435.25 251.5,432.79 L251.5,432.84 C260.56,429.73 255.66,361 255.66,361 Z" id="Path" fill="#D3E3EF"/>
                <path d="M195,430.78 C195,427.35 208,424.56 224,424.56 C240,424.56 253,427.35 253,430.78 C253,434.21 240,437 224,437 C208,437 195,434.22 195,430.78 Z" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M254.29,375 C254.29,375 256.45,412.93 250,425 C250,425 250.46,429.37 223.47,429.37 C196.48,429.37 197,424 197,424 C193,413.46 195.09,375 195.09,375" id="Path" fill={props.color3}/>
                <path d="M191.58,361 C191.58,358.79 205.92,357 223.58,357 C241.24,357 255.58,358.79 255.58,361 C255.58,363.21 241.23,365 223.58,365 C205.93,365 191.58,363.2 191.58,361 Z" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M191.58,361 C191.58,361 189.02,427.25 196.13,432.53" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M255.66,361 C255.66,361 260.56,429.74 251.44,432.83" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M197.67,425.42 C197.67,423.03 209.28,421.1 223.6,421.1 C237.92,421.1 249.52,423.03 249.52,425.42 C249.52,427.81 237.91,429.74 223.6,429.74 C209.29,429.74 197.67,427.8 197.67,425.42 Z" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M194.36,365.18 C194.36,365.18 193.66,418.32 197.67,425.42" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M253.23,365.84 C253.23,365.84 255.97,417.3 249.52,425.42" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M194.51,374.78 C194.51,372.39 207.89,370.45 224.4,370.45 C240.91,370.45 253.5,372.11 253.5,374.5 C253.5,376.89 240.91,379.1 224.4,379.1 C207.89,379.1 194.51,377.17 194.51,374.78 Z" id="Path" stroke="#000000" fill={props.color3}/>
                <path d="M96.77,153.89 C96.77,153.89 102.58,159.37 136.24,159.37 C169.9,159.37 176.87,153.89 176.87,153.89" id="Path" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                
                
                <path d="M101.45,390.12 L101.45,401" id="Path" stroke="#000000" strokeWidth="2" fill="#FFFFFF"/>
                <path d="M95.84,395.39 L106.98,395.39" id="Path" stroke="#000000" strokeWidth="2" fill="#FFFFFF"/>
                <path d="M182.45,389.12 L182.45,400" id="Path" stroke="#000000" strokeWidth="2" fill="#FFFFFF"/>
                <path d="M176.84,394.39 L187.98,394.39" id="Path" stroke="#000000" strokeWidth="2" fill="#FFFFFF"/>
                <path d="M101.45,390.12 L101.45,401" id="Path" stroke="#000000"/>
                <path d="M95.84,395.39 L106.98,395.39" id="Path" stroke="#000000"/>
                <path d="M182.45,389.12 L182.45,400" id="Path" stroke="#000000"/>
                <path d="M176.84,394.39 L187.98,394.39" id="Path" stroke="#000000"/>

                <text className="ColorHint__Title" x="140" y="113.2">{props.name}</text>
                <text className="ColorHint__Recipe" x="140" y="292.96">Recipe:</text>

                <text className="ColorHint__Ratio" x="51" y="412">9</text>
                <text className="ColorHint__Ratio" x="132" y="412">5</text>
                <text className="ColorHint__Ratio" x="214.41" y="412">3</text>
            </g>
        </svg>
    </div>;
}

export default ColorHintLevel2;

import * as React from 'react';

const Drop = (props: { color: string }) => {
    // const type = 1 // Math.floor(Math.random() * 8);

    const filename = `/images/Drop1_${props.color}.png`;

    return <img alt="0" width="45px" style={{marginLeft: "-10px"}} src={filename}/>;
    // switch(type) {
    //     case 1:
    //         const filename = `assets/images/Drop1_${props.color}.png`;
    //         return <img src={filename}/>;
    //     case 2:
    //         return <svg width="50px" height="67px" viewBox="0 0 50 67" version="1.1">
    //             <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
    //                 <g id="gopher_game-04" transform="translate(-83.000000, -343.000000)" fill={props.color} stroke="#000000" strokeWidth="2">
    //                     <path d="M112.82,345.78 C109.06,342.23 102.28,345.24 99.06,350 C89.65,363.91 76.34,385.72 92.31,401.69 C106.9,416.27 126.76,403.82 131.08,386.52 C135.4,369.22 123.9,356.23 112.82,345.78 Z" id="Path"/>
    //                 </g>
    //             </g>
    //         </svg>;
    //     case 3:
    //         return <svg width="58px" height="72px" viewBox="0 0 58 72" version="1.1">
    //             <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
    //                 <g id="gopher_game-04" transform="translate(-50.000000, -367.000000)" fill={props.color} stroke="#000000" strokeWidth="2">
    //                     <path d="M73.39,368.18 C79.17,364.43 120.66,414.85 101.76,431.39 C84.33,446.63 59.19,432.89 52.88,413.97 C47.6,398.14 61,376.18 73.39,368.18 Z" id="Path"/>
    //                 </g>
    //             </g>
    //         </svg>;
    //     case 4:
    //         return <svg width="53px" height="74px" viewBox="0 0 53 74" version="1.1">
    //             <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
    //                 <g id="gopher_game-04" transform="translate(-73.000000, -471.000000)" fill={props.color} stroke="#000000" strokeWidth="2">
    //                     <path d="M99.56,472.72 C110.94,486.72 125.51,501.94 124.28,520.47 C123.91,526.05 120.51,531.1 116.97,535.08 C105.53,547.95 89.66,544.43 79.33,531.15 C66.49,514.64 82.92,501.57 91.13,487.89 C93,484.77 98.73,471.7 99.56,472.72 Z" id="Path"/>
    //                 </g>
    //             </g>
    //         </svg>;
    //     case 5:
    //         return <svg width="33px" height="57px" viewBox="0 0 33 57" version="1.1">
    //             <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
    //                 <g id="gopher_game-04" transform="translate(-86.000000, -681.000000)" fill={props.color} stroke="#000000" strokeWidth="2">
    //                     <path d="M103.19,682.77 C100.49,688.4 103.08,683.53 94.67,694.04 C89.06,701.04 85.99,713.98 87.52,723.17 C89.84,737.08 105.03,742.17 113.9,730.31 C121.35,720.39 117.3,706.12 111.71,696.79 C109.11,692.46 106.25,688.08 104.01,683.6 C103.4,682.38 103.53,682.05 103.19,682.77 Z" id="Path"/>
    //                 </g>
    //             </g>
    //         </svg>;
    //     case 6:
    //         return <svg width="45px" height="88px" viewBox="0 0 45 88" version="1.1">
    //             <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
    //                 <g id="gopher_game-04" transform="translate(-73.000000, -804.000000)" fill={props.color} stroke="#000000" strokeWidth="2">
    //                     <path d="M98.71,806.23 C89.92,824.93 72.33,841.69 74.8,864.06 C77.8,891.06 103.7,903.14 114.23,874.91 C119.99,859.48 111.05,842.38 106.23,828.37 C104.39,823.05 101.69,818.83 100.75,813.01 C100.48,811.52 100.26,803 98.71,806.23 Z" id="Path"/>
    //                 </g>
    //             </g>
    //         </svg>;
    //     case 7:
    //         return <svg width="55px" height="78px" viewBox="0 0 55 78" version="1.1">
    //             <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
    //                 <g id="gopher_game-04" transform="translate(-51.000000, -603.000000)" fill={props.color} stroke="#000000" strokeWidth="2">
    //                     <path d="M75.91,605 C65.96,611 49.15,641 52.62,654.22 C56.38,668.52 78.89,686.05 93.84,676.41 C117.17,661.35 95.11,635.34 85.06,620.41 C82.38,616.41 79.39,602.88 75.91,605 Z" id="Path"/>
    //                 </g>
    //             </g>
    //         </svg>;
    //     default:
    //         return <svg width="38px" height="81px" viewBox="0 0 38 81" version="1.1">
    //             <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
    //                 <g id="gopher_game-04" transform="translate(-103.000000, -752.000000)" fill={props.color} stroke="#000000" strokeWidth="2">
    //                     <path d="M118.25,758.56 C118.25,780.38 99.99,793.05 105.11,814.13 C108,826.05 120.27,833.84 129.94,830.85 C137.81,828.41 139.94,816.14 139.43,807.85 C138.21,788.18 118.25,737.63 118.25,758.56 Z" id="Path"/>
    //                 </g>
    //             </g>
    //         </svg>;
    // }    
}


export default Drop;
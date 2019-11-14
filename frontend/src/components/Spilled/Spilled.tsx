import * as React from 'react';
import { LoopContext } from '../Loop';

import './Spilled.css';

class Spilled extends React.PureComponent<any, any> {
    public static contextType = LoopContext;

    public componentDidMount() {       
        setTimeout(() => {
            this.context.destroy(this.props.particleIndex);
        }, 2000);
    }

    public render() {
        return <svg className="Spilled" width="344px" height="404px" viewBox="0 0 344 404" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <text stroke="#000000" transform="translate(216.766947, 35.925425) rotate(-12.000000) translate(-216.766947, -35.925425) " fontFamily="LeckerliOne" fontSize="50" fontWeight="bold" fill="#FF0000">
                    <tspan x="126.266947" y="54.9254247">Spilled!</tspan>
                </text>
                <path d="M2.93496713,375.79524 L23.6780159,398.832729 L172.156024,265.142531 L318.278202,401.403666 L339.420151,378.731702 L195.281513,244.320247 L341.744001,112.44483 L321.000952,89.4073404 L172.522945,223.097539 L26.4007666,86.8364035 L5.25881745,109.508368 L149.397456,243.919823 L2.93496713,375.79524 Z" id="Combined-Shape" stroke="#000000" strokeWidth="3" fill="#EC0000"/>
            </g>
        </svg>
    }
}

export default Spilled;

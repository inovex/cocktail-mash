import cx from 'classnames';
import * as React from 'react';

import './Gopher.css';

const Gopher = (props: { reach?: boolean, speechBubble?: any } = { reach: true }) => {
    return <div>
        {props.speechBubble}
        <span className="Gopher__Wrapper">
            <span className={cx("Gopher", { "Gopher--reaching": props.reach })}>
                <img alt="" className="Gopher__Frame" src="images/Gopher__Frame.png"/>
                <img alt="" className="Gopher__LeftArm" src="images/Gopher__LeftArm.png"/>
                <img alt="" className="Gopher__RightArm" src="images/Gopher__RightArm.png"/>
                <img alt="" className="Gopher__Eyes--closed" src="images/Gopher__Eyes--closed.png"/>
            </span>
        </span>
    </div>;
}

export default Gopher;
import cx from 'classnames';
import * as React from 'react';
import Tap from '../Tap';

import './ColorTap.css';

interface ColorTapProps {
    active?: string;
}

interface ColorTapState {
    lastColor: string;
}

class ColorTap extends React.Component<ColorTapProps, ColorTapState> {
   
    constructor(props: ColorTapProps) {
        super(props);
        this.state = {
            lastColor: 'cyan'
        };
    }

    // keep last active color
    public componentDidUpdate(prevProps: ColorTapProps, prevState: ColorTapState) {
        if (typeof this.props.active !== 'undefined' && this.props.active !== prevProps.active && this.state.lastColor !== this.props.active) {
            this.setState({
                lastColor: this.props.active!
            });
        }
    }

    public render() {
        const classNames = cx('ColorTap', `ColorTap--${this.state.lastColor}`);

        return <div className={classNames}>
            <Tap color={this.state.lastColor}/>
        </div>;
    }
}

export default ColorTap;
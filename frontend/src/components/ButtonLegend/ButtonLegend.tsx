import * as React from 'react';

import ContinueButton from '../ContinueButton';
import ResetButton from '../ResetButton';

import './ButtonLegend.css';

const ButtonLegend = (props: { continue?: string, reset?: string }) => {
    return <div className="ButtonLegend">
        <ResetButton />
        = {props.reset ? props.reset : 'Abort Game to Training'}
        <ContinueButton />
        = {props.continue ? props.continue : 'Hand over Drink'}
    </div>;
};

export default ButtonLegend;

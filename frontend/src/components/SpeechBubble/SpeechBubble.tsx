import * as React from 'react';

import './SpeechBubble.css';

const SpeechBubble = (props: any) => <div className="SpeechBubble" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    {props.children}
</div>;

export default SpeechBubble;
import * as React from 'react';

import { LoopContext } from '../Loop';

import './CheapParticle.css';

class CheapParticle extends React.PureComponent<{ particleIndex?: number}, { d: number, r: number, posX: number, posY: number, angle: number, opacity: number }> {
    public static contextType = LoopContext;

    constructor(props: any) {
        super(props);
        const dimension = 3 + Math.round(Math.random() *10);
        // const radius = Math.round(Math.random() * 50);
        this.state = {
            angle: 0,
            d: dimension,
            opacity: 0.6 + Math.random() / 5,
            posX: 100,
            posY: 100,
            r: 50
        };
    }

    public componentDidMount() {
        const propagationVector = {
            da: 50 + (Math.random()*2 - 1) * 300,
            dx: 20 + (Math.random()*2 - 1) * 40,
            dy: 20 + (Math.random()*2 - 1) * 40
        }
        setTimeout(() => {
            this.setState(state => ({
                angle: state.angle + propagationVector.da * 3,
                opacity: 0,
                posX: state.posX + propagationVector.dx * 3,
                posY: state.posY + propagationVector.dy * 3
            }));
        },10);
        

        setTimeout(() => {
            this.context.destroy(this.props.particleIndex);
        }, 3000);
    }

    public render() {
        return <span className="CheapParticle" style={{
            borderRadius: `${this.state.r}%`,
            height: this.state.d,
            opacity: this.state.opacity,
            transform: `translate3d(${this.state.posX}px, ${this.state.posY}px, 0) rotateZ(${this.state.angle}deg)`,
            width: this.state.d
        }}/>
    }
}

export default CheapParticle;
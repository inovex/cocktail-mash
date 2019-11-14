import * as React from 'react';

import { LoopContext } from '../Loop';

import './Particle.css';

class Particle extends React.PureComponent<{ particleIndex?: number}, { posX: number, posY: number, angle: number, opacity: number }> {
    public static contextType = LoopContext;
    private loopId: number | null = null;
    private started: DOMHighResTimeStamp | null = null;
    private propagationVector: { dx: number, dy: number, da: number };

    constructor(props: any) {
        super(props);
        this.state = {
            angle: 0,
            opacity: 1,
            posX: 100,
            posY: 100
        };
        this.propagationVector = {
            da: 50 + (Math.random()*2 - 1) * 300,
            dx: 20 + (Math.random()*2 - 1) * 40,
            dy: 20 + (Math.random()*2 - 1) * 40
        }
    }

    public loop = (timestamp: DOMHighResTimeStamp, deltaTime: DOMHighResTimeStamp) => {
        if ( timestamp > this.started! + 3000) {
            this.context.destroy(this.props.particleIndex);
        } else {
            this.setState(state => ({
                angle: state.angle + this.propagationVector.da * deltaTime/1000,
                opacity: state.opacity - deltaTime/3000,
                posX: state.posX + this.propagationVector.dx * deltaTime/1000,
                posY: state.posY + this.propagationVector.dy * deltaTime/1000
            }));
        }
    }

    public componentDidMount() {
        this.loopId = this.context.register(this.loop);
        this.started = performance.now();
    }

    public componentWillUnmount() {
        this.context.unregister(this.loopId);
    }

    public render() {
        return <span className="Particle" style={{ transform: `translate3d(${this.state.posX}px, ${this.state.posY}px, 0) rotateZ(${this.state.angle}deg)`, opacity: this.state.opacity }}/>
    }
}

export default Particle;
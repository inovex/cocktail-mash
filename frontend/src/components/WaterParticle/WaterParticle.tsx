import * as React from 'react';
import { connect } from 'react-redux';

import { LoopContext } from '../Loop';

import { FillActionType } from '../../reducers/fills.reducer';
import Drop from '../Drop';
import './WaterParticle.css';

interface WaterParticleProps {
    posX: number;
    posY: number;
    color: string;
    incrementColor: (buttonKey: string, value: number) => void;
    fillValue: number;
    particleIndex?: number;
}

interface WaterParticleState {
    // will be random
    isInvisible: boolean;
    size: number;
    offsetX: number;

    targetX: number;
    targetY: number;
}

const defaultProps: WaterParticleProps  = {
    color: 'skyblue',
    fillValue: 0,
    incrementColor: () => { /* empty */ },
    posX: 640,
    posY: 140
}

class WaterParticle extends React.PureComponent<WaterParticleProps, WaterParticleState> {
    public static defaultProps = defaultProps;
    public static contextType = LoopContext;

    constructor(props: WaterParticleProps) {
        super(props);

        this.state = {
            // this can be used to show only certain amounts of drops, if it becomes too crowded
            isInvisible: false, //Math.floor(Math.random() * 100) < 70,
            offsetX: Math.random()*20 - 10,
            size: 10 + Math.random() *20,
            targetX: this.props.posX,
            targetY: this.props.posY + 20 * ( Math.random()*2 - 1)
        };
    }

    public componentDidMount() {
        setTimeout(() => {
            this.setState({
                targetY: 600
            });
        },10);
        

        setTimeout(() => {
            this.context.destroy(this.props.particleIndex);
            this.props.incrementColor(this.props.color, this.props.fillValue);
        }, 400);
    }

    public render() {
        return <span className="WaterParticle" style={{
            transform: `translate3d(${this.state.targetX - this.state.size / 2 + this.state.offsetX}px, ${this.state.targetY}px, 0)`,
        }}>
            {!this.state.isInvisible && <Drop color={this.props.color}/>}
        </span>
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        incrementColor: (buttonKey: string, value: number) => {
            dispatch({
                payload: {
                    key: buttonKey,
                    value
                },
                type: FillActionType.INCREMENT
            });
        }
      }
    }

export default connect(null, mapDispatchToProps)(WaterParticle);
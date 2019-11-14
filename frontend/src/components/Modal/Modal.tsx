import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';

import { AppState } from '../../reducers';
import { ButtonsActionType } from '../../reducers/buttons.reducer';
import { FillActionType } from '../../reducers/fills.reducer';
import { LevelActionType } from '../../reducers/level.reducer';

import ButtonLegend from '../ButtonLegend';

import './Modal.css';

interface ModalProps extends DispatchProp {
    continue: boolean;
    prompt: boolean 
}

class Modal extends React.PureComponent<ModalProps, { secondsLeft: number }> {
    private timer: any;
    constructor(props: any) {
        super(props);
        this.state = {
            secondsLeft: 5
        };
    }
    public componentDidMount() {
        if (this.props.prompt) {
            this.props.dispatch({
                payload: {
                    key: 'continue',
                    value: false
                },
                type: ButtonsActionType.SET_BUTTON
            });
        } else {
            this.timer = setInterval(() => {
                if (this.state.secondsLeft > 0) {
                    this.setState((state) => ({
                        secondsLeft: state.secondsLeft -1
                    }));
                } else {
                    this.props.dispatch({
                        type: LevelActionType.NEXT_LEVEL
                    });
                }
            }, 1000);
        }
    }

    public componentDidUpdate(prevProps: ModalProps) {
        if (this.props.prompt && prevProps.continue === false && this.props.continue === true) {
            this.props.dispatch({
                type: LevelActionType.NEXT_LEVEL
            });
        }
    }

    public componentWillUnmount() {
        this.props.dispatch({
            type: FillActionType.RESET_FILL
        });

        this.props.dispatch({
            payload: {
                key: 'continue',
                value: false
            },
            type: ButtonsActionType.SET_BUTTON
        });

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    public render() {
        return <div className="Modal__Wrapper">
            <div className="Modal">
                {this.props.children}

                {this.props.prompt
                    ? <ButtonLegend continue="Continue"/>
                    : <p>Next level in {this.state.secondsLeft} seconds</p>
                }
            </div>
            <div className="Modal__Backdrop"/>
        </div>;
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        continue: state.buttons.continue,
    }
}

export default connect(mapStateToProps)(Modal);

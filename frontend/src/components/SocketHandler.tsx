import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import io from 'socket.io-client';
import { SERVER_IP } from '../config';
import { AppState, RootActions } from '../reducers';
import { ButtonsActionType, ButtonsState } from '../reducers/buttons.reducer';
import { Level } from '../reducers/level.reducer';
import { ResetActionType } from '../reducers/reset.reducer';
import { TimestampActionType } from '../reducers/timestamp.reducer';

interface SocketHandlerProps {
    buttons: ButtonsState;
    level: Level,
    reset: boolean;
}

class SocketHandler extends React.PureComponent<SocketHandlerProps & DispatchProp> {
    private socket: SocketIOClient.Socket | null = null;

    public componentDidMount() {
        console.log('attempting');
        this.socket = io(SERVER_IP, {path: '/api/v1/socketio', transports: ['websocket']});
        this.socket.on('init:states', (data: any) => {
            console.log("init:states", data);
            this.props.dispatch({
                payload: data,
                type: ButtonsActionType.SET_STATE
            });
        });
        this.socket.on('connect', (a: any) => {
            console.log('connected');
            this.registerHandlers();
            
        });
        this.socket.on('key:states', (data: ButtonsState) => {
            const reset = data.reset;
            delete data.reset;

            const continueVal = data.continue;

            if (reset === true) {
                delete data.continue;
            }

            if (this.props.level === Level.HighscoreScreen && reset === true) {
                console.log('highscore screen, resetting screen immediately');
                this.props.dispatch({
                    type: TimestampActionType.SET_TIMESTAMP
                });
                this.props.dispatch({
                    type: RootActions.RESET
                });
            } else if (reset === true && this.props.reset === true) {
                console.log('Reset cancelled');
                this.props.dispatch({
                    payload: false,
                    type: ResetActionType.SET_RESET_STATE
                });
            } else if (reset === true && this.props.reset === false) {
                this.props.dispatch({
                    payload: true,
                    type: ResetActionType.SET_RESET_STATE
                });
                console.log('Init reset: confirm or cancel');
            }

            if (continueVal === true && this.props.reset === true) {
                console.log('reset confirmed, resetting game');
                this.props.dispatch({
                    type: TimestampActionType.SET_TIMESTAMP
                });
                this.props.dispatch({
                    type: RootActions.RESET
                });
            }
            
            this.props.dispatch({
                payload: data,
                type: ButtonsActionType.SET_STATE
            });
            

            // console.log('event: key:states', data);
        });

        this.socket.on('disconnect', () => {
            this.unregisterHandlers();
        });
    }

    public componentWillUnmount() {
        this.unregisterHandlers();
    }

    public render() {
        return <></>;
    }

    private registerHandlers() {
        // cleanup handlers
    }

    private unregisterHandlers() {
        // setup handlers
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        buttons: state.buttons,
        level: state.level,
        reset: state.reset
    }
}

export default connect(mapStateToProps)(SocketHandler);
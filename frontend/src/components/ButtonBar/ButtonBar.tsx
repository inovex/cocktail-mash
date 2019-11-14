import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';

import cx from 'classnames';

import { AppState, RootActions } from '../../reducers';
import { ButtonsActionType, ButtonsState } from '../../reducers/buttons.reducer';
import { Level } from '../../reducers/level.reducer';
import { ResetActionType } from '../../reducers/reset.reducer';
import { TimestampActionType } from '../../reducers/timestamp.reducer';
import './ButtonBar.css';

export class ButtonBar extends React.PureComponent<ButtonsState & { level: Level, resetState: boolean } & DispatchProp, {}> {

    public handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'd':
                this.props.dispatch({
                    payload: {
                        key: 'yellow',
                        value: true
                    },
                    type: ButtonsActionType.SET_BUTTON
                });
                break;
           
            case 's':
                this.props.dispatch({
                    payload: {
                        key: 'magenta',
                        value: true
                    },
                    type: ButtonsActionType.SET_BUTTON
                });
                break;

            case 'a':
                this.props.dispatch({
                    payload: {
                        key: 'cyan',
                        value: true
                    },
                    type: ButtonsActionType.SET_BUTTON
                });
                break;
            default:
                break;
        }
    }

    public handleKeyUp = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'o':
                if (this.props.level === Level.HighscoreScreen) {
                    console.log('highscore screen, resetting screen immediately');
                    this.props.dispatch({
                        type: TimestampActionType.SET_TIMESTAMP
                    });
                    this.props.dispatch({
                        type: RootActions.RESET
                    });
                } else if (this.props.resetState === true) {
                    console.log('cancel reset');
                    this.props.dispatch({
                        payload: false,
                        type: ResetActionType.SET_RESET_STATE
                    });
                } else if (this.props.resetState === false) {
                    console.log('initiating reset, confirm or cancel:');
                    this.props.dispatch({
                        payload: true,
                        type: ResetActionType.SET_RESET_STATE
                    });
                }
                break;

            case 'j':
                if (this.props.resetState === true) {
                    console.log('reset confirm, resetting game');
                    this.props.dispatch({
                        type: TimestampActionType.SET_TIMESTAMP
                    });
                    this.props.dispatch({
                        type: RootActions.RESET
                    });
                } else {
                    this.props.dispatch({
                        payload: {
                            key: 'continue',
                            value: true
                        },
                        type: ButtonsActionType.SET_BUTTON
                    });
                }
                break;

            case 'a':
                this.props.dispatch({
                    payload: {
                        key: 'cyan',
                        value: false
                    },
                    type: ButtonsActionType.SET_BUTTON
                });
                break;

            case 's':
                this.props.dispatch({
                    payload: {
                        key: 'magenta',
                        value: false
                    },
                    type: ButtonsActionType.SET_BUTTON
                });
                break;

            case 'd':
                this.props.dispatch({
                    payload: {
                        key: 'yellow',
                        value: false
                    },
                    type: ButtonsActionType.SET_BUTTON
                });
                break;
            default:
                break;
        }
    }

    public componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    public componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    }

    public render() {
        return <div className="ButtonBar">
            <div className={cx("ButtonBar__Cyan", {
                "ButtonBar__Cyan--active": this.props.cyan
            })}>a</div>
            <div className={cx("ButtonBar__Magenta", {
                "ButtonBar__Magenta--active": this.props.magenta
            })}>s</div>
            <div className={cx("ButtonBar__Yellow", {
                "ButtonBar__Yellow--active": this.props.yellow
            })}>d</div>
            <div className={cx("ButtonBar__Continue", {
                "ButtonBar__Continue--active": this.props.continue
            })}>continue: j</div>
            <div className={cx("ButtonBar__Reset", {
                "ButtonBar__Reset--active": this.props.reset
            })}>reset: o</div>
        </div>;
    }
}

const mapStateToProps = (state: AppState) => {
    return {
      ...state.buttons,
      level: state.level,
      resetState: state.reset
    }
}

export default connect(mapStateToProps)(ButtonBar);

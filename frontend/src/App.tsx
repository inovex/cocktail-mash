import * as React from 'react';

import { Provider } from 'react-redux';
import {  createStore } from 'redux';

import rootReducer, { initialState } from './reducers';

import ButtonBar from './components/ButtonBar';

import SocketHandler from './components/SocketHandler';
import World from './components/World';

const store = createStore(rootReducer, initialState);

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <SocketHandler/>
        <World/>
        <ButtonBar/>
      </Provider>
    );
  }
}

export default App;

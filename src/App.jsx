import React from 'react';
import log from 'loglevel';
import { Provider as PaperProvider } from 'react-native-paper';
import { createStore, applyMiddleware } from 'redux';
import { Provider as ReduxProvider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import getProductsSaga from './sagas/products';
import rootReducer from './reducers';
import Routes from './Routes';

log.setLevel("info");

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(getProductsSaga);

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </ReduxProvider>
  );
}
import React from 'react';
import log from 'loglevel';
import { Provider as PaperProvider } from 'react-native-paper';
import { createStore, applyMiddleware } from 'redux';
import { Provider as ReduxProvider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import getProductsSaga from './sagas/getProductsSaga';
import addEstimateItemSaga from './sagas/addEstimateItemSaga';
import changeEstimateItemSaga from './sagas/changeEstimateItemSaga';
import getClientsSaga from './sagas/getClientsSaga';
import getContactsSaga from './sagas/getContactsSaga';
import addClientSaga from './sagas/addClientSaga';
import addClientAndNavigateToPresupuestadorSaga from './sagas/addClientAndNavigateToPresupuestadorSaga';
import signupUserSaga from './sagas/signupUserSaga';
import rootReducer from './reducers';
import Routes from './Routes';

log.setLevel("info");

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(getProductsSaga);
sagaMiddleware.run(addEstimateItemSaga);
sagaMiddleware.run(changeEstimateItemSaga);
sagaMiddleware.run(getClientsSaga);
sagaMiddleware.run(getContactsSaga);
sagaMiddleware.run(addClientSaga);
sagaMiddleware.run(addClientAndNavigateToPresupuestadorSaga);
sagaMiddleware.run(signupUserSaga);

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </ReduxProvider>
  );
}
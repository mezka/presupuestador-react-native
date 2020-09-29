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
import loginUserSaga from './sagas/loginUserSaga';
import addUserSaga from './sagas/addUserSaga';
import addEstimateSaga from './sagas/addEstimateSaga';
import getEstimatesSaga from './sagas/getEstimatesSaga';
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
sagaMiddleware.run(loginUserSaga);
sagaMiddleware.run(addUserSaga);
sagaMiddleware.run(addEstimateSaga);
sagaMiddleware.run(getEstimatesSaga);

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </ReduxProvider>
  );
}
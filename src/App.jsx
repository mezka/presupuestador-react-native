import React from 'react';
import Routes from './Routes';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </Provider>
  );
}
// App.js (main component)
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Dashboard from './components/Dashboard';
import sidebarReducer from './redux/sidebarSlice';

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TodoPage from './pages/TodoPage';

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={TodoPage} />
    </Switch>
  );
};

export default App;

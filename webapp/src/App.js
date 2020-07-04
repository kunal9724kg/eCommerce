import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Admin from './components/admin/Admin';
import NotFound from './components/NotFound/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div>
        <React.Suspense fallback={<div>Loading......</div>}>
          
          <Switch>
            <Route exact path="/admin" component={Admin} />
            <Route path="/*" component={NotFound} />
          </Switch>
        
        </React.Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;

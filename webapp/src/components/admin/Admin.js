import React, {useState} from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import AdminCategory from './AdminCategory/AdminCategory';
import AdminSubCategory from './AdminSubCategory/AdminSubCategory';
import AdminProduct from './AdminProduct/AdminProduct'
import NotFound from '../NotFound/NotFound';

function Admin(props) {
  const [match, setMatch] = useState(props.match)

  return (
    <BrowserRouter>
      <div>
        <React.Suspense fallback={<div>Loading......</div>}>

          <Switch>
            <Route exact path={`${match.url}/category`} component={AdminCategory} />
            <Route exact path={`${match.url}/subCategory`} component={AdminSubCategory} />
            <Route exact path={`${match.url}/product`} component={AdminProduct} />
            <Route path="/*" component={NotFound} />

          </Switch>
        </React.Suspense>
      </div>
    </BrowserRouter>
  );
}

export default Admin;
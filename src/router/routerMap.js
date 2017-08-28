import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import App from '../containers/App';
import Header from '../components/Header';
import Counter from '../containers/Counter';
import Time from '../containers/Time';
import RouteBack from '../containers/RouteBack';
import NotFoundPage from '../containers/NotFoundPage';

const RouterMap = ({ history }) => (
    <Router hisroty={history}>
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={App}></Route>
                <Route path="/counter" component={Counter}></Route>
                <Route path="/time" component={Time}></Route>
                <Route path="/route" component={RouteBack}></Route>
                <Route path="/404" component={NotFoundPage}></Route>
            </Switch>
        </div>
    </Router>
)

export default RouterMap;
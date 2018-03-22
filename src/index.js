import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home/Home';
import Culture from './culture/Culture';
import Me from './me/Me';
import ChangePass from './change-pass/ChangePass';
import Register from './register/Register';
import Login from './login/Login';
import RoutePage from './route/Route';
import Sight from './sight/Sight';
import Blog from './blog/Blog';
import Pay from './pay/Pay';
import Recommend from './recommend/Recommend';
import {BrowserRouter, Switch, Router, Route, Link} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './common.css';
import './iconfont/iconfont.css';
import CultureDetail from './culture-detail/CultureDetail';


ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/culture' component={Culture}/>
            <Route exact path='/culture/detail' component={CultureDetail}/>
            <Route exact path='/me' component={Me}/>
            <Route exact path='/me/change-pass' component={ChangePass}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/route' component={RoutePage}/>
            <Route exact path='/sight' component={Sight}/>
            <Route exact path='/blog' component={Blog}/>
            <Route exact path="/pay" component={Pay}/>
            <Route exact path="/recommend" component={Recommend}/>
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
import React, {Component} from 'react';
import Home from './home/Home';
import Culture from './culture/Culture';
import CultureDetail from './culture-detail/CultureDetail';
import Me from './me/Me';
import ChangePass from './change-pass/ChangePass';
import Register from './register/Register';
import Login from './login/Login';
import RoutePage from './route/Route';
import Sight from './sight/Sight';
import Blog from './blog/Blog';
import Pay from './pay/Pay';
import PayInfo from './pay-info/PayInfo';
import Recommend from './recommend/Recommend';
import Problems from './problems/Problems';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// import BMap from "bmap";

class App extends Component {
    
    componentDidMount() {
    
    }
    
    render() {
        return (
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
                    <Route exact path="/pay-info" component={PayInfo}/>
                    <Route exact path="/recommend" component={Recommend}/>
                    <Route exact path="/problems" component={Problems}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;

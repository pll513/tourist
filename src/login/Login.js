import React from 'react';
import NavHeader from '../components/nav-header/NavHeader';
import {Link, Redirect} from 'react-router-dom';
import 'whatwg-fetch';
import './login.css';
import {BASE_URL} from '../config/network';
import {saveToken} from '../utils/utils';
import toastIt from 'toastit.js';

class Register extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            pwd: '',
            redirect: false,
        };
    }
    
    componentDidMount() {
    
    }
    
    _handleSubmit() {
        let {phone, pwd} = this.state;
        
        fetch(BASE_URL + '/token', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(phone + ':' + pwd)
            },
        }).then((res) => {
            res.json().then((data)=> {
                if (data.token) {
                    saveToken(data.token);
                    this.setState({
                        redirect: true
                    });
                }
            })
        })
        
    }
    
    render() {
        let {query} = this.props.location;
        let from = '/';
        if (query) {
            from = query.from;
        }
        if (this.state.redirect) {
            return <Redirect push to={from}/>;
        }
        return (
            <div id={"login"}>
                <div className={"bg-grey"}></div>
                <NavHeader backurl={"/"} title={"登录"}/>
                <div className="main-no-bottom">
                    <div className="input-group">
                        <label htmlFor="phone" className={"input-desc"}>手&nbsp;机&nbsp;号</label>
                        <input id={"phone"} className={"input"} type="text" onChange={(event) => {
                            this.setState({
                                phone: event.target.value
                            });
                        }}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className={"input-desc"}>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</label>
                        <input id={"password1"} className={"input"} type="password" onChange={(event) => {
                            this.setState({
                                pwd: event.target.value
                            });
                        }}/>
                    </div>
                    <div className={"btn-wrap"}>
                        <input type="button" value={"登录"} className={"button login-btn"}
                               onClick={() => this._handleSubmit()}/>
                    </div>
                    <Link to={"/register"} className={"link-register"}>点击这里注册</Link>
                </div>
            </div>
        );
    }
}

export default Register;
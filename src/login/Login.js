import React from 'react';
import NavHeader from '../components/nav-header/NavHeader';
import {Link, Redirect} from 'react-router-dom';
import 'whatwg-fetch';
import './login.css';
import {BASE_URL} from '../config/network';
import {saveToken} from '../utils/utils';
import toastIt from 'toastit.js';

class Login extends React.Component {
    
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
                    <div className="form-group">
                        <label htmlFor="phone" className={"input-desc"}>手机号</label>
                        <input id={"phone"} className={"form-control"} type="text" placeholder="请输入您的手机号..." onChange={(event) => {
                            this.setState({
                                phone: event.target.value
                            });
                        }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd" className={"input-desc"}>密码</label>
                        <input id={"pwd"} className={"form-control"} type="password" placeholder="请输入您的密码..." onChange={(event) => {
                            this.setState({
                                pwd: event.target.value
                            });
                        }}/>
                    </div>
                    <div className={"btn-wrap"}>
                        <input type="button" value={"登录"} className={"btn btn-primary"}
                               onClick={() => this._handleSubmit()}/>
                    </div>
                    <Link to={"/register"} className={"link-register"}>如果您还没有账号，可以点击这里注册</Link>
                </div>
            </div>
        );
    }
}

export default Login;
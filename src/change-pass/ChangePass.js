import React from 'react';
import NavHeader from '../components/nav-header/NavHeader';
import {Link, Redirect} from 'react-router-dom';
import 'whatwg-fetch';
import {BASE_URL} from '../config/network';
import {saveToken, loadToken, isValidPassword} from '../utils/utils';
import toastIt from 'toastit.js';
import './change-pass.css';

class ChangePass extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            oldpwd: '',
            newpwd1: '',
            newpwd2: '',
            redirect: false,
            from: '/',
        };
    }
    
    _validate() {
        let {newpwd1, newpwd2} = this.state;
        if (!isValidPassword(newpwd1)) {
            toastIt('请输入有效的新密码 密码长度6到20', 2000);
            return false;
        }
        if (newpwd1 !== newpwd2) {
            toastIt('确认密码不一致', 2000);
            return false;
        }
    }
    
    _handleSubmit() {
        let {oldpwd, newpwd1} = this.state;
        fetch(BASE_URL + '/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + window.btoa(loadToken() + ':unused'),
            },
            body: JSON.stringify({
                old_password: oldpwd,
                new_password: newpwd1,
            })
        }).then((res) => {
            return res.json().then((data) => {
                console.log(data);
                return;
                if (data.phone) {
                    toastIt('密码修改成功', 1500);
                    setTimeout(() => {
                        this.setState({
                            redirect: true,
                            from: '/login'
                        });
                    }, 2000);
                    
                }
            })
        })
    }
    
    render() {
        if (!loadToken()) {
            return <Redirect push to={{
                pathname: '/login',
                query: {from: '/me'}
            }}/>;
        }
        let {query} = this.props.location;
        let from = '/';
        if (query) {
            from = query.from;
        }
        if (this.state.redirect) {
            return <Redirect to={from}/>;
        }
        return (
            <div id="change-pass">
                <div className={"bg-grey"}></div>
                <NavHeader backurl={"/me"} title={"修改密码"}/>
                <div className="main-no-bottom">
                    <div className="form-group">
                        <label htmlFor="oldpwd" className={"input-desc"}>旧密码</label>
                        <input id={"oldpwd"} className={"form-control"} type="password" placeholder="请输入原来的密码..."
                               onChange={(event) => {
                                   this.setState({
                                       oldpwd: event.target.value
                                   });
                               }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd1" className={"input-desc"}>密码</label>
                        <input id={"pwd1"} className={"form-control"} type="password" placeholder="请输入新密码..."
                               onChange={(event) => {
                                   this.setState({
                                       newpwd1: event.target.value
                                   });
                               }}/>
                        <small className="form-text text-muted">密码为6到20位的数字字母或者字符</small>
                    </div>
                    <div class="form-group">
                        <label htmlFor="pwd2" className={"input-desc"}>确认密码</label>
                        <input id={"pwd2"} className={"form-control"} type="password" placeholder="请输入确认密码..."
                               onChange={(event) => {
                                   this.setState({
                                       newpwd2: event.target.value
                                   });
                               }}/>
                        <small className="form-text text-muted">确认密码必须与密码一致</small>
                    </div>
                    <div className={"btn-wrap"}>
                        <input type="button" value={"确认修改"} className={"btn change-btn"}
                               onClick={() => this._handleSubmit()}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangePass;
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token ' + loadToken()
            },
            body: JSON.stringify({
                oldpwd: oldpwd,
                newpwd1: newpwd1,
            })
        }).then((data) => {
            console.log(data);
            
            toastIt('修改成功', 2000);
            setTimeout(() => {
                this.setState({
                    redirect: true,
                    from: '/login'
                });
            }, 2000);
            
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
                    <div className="input-group">
                        <label htmlFor="oldpwd" className={"input-desc"}>旧密码</label>
                        <input id="oldpwd" className={"input"} type="password" onChange={(event) => {
                            this.setState({
                                oldpwd: event.target.value
                            });
                        }}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="newpwd1" className={"input-desc"}>新密码</label>
                        <input id="newpwd1" className={"input"} type="password" onChange={(event) => {
                            this.setState({
                                newpwd1: event.target.value
                            });
                        }}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="newpwd2" className={"input-desc"}>确认密码</label>
                        <input id={"newpwd2"} className={"input"} type="password" onChange={(event) => {
                            this.setState({
                                newpwd2: event.target.value
                            });
                        }}/>
                    </div>
                    <div className={"btn-wrap"}>
                        <input type="button" value={"确认修改"} className={"button change-btn"}
                               onClick={() => this._handleSubmit()}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangePass;
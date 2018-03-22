import React from 'react';
import NavHeader from '../components/nav-header/NavHeader';
import {Link, Redirect} from 'react-router-dom';
import "./register.css"
import 'whatwg-fetch';
import {BASE_URL} from '../config/network';
import {isValidPhone, isValidPassword} from '../utils/utils';
import toastIt from 'toastit.js';

class Register extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            nickname: '',
            pwd1: '',
            pwd2: '',
            toast: {
                show: false
            }
        };
    }
    
    componentDidMount() {
        // let opts = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // };
        // fetch.post('')
    }
    
    _validate() {
        let {phone, nickname, pwd1, pwd2} = this.state;
        if (phone.trim() === '') {
            console.log('phone empty');
            toastIt('手机号不能为空', 2000);
            return false;
        }
        if (nickname.trim() === '') {
            toastIt('昵称不能为空', 2000);
            return false;
        }
        if (pwd1.trim() === '') {
            toastIt('密码不能为空', 2000);
            return false;
        }
        if (!isValidPhone(phone)) {
            toastIt('请输入有效的手机号', 2000);
            return false;
        }
        if (!isValidPassword(pwd1)) {
            toastIt('请输入有效的密码 密码长度6到20', 2000);
            return false;
        }
        if (pwd1 !== pwd2) {
            toastIt('确认密码不一致', 2000);
            return false;
        }
        return true;
    }
    
    
    _handleSubmit() {
        let {phone, nickname, pwd1, pwd2} = this.state;
        if (!this._validate()) return;
        // 跳转到登陆界面
        // post
        // $.ajax({
        //     url: BASE_URL + '/users',
        //     method: 'POST',
        //     data: {
        //         phone: phone,
        //         name: nickname,
        //         password: pwd1,
        //     },
        //     success: function(data) {
        //         console.log(data);
        //     },
        //     fail: function(data) {
        //         console.log(data);
        //     },
        // });
        console.log({
            phone: phone,
            name: nickname,
            password: pwd1,
        });
        fetch(BASE_URL + '/users', {
            method: 'POST',
            body: JSON.stringify({
                phone: phone,
                name: nickname,
                password: pwd1,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                console.log(data);
                if (data.phone) {
                    toastIt('注册成功', 1000);
                    setTimeout(() => {
                        this.setState({
                            redirect: true
                        });
                    }, 1500);
                    
                }
            })
            
        })
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect push to={"/login"}/>;
        }
        return (
            <div id={"register"}>
                <div className={"bg-grey"}></div>
                <NavHeader backurl={"/"} title={"注册"}/>
                <div className="main-no-bottom">
                    <div className="input-group">
                        <label htmlFor="phone" className={"input-desc"}>手&nbsp;机&nbsp;号</label>
                        <input id={"phone"} className={"input"} type="text" onChange={(event) => {
                            this.setState({phone: event.target.value});
                        }}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="phone" className={"input-desc"}>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</label>
                        <input id={"nickname"} className={"input"} type="text" onChange={(event) => {
                            this.setState({nickname: event.target.value});
                        }}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password1" className={"input-desc"}>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</label>
                        <input id={"password1"} className={"input"} type="password" onChange={(event) => {
                            this.setState({pwd1: event.target.value});
                        }}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password2" className={"input-desc"}>确认密码</label>
                        <input id={"password2"} className={"input"} type="password" onChange={(event) => {
                            this.setState({pwd2: event.target.value});
                        }}/>
                    </div>
                    <div className={"btn-wrap"}>
                        <input type="button" value={"注册"} className={"button register-btn"}
                               onClick={() => this._handleSubmit()}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;

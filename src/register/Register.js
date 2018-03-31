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
                    toastIt('注册成功', 1500);
                    setTimeout(() => {
                        this.setState({
                            redirect: true
                        });
                    }, 2000);
                } else {
                    toastIt('注册失败 请检查输入', 2000);
                }
            }).catch((err) => {
                toastIt('注册失败 请检查输入', 2000);
                console.log(err);
            });
        }).catch((err) => {
            toastIt('注册失败 请稍后重试', 2000);
            console.log(err);
        });
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
                    <div className="form-group">
                        <label htmlFor="phone" className={"input-desc"}>手机号</label>
                        <input id={"phone"} className={"form-control"} type="text" placeholder="请输入您的手机号..." onChange={(event) => {
                            this.setState({
                                phone: event.target.value
                            });
                        }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nickname" className={"input-desc"}>昵称</label>
                        <input id={"nickname"} className={"form-control"} type="text" placeholder="请输入您的昵称..." onChange={(event) => {
                            this.setState({
                                nickname: event.target.value
                            });
                        }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd1" className={"input-desc"}>密码</label>
                        <input id={"pwd1"} className={"form-control"} type="password" placeholder="请输入您的密码..." onChange={(event) => {
                            this.setState({
                                pwd1: event.target.value
                            });
                        }}/>
                        <small className="form-text text-muted">密码为6到20位的数字字母或者字符</small>
                    </div>
                    <div class="form-group">
                        <label htmlFor="pwd2" className={"input-desc"}>确认密码</label>
                        <input id={"pwd2"} className={"form-control"} type="password" placeholder="请输入您的确认密码..." onChange={(event) => {
                            this.setState({
                                pwd2: event.target.value
                            });
                        }}/>
                        <small className="form-text text-muted">确认密码必须与密码一致</small>
                    </div>
                    <div className={"btn-wrap"}>
                        <input type="button" value={"注册"} className={"btn btn-primary register-btn"}
                               onClick={() => this._handleSubmit()}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;

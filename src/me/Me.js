import React from 'react';
import NavHeader from '../components/nav-header/NavHeader';
import NavBottom from '../components/nav-bottom/NavBottom';
import {Link, Redirect} from 'react-router-dom';
import {loadToken} from '../utils/utils';
import {BASE_URL} from '../config/network';
import "./me.css"

class Me extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        if (!loadToken()) {
            return <Redirect push to={{
                pathname: '/login',
                query: {from: '/me'}
            }}/>;
        }
        
        return (
            <div id={"me"}>
                <div className={"bg-grey"}></div>
                <NavHeader backurl={"/"} title={"我的"}/>
                <div className={"main"}>
                    <ul className={"list-vertical"}>
                        <li className={"list-vertical__item"}>
                            <Link to={"/me/change-pass"} className={"list-vertical__item-link"}>
                                <div className={"list-vertical__item-left"}>修改密码</div>
                                <i className={"iconfont icon-more"}/>
                            </Link>
                        </li>
                        <li className={"list-vertical__item"}>
                            <Link to={"#"} className={"list-vertical__item-link"}>
                                <div className={"list-vertical__item-left"}>我的收藏</div>
                                <i className={"iconfont icon-more"}/>
                            </Link>
                        </li>
                        <li className={"list-vertical__item"}>
                            <Link to={"#"} className={"list-vertical__item-link"}>
                                <div className={"list-vertical__item-left"}>我的订单</div>
                                <i className={"iconfont icon-more"}/>
                            </Link>
                        </li>
                        <li className={"list-vertical__item"}>
                            <Link to={"#"} className={"list-vertical__item-link"}>
                                <div className={"list-vertical__item-left"}>帮助</div>
                                <i className={"iconfont icon-more"}/>
                            </Link>
                        </li>
                    </ul>
                    <div className={"logout-wrap"}>
                        <button className={"btn-logout btn btn-danger"} onClick={() => {
                            // logout
                            fetch(BASE_URL + '/log_out', {
                                method: 'GET',
                                headers: {
                                    'Authorization': 'Basic ' + window.btoa(loadToken() + ':unused'),
                                    'Accept': 'application/json'
                                }
                            }).then((res) => {
                                return res.json().then((data) => {
                                    console.log(data);
                                    localStorage.removeItem('token');
                                    this.setState({
                                        redirect: true
                                    });
                                })
                            }).catch((err) => {
                                console.log(err);
                                localStorage.removeItem('token');
                                this.setState({
                                    redirect: true
                                });
                            });
                        }}>退出登录</button>
                    </div>
                </div>
                <NavBottom pos={2}/>
            </div>
        );
    }
}

export default Me;
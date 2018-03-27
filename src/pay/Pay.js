import React from 'react';
import {Link} from 'react-router-dom';
import NavHeader from '../components/nav-header/NavHeader';
import './pay.css';
import budget from '../imgs/budget.jpg';

class Pay extends React.Component {
    render() {
        return (
            <div id="pay">
                <div className={"main-no-bottom"}>
                    <NavHeader backurl={"/"} title={"门票购买"}/>
                    <h4 className={"pay-title"}>票务信息</h4>
                    <p className={"pay-price"}>旺季门票 ￥110/人</p>
                    <p className={"pay-price"}>淡季门票 ￥40/人</p>
                    <p className={"pay-price"}>旺季观光车票 ￥90/人</p>
                    <p className={"pay-price"}>淡季观光车票 ￥90/人</p>
                    <p className={"pay-memo"}>
                        注：1、景区实行流量控制，日接待量严格控制在2000人以内。景区将根据恢复重建实际情况，适时调整接待量，具体情况请及时关注公告；
                    </p>
                    <p className={"pay-memo"}>
                        2、接待对象为旅行社组织的团队游客，且旅行社必须为游客购买意外保险；暂不接待散客，敬请谅解；
                    </p>
                    <p className={"pay-memo"}>
                        3、特殊人群按照国家政策享受门票优惠或免票政策（不含观光车票）；
                    </p>
                    <p className={"pay-memo"}>
                        4、为规范市场秩序，景区门、车票实行全网实名预约购买制。购票网为阿坝旅游网，网址： www.abatour.com。咨询服务电话：400-088-6969；
                    </p>
                    <div className={"ticket-wrap clearfix"}>
                        <div className="left-ticket-wrap">
                            <Link className={"btn-warning ticket full-ticket"} to={"/pay-info"}>
                                全票
                            </Link>
                        </div>
                        <div className="right-ticket-wrap">
                            <Link className={"btn-info ticket half-ticket"} to={"/pay-info"}>
                                半票
                            </Link>
                        </div>
                        <div className="full-ticket-wrap">
                            <Link className={"btn-success ticket group-ticket"} to={"/pay-info"}>
                                团体票
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pay;
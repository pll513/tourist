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
                    <NavHeader backurl={"/"} title={"购买"}/>
                    <div className={"budget"}>
                        <img className={"budget__img"} src={budget} alt=""/>
                        <div className="budget__img-mask"></div>
                        <h4 className={"budget__title"}>三月活动标题</h4>
                        <div className={"budget__content"}>这里是活动描述描述描述结交分额角附近熊金额而哦啊见覅偶按付金额哦就而佛积分</div>
                    </div>
                    <div className={"ticket-wrap clearfix"}>
                        <div className="left-ticket-wrap">
                            <Link className={"btn-warning ticket full-ticket"} to={"#"}>
                                <h5 className={"ticket__head"}>全票</h5>
                                <p className={"ticket__desc"}>解恩爱得到额放军人家都的巨额偶的欧文觉得的奇偶位大家沃尔</p>
                            </Link>
                        </div>
                        <div className="right-ticket-wrap">
                            <Link className={"btn-info ticket half-ticket"} to={"#"}>
                                <h5 className={"ticket__head"}>半票</h5>
                                <p className={"ticket__desc"}>解恩爱得到额放军人嗯嗯哒的家都的巨额偶的欧文觉得的奇偶位大家沃尔</p>
                            </Link>
                        </div>
                        <div className="full-ticket-wrap">
                            <Link className={"btn-success ticket group-ticket"} to={"#"}>
                                <h5 className={"ticket__head"}>团体票</h5>
                                <p className={"ticket__desc"}>解放军人家都的巨额偶的欧文觉得的奇偶位大家沃尔</p>
                            </Link>
                        </div>
                    </div>
                    <div className="card border-secondary mb-3">
                        <div className="card-header">友情提醒</div>
                        <div className="card-body">
                            <p className="card-text">1.阶级偶尔金佛手机覅附色粉色件四我放假偶尔飞机</p>
                            <p className="card-text">2.阶金佛手机覅附件四我放假偶尔飞机</p>
                            <p className="card-text">3.阶级偶尔金佛手机覅附偶尔飞机</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pay;
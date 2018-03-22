import React from 'react';
import './recommend.css';
import {Link} from 'react-router-dom';
import NavHeader from '../components/nav-header/NavHeader';
import re1 from '../imgs/recommend1.jpg';
import re2 from '../imgs/recommend2.jpg';
import re3 from '../imgs/recommend3.jpg';

class Recommend extends React.Component {
    render() {
        return (
            <div id="recommend">
                <NavHeader backurl={"/"} title={"推荐"}/>
                <div class={"main-no-bottom"}>
                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" className="form-control"/>
                            <div className="input-group-append">
                                <input className="input-group-text" type="button" value="搜索"/>
                            </div>
                        </div>
                    </div>
                    <div className={"category clearfix"}>
                        <div className={"category-item-wrap"}>
                            <div className={"category-item hotel"}>酒店</div>
                        </div>
                        <div className={"category-item-wrap"}>
                            <div className={"category-item food"}>美食</div>
                        </div>
                        <div className={"category-item-wrap"}>
                            <div className={"category-item show"}>表演</div>
                        </div>
                        <div className={"category-item-wrap"}>
                            <div className={"category-item activity"}>活动</div>
                        </div>
                    </div>
                    <div className={"recommend-list"}>
                        <Link className="recommend-item" to={"#"}>
                            <div className={"recommend-item__img-mask"}></div>
                            <img className={"recommend-item__img"} src={re1} alt=""/>
                            <h5 className={"recommend-item__title"}>活动活动佛教几</h5>
                            <div className={"recommend-item__desc"}>诶哦金佛的姐节点对偶觉得记得加将诶哦凶恶的方式的</div>
                        </Link>
                        <Link className="recommend-item" to={"#"}>
                            <div className={"recommend-item__img-mask"}></div>
                            <img className={"recommend-item__img"} src={re2} alt=""/>
                            <h5 className={"recommend-item__title"}>活动活动佛教几</h5>
                            <div className={"recommend-item__desc"}>诶哦金佛的姐节点对偶觉得记得加将诶哦凶恶的方式的</div>
                        </Link>
                        <Link className="recommend-item" to={"#"}>
                            <div className={"recommend-item__img-mask"}></div>
                            <img className={"recommend-item__img"} src={re3} alt=""/>
                            <h5 className={"recommend-item__title"}>活动活动佛教几</h5>
                            <div className={"recommend-item__desc"}>诶哦金佛的姐节点对偶觉得记得加将诶哦凶恶的方式的</div>
                        </Link>
                    </div>

                </div>
            </div>
        );
    }
}

export default Recommend;
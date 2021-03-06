import React from 'react';
import './recommend.css';
import {Link} from 'react-router-dom';
import NavHeader from '../components/nav-header/NavHeader';
import re1 from '../imgs/recommend1.jpg';
import re2 from '../imgs/recommend2.jpg';
import re3 from '../imgs/recommend3.jpg';
import toastIt from 'toastit.js';

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
                            <div className={"category-item hotel"} onClick={()=>{toastIt('因九寨沟关闭 信息未能显示 您可以打开美团App查看', 2000)}}>酒店</div>
                        </div>
                        <div className={"category-item-wrap"}>
                            <div className={"category-item food"} onClick={()=>{toastIt('因九寨沟关闭 信息未能显示 您可以打开美团App查看', 2000)}}>美食</div>
                        </div>
                        <div className={"category-item-wrap"}>
                            <div className={"category-item show"} onClick={()=>{toastIt('因九寨沟关闭 表演信息未能显示 敬请谅解', 2000)}}>表演</div>
                        </div>
                        <div className={"category-item-wrap"}>
                            <div className={"category-item activity"} onClick={()=>{toastIt('因九寨沟关闭 活动信息未能显示 敬请谅解', 2000)}}>活动</div>
                        </div>
                    </div>
                    <div className={"recommend-list"}>
                        <Link className="recommend-item" to={"#"}>
                            <img className={"recommend-item__img"} src={re1} alt=""/>
                            <h5 className={"recommend-item__title"}>重要的事情说三遍：九寨沟景区目前暂不接待散客！</h5>
                            <div className={"recommend-item__desc"}></div>
                        </Link>
                        <Link className="recommend-item" to={"#"}>
                            <img className={"recommend-item__img"} src={re2} alt=""/>
                            <h5 className={"recommend-item__title"}>九寨沟景区预演2018年部分景点恢复开放</h5>
                            <div className={"recommend-item__desc"}></div>
                        </Link>
                        <Link className="recommend-item" to={"#"}>
                            <img className={"recommend-item__img"} src={re3} alt=""/>
                            <h5 className={"recommend-item__title"}>新年伊始 九寨沟景区各项工作有序开展</h5>
                            <div className={"recommend-item__desc"}></div>
                        </Link>
                    </div>

                </div>
            </div>
        );
    }
}

export default Recommend;
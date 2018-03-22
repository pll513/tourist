import React from 'react';
import NavHeader from '../components/nav-header/NavHeader';
import {BASE_URL} from '../config/network';
import './sight.css';
import slide1 from '../imgs/slider1.jpg';
import slide2 from '../imgs/slider2.jpg';

class Sight extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            sightLoaded: false,
            sight: {},
        }
    }
    
    componentDidMount() {
        let {query} = this.props.location;
        let sightId;
        if (query) {
            sightId = query.sight_id;
        }
        
        let sight = {
            imgs: [slide1, slide1, slide2, slide2, slide1, slide1],
            name: '景点名称11',
            des: {
                impression: '颜色非常的绚丽，空气十分的清新，而且感觉真是大自然的鬼斧神工。到处都是美丽的风景，最美的地方了。',
                introduction: '有“九寨沟一绝”和“九寨精华”之誉的五花海，位于日则沟孔雀河上游的尽头，海拔2472米处，珍珠滩瀑布之上，熊猫湖的下部。五花海是九寨沟诸景点中最精彩一个。 清澈多彩的湖面下显现出一段段的树木躯干。湖面整体呈绿松色，不同区域，颜色变换从黄色到绿色，又到蓝色，展现出湖水五彩的美艳。四周的山坡，入秋后便笼罩在一片绚丽的秋色中，色彩丰富，姿态万千，独霸九寨。五花海的彩叶大半集中在出水口附近的湖畔，一株株彩叶交织成锦，如火焰流金。 最佳拍摄时间：上午9:00适合在五花海边拍摄，下午4:00适合在老虎嘴崖拍摄全景。老虎嘴是拍摄五花海全景的最佳位置，站在观景台上，可将五花海一览无余。去老虎嘴可从五花海步行上来，或者先游览熊猫海，再顺公路走下来。',
                arrive_leave: '五花海位于阿坝藏族羌族自治州九寨沟县境内，建有九黄机场，距离成都400多公里。 到达九寨沟交通方式 【九寨沟内部交通】 景区内有环保观光车穿梭行驶，游客可凭车票在每个景点的站点上下车。注意在观光车上要事先告诉司机在哪里下车，否则车到一个景点不会主动询问游客是否要下车。',
                type: '湖泊',
                season: '9—10月是最佳旅游时间。九寨沟的深秋是最绚烂的，山坡树木的树叶，除了绿色以外，还呈现出金黄、火红等色彩，五彩缤纷，倒映在大大小小的海子里，湖山同色，十分迷人，这时也是游人最多的时候。',
                advice_time: '1小时',
                ticket: '包含在九寨沟门票内，不另收费。',
                open_time: '旺季（04月01日~11月15日）：06:30~18:00 淡季（11月16日~03月31日）：06:30~17:00'
            }
        };
        
        console.log(slide1)
    
        fetch(BASE_URL + '/sight/' + sightId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                console.log(data);
                this.setState({
                    sightLoaded: true,
                    sight: data
                });
            })
        });
        
        // this.setState({
        //     sightLoaded: true,
        //     sight: sight
        // });
    }
    
    render() {
        let {sightLoaded, sight} = this.state;
        let {query} = this.props.location;
        let routeId, from;
        if (query) {
            routeId = query.route_id;
            from  = query.from;
        }
        if (!sightLoaded) return '';
        let sightHtml;
        let {imgs} = sight;
        let imgsLen = imgs.length;
        
        let topImgHtml = [];
        if (imgsLen >= 1) topImgHtml.push(<img className="sight-img" src={imgs[0]} alt=""/>);
        if (imgsLen >= 2) topImgHtml.push(<img className="sight-img" src={imgs[1]} alt=""/>);
        
        let midImgHtml = [];
        if (imgsLen >= 3) midImgHtml.push(<img className="sight-img" src={imgs[2]} alt=""/>);
        if (imgsLen >= 4) midImgHtml.push(<img className="sight-img" src={imgs[3]} alt=""/>);
        
        let bottomImgHtml = [];
        for (let i = 5; i < imgsLen; i += 1) {
            bottomImgHtml.push(<img className="sight-img" src={imgs[i]} alt=""/>);
        }
        
        sightHtml = (
            <div id={"sight"}>
                <NavHeader backurl={from === 'index' ? "/" : "/route"} backquery={from === 'index' ? {pos: 0} : {route_id: routeId}} title={sight.name}/>
                <div className="main-no-bottom">
                    {topImgHtml}
                    <div className="impression">
                        <h4 className="sub-title">大家印象</h4>
                        <p className="sight-text">{sight.des.impression}</p>
                    </div>
                    <div className="introduction">
                        <h4 className="sub-title">景点介绍</h4>
                        <p className="sight-text">{sight.des.introduction}</p>
                    </div>
                    {midImgHtml}
                    <div className="arrive-leave">
                        <h4 className="sub-title">到达与离开</h4>
                        <p className="sight-text">{sight.des.arrive_leave}</p>
                    </div>
                    <div className="type">
                        <h4 className="sub-title">景点类型</h4>
                        <p className="sight-text">{sight.des.type}</p>
                    </div>
                    <div className="season">
                        <h4 className="sub-title">最佳季节</h4>
                        <p className="sight-text">{sight.des.season}</p>
                    </div>
                    <div className="advice-time">
                        <h4 className="sub-title">建议游玩</h4>
                        <p className="sight-text">{sight.des.advice_time}</p>
                    </div>
                    <div className="ticket">
                        <h4 className="sub-title">门票</h4>
                        <p className="sight-text">{sight.des.ticket}</p>
                    </div>
                    <div className="open-time">
                        <h4 className="sub-title">开放时间</h4>
                        <p className="sight-text">{sight.des.open_time}</p>
                    </div>
                    {bottomImgHtml}
                </div>
            </div>
        );
        
        return sightHtml;
    }
}

export default Sight;

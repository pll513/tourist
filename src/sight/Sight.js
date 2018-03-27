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
                <NavHeader backurl={from === 'index' ? "/" : "/route"} backquery={from === 'index' ? {pos: 0} : {route_id: routeId}} title={"景点介绍"}/>
                <div className="main-no-bottom">
                    <div className="content-wrap">
                        <h4 className={"sight-title"}>{sight.name}</h4>
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
            </div>
        );
        
        return sightHtml;
    }
}

export default Sight;

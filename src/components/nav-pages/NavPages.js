import React from 'react';
import NavBar from '../nav-bar/NavBar';
import {Link} from 'react-router-dom';
import {BASE_URL} from '../../config/network';
import "whatwg-fetch";
import './nav-pages.css';
import img1 from '../../imgs/slider2.jpg';

class NavPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: this.props.pos,
            sightsLoaded: false,
            sights: [],
            routesLoaded: false,
            routes: [],
        };
    }
    
    componentDidMount() {
        fetch(BASE_URL + '/sights', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                console.log(data);
                data = data || [];
                this.setState({
                    sightsLoaded: true,
                    sights: data
                });
            })
        });
        
        fetch(BASE_URL + '/paths', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                console.log(data);
                data = data || [];
                this.setState({
                    routesLoaded: true,
                    routes: data
                });
            })
        });
        
    }
    
    _updatePosition(newPos) {
        this.setState({
            pos: newPos
        });
    }
    
    render() {
        let {pos, sightsLoaded, sights, routesLoaded, routes} = this.state;
        let navPageHtml = '';
        if (sightsLoaded && routesLoaded) {
            navPageHtml = (
                <div className="nav-pages">
                    <NavBar txts={['必游美景', '推荐路线', '服务']} pos={pos}
                            updatePosition={(newPos) => this._updatePosition(newPos)}/>
                    <div className="nav-pages__content">
                        <div className={"nav-pages__page sights" + (pos === 0 ? '' : ' none')}>
                            {sights.map((sight, index) => {
                                let img = img1;
                                if (sight.photo && sight.photo[0]) img = sight.photo[0];
                                return (
                                    <Link className={"nav-page__list-item"} key={index}
                                          to={{pathname: '/sight', query: {sight_id: sight.sight_id, from: 'index'}}}>
                                        <img className="sight-item__img" src={img} alt=""/>
                                        <div className="sight-item__title">
                                            {sight.name}
                                        </div>
                                        <div className="sight-item__desc">
                                            {sight.des.impression}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                        <div className={"nav-pages__page" + (pos === 1 ? '' : ' none')}>
                            {routes.map((route, index) => {
                                let sights = [];
                                if (route.sights) sights = route.sights.slice(0,4);
                                console.log(index + '-------');
                                console.log(sights);
                                return (
                                    <Link className={"nav-page__list-item"} key={index}
                                          to={{pathname: '/route', query: {route_id: route.path_id}}}>
                                        <div className="route__name">
                                            {route.name}
                                        </div>
                                        <div className={"route-list clearfix"}>
                                            {sights.map((sight, index) => {
                                                let photo = sight.photo || img1;
                                                return (
                                                    <div className={"route__sight"} key={index}>
                                                        <img className={"route__sight-img"} src={photo} alt=""/>
                                                        <div className={"route__sight-name"}>{sight.name}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                        <div className={"nav-pages__page" + (pos === 2 ? '' : ' none')}>
                            <Link className={"btn-pay btn-warning"} to={"/pay"}>门票购买</Link>
                            <Link className={"btn-recommend btn-success"} to={"/recommend"}>为你优选</Link>
                        </div>
                    </div>
                </div>
            );
        } else {
            navPageHtml = (
                <div className="nav-pages">
                    <NavBar txts={['必游美景', '推荐路线', '天气预报']} pos={pos}
                            updatePosition={(newPos) => this._updatePosition(newPos)}/>
                    <div className="nav-pages__content">
                    
                    </div>
                </div>
            );
        }
        return navPageHtml;
    }
    
}

export default NavPages;
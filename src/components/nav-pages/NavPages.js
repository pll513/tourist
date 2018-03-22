import React from 'react';
import NavBar from '../nav-bar/NavBar';
import {Link} from 'react-router-dom';
import {BASE_URL} from '../../config/network';
import "whatwg-fetch";
import './nav-pages.css';

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
                                return (
                                    <Link className={"nav-page__list-item"} key={index}
                                          to={{pathname: '/sight', query: {sight_id: sight.sight_id, from: 'index'}}}>
                                        <div className="nav-page__list-item-content">
                                            {sight.name}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                        <div className={"nav-pages__page" + (pos === 1 ? '' : ' none')}>
                            {routes.map((route, index) => {
                                return (
                                    <Link className={"nav-page__list-item"} key={index}
                                          to={{pathname: '/route', query: {route_id: route.path_id}}}>
                                        <div className="nav-page__list-item-content">
                                            {route.name}
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
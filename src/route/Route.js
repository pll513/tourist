import React from 'react';
import NavHeader from '../components/nav-header/NavHeader';
import './route.css';
import {Link} from 'react-router-dom';
import {BASE_URL} from '../config/network';


class Route extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            routeLoaded: false,
            route: [],
            distances: [],
        };
    }
    
    componentDidMount() {
        let {query} = this.props.location;
        if (!query) return;
        const routeId = query.route_id;
        fetch(BASE_URL + '/path/' + routeId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                console.log(data);
                this.setState({
                    routeLoaded: true,
                    route: data.sights,
                    distances: data.distance
                });
            })
        });
    }
    
    render() {
        let {routeLoaded, route, distances} = this.state;
        let {query} = this.props.location;
        if (!query) return null;
        let routeId = query.route_id;
        if (!routeLoaded) return '';
        let routeHtml = [];
        let jIndex = 0;
        for (let i = 0; i < route.length; i += 1) {
            let sight = route[i];
            let distance = distances[i];
            routeHtml.push(
                <div className="route-item" key={jIndex}>
                    <h4 className={"route-item__title"}>{sight.name}</h4>
                    <img className={"route-item__img"} src={sight.photo} alt=""/>
                    <p className={"route-item__text"}>{sight.des.introduction}</p>
                    <div style={{textAlign: 'right'}}>
                        <Link className={"route-item__more"} to={{
                            pathname: '/sight',
                            query: {sight_id: sight.sight_id, route_id: routeId, from: 'route'}
                        }}>景点详情<i className={"iconfont icon-more"}/></Link>
                    </div>
                </div>
            );
            jIndex += 1;
            if (i < distances.length) {
                routeHtml.push(
                    <div className={"distance"} key={jIndex}>
                        <div className="distance__dot-wrap">
                            <div className="distance__dot"></div>
                            <div className="distance__dot"></div>
                            <div className="distance__dot"></div>
                            <div className="distance__dot"></div>
                            <div className="distance__dot"></div>
                            <div className="distance__dot"></div>
                            <div className="distance__dot"></div>
                            <div className="distance__dot"></div>
                        </div>
                        <div className="distance__value">{distance}</div>
                    </div>);
                jIndex += 1;
            }
        }
        return (
            <div id="route">
                <div className="bg-grey"></div>
                <NavHeader backurl={"/"} backquery={{pos: 1}} title={"游览路线"}/>
                <div className="main-no-bottom">
                    {routeHtml}
                </div>
            </div>
        );
    }
}

export default Route;
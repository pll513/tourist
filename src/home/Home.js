import React from 'react';
import NavBottom from '../components/nav-bottom/NavBottom';
import NavPages from '../components/nav-pages/NavPages';
import {BASE_URL} from '../config/network';
import {loadToken} from '../utils/utils';
import {Redirect} from 'react-router-dom';
import {Map, Marker, InfoWindow, NavigationControl} from 'react-bmap';
import './home.css';


class Home extends React.Component {
    constructor(props) {
        super(props);
        let pos;
        let {query} = this.props.location;
        if (query) pos = query.pos;
        if (pos !== 1 && pos !== 2) pos = 0;
        this.state = {
            navpos: pos,
            locations: [],
            counts: [],
            showCount: false,
            myLocation: {lng: 103.8823493651, lat: 33.2950658561},
            timer1: null,
            timer2: null,
            timer3: null,
            yourPosition: true,
            sightLocations: [],
            showContactInfo: false,
        };
        
    }
    
    componentDidMount() {
        this._getLocation(true);
        fetch(BASE_URL + '/location_num', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(loadToken() + ':unused'),
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                console.log(data);
                data = data || [];
                this.setState({
                    sightLocations: data,
                });
            })
        }).catch((err) => {
            console.log(err);
        });
        fetch(BASE_URL + '/location', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(loadToken() + ':unused'),
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                console.log(data);
                data = data || [];
                this.setState({
                    locations: data,
                });
            })
        }).catch((err) => {
            console.log(err);
        });
        let timer = setInterval(() => {
            // get positions
            fetch(BASE_URL + '/location', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(loadToken() + ':unused'),
                    'Accept': 'application/json'
                }
            }).then((res) => {
                return res.json().then((data) => {
                    console.log(data);
                    data = data || [];
                    this.setState({
                        locations: data,
                    });
                })
            }).catch((err) => {
                console.log(err);
            });
        }, 20000);
        
        let timer2 = setInterval(() => {
            this._getLocation(false);
        }, 20000);
        
        // 景点周围人数
        fetch(BASE_URL + '/count', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(loadToken() + ':unused'),
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                console.log(data);
                data = data || [];
                this.setState({
                    counts: data,
                });
            })
        }).catch((err) => {
            console.log(err);
        });
        
        let timer3 = setInterval(() => {
            fetch(BASE_URL + '/count', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(loadToken() + ':unused'),
                    'Accept': 'application/json'
                }
            }).then((res) => {
                return res.json().then((data) => {
                    console.log(data);
                    data = data || [];
                    this.setState({
                        counts: data,
                    });
                })
            }).catch((err) => {
                console.log(err);
            });
        }, 10000);
        
        this.setState({
            timer1: timer,
            timer2: timer2,
            timer3: timer3
        });
        
    }
    
    _toggleContactInfo(show) {
        this.setState({
            showContactInfo: show
        });
    }
    
    componentWillUnmount() {
        this.state.timer1 && clearInterval(this.state.timer1);
        this.state.timer2 && clearInterval(this.state.timer2);
        this.state.timer3 && clearInterval(this.state.timer3);
    }
    
    _getLocation(first) {
        let geolocation = new window.BMap.Geolocation();
        let that = this;
        geolocation.getCurrentPosition(function (r) {
            if (r.point) {
                let lng = r.point.lng;
                let lat = r.point.lat;
                console.log(lng + ',' + lat);
                that.setState({
                    myLocation: {lng: lng, lat: lat},
                    yourPosition: first
                });
                if (loadToken()) {
                    fetch(BASE_URL + '/location', {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Basic ' + window.btoa(loadToken() + ':unused'),
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({location: [lng, lat]})
                    }).then((res) => {
                        return res.json().then((data) => {
                            console.log(data);
                        })
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }
            else {
                console.log('failed to get address in page home');
            }
        }, {enableHighAccuracy: true})
    }
    
    render() {
        if (!loadToken()) {
            return <Redirect push to={{
                pathname: '/login',
                query: {from: '/'}
            }}/>;
        }
        return (
            <div id="home">
                <div className={this.state.showContactInfo ? "contact-mask" : "none contact-mask"} onClick={() => {
                    this._toggleContactInfo(false)
                }}>
                    <div className={"contact-info"} onclick={() => {
                    }}>
                        <div className={"contact-info__item"}>
                            <span>邮箱：</span>
                            <span>youxiang@qq.com</span>
                        </div>
                        <div className={"contact-info__item"}>
                            <span>电话：</span>
                            <a href={"tel:0837-7739753"}>0837-7739753</a>
                        </div>
                    </div>
                </div>
                <div className={"map-wrap"}>
                    <button className={"count-show"} onClick={() => {
                        this.setState({showCount: !this.state.showCount})
                    }}>人数分布
                    </button>
                    <div className={this.state.showCount ? "count-list-wrap" : "none count-list"}>
                        <div className={"count-list"}>
                            {this.state.counts.map((item) => {
                                return (
                                    <div className={"count-item"}>
                                        <span className={"count-item__name"}>{item.name + ': '}</span>
                                        <span className={"count-item__name"}>{item.count + '人'}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <Map style={{height: '100%'}} center={this.state.myLocation} zoom={11}>
                        {this.state.sightLocations.map((location, index) => {
                            return (
                                <Marker position={{lng: location.s_location[0], lat: location.s_location[1]}}>
                                    <div className={"sight-icon"}>
                                        <div className={"sight-icon__icon"}></div>
                                        <div className={"sight-icon__name"}>{location.name}</div>
                                    </div>
                                </Marker>
                            );
                        })}
                        {this.state.locations.map((location, index) => {
                            return (
                                <Marker position={{lng: location.location.lng, lat: location.location.lat}}
                                        key={location.phone}/>
                            );
                        })}
                        <NavigationControl/>
                        <Marker position={this.state.myLocation} icon={"loc_blue"}/>
                        
                        {this.state.yourPosition ? <InfoWindow position={this.state.myLocation} text="你的位置"/> : null}
                    </Map>
                </div>
                {/*<Link className="home-link problem" to={"#"}>常见问题</Link>*/}
                {/*<Link className="home-link contact" to={"#"}>联系我们</Link>*/}
                {/*<h2 className={"banner-title"}>阿坝州旅游</h2>*/}
                {/*<div className={"banner-intro"}>生态阿坝富饶神奇，立体气候明显，阿坝州旅游资源分布图地理环境独特。</div>*/}
                {/*<div className="slide-mask"></div>*/}
                {/*<Link to={"/pay"} className="btn-banner-ticket btn btn-success">点击购票</Link>*/}
                {/*<div className={"slider-wrap"}>*/}
                {/*<Slider speed={1000} delay={3000}>*/}
                {/*<div className="slider-item">*/}
                {/*<img className="slider-item__img" src={slider1} alt=""/>*/}
                {/*</div>*/}
                {/*<div className="slider-item">*/}
                {/*<img className="slider-item__img" src={slider2} alt=""/>*/}
                {/*</div>*/}
                {/*<div className="slider-item">*/}
                {/*<img className="slider-item__img" src={slider3} alt=""/>*/}
                {/*</div>*/}
                {/*<div className="slider-item">*/}
                {/*<img className="slider-item__img" src={slider4} alt=""/>*/}
                {/*</div>*/}
                {/*<div className="slider-item">*/}
                {/*<img className="slider-item__img" src={slider5} alt=""/>*/}
                {/*</div>*/}
                {/*</Slider>*/}
                {/*</div>*/}
                <NavPages pos={this.state.navpos} toggleContactInfo={(show) => this._toggleContactInfo(show)}/>
                <NavBottom pos={-1}/>
            </div>
        );
    }
}

export default Home;
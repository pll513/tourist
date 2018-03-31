import React from 'react';
import NavBottom from '../components/nav-bottom/NavBottom';
import NavPages from '../components/nav-pages/NavPages';
import {BASE_URL} from '../config/network';
import {loadToken} from '../utils/utils';
import {Link} from 'react-router-dom';
import slider1 from '../imgs/slider1.jpg';
import slider2 from '../imgs/slider2.jpg';
import slider3 from '../imgs/slider3.jpg';
import slider4 from '../imgs/slider4.jpg';
import slider5 from '../imgs/slider5.png';
import Slider from 'react-slider-light';
import {Map, Circle, Marker, InfoWindow, Polyline, NavigationControl} from 'react-bmap';
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
            myLocation: {lng: 103.8823493651, lat: 33.2950658561},
            timer1: null,
            timer2: null,
        };
        
    }
    
    componentDidMount() {
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
            console.log('获取坐标数组');
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
        
        let timer2 = setInterval(()=> {
            this._getLocation();
        }, 20000);
        
        this.setState({
            timer1: timer,
            timer2: timer2
        });
        
    }
    
    componentWillUnmount() {
        this.state.timer1 && clearInterval(this.state.timer1)
        this.state.timer2 && clearInterval(this.state.timer2)
    }
    
    _getLocation() {
        let options = {
            enableHighAccuracy: true, //boolean 是否要求高精度的地理信息，默认为false
            maximumAge: 1000 //应用程序的缓存时间
        };
        
        if (navigator.geolocation) {
            //浏览器支持geolocation
            navigator.geolocation.getCurrentPosition(this._onSuccess, this._onError, options);
            
        } else {
            //浏览器不支持geolocation
            console.log("浏览器不支持!");
        }
    }
    
    _onSuccess(position) {
        //经度
        let longitude = position.coords.longitude;
        //纬度
        let latitude = position.coords.latitude;
        
        console.log(longitude + ',' + latitude);
        this.setState({
            myLocation: {lng: longitude, lat: latitude},
        });
        fetch(BASE_URL + '/location', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + window.btoa(loadToken() + ':unused'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: JSON.stringify({location: {lng: longitude, lat: latitude}})
        }).then((res) => {
            return res.json().then((data) => {
                console.log(data);
            })
        }).catch((err) => {
            console.log(err);
        });
        
    }
    
    _onError(error) {
        switch (error.code) {
            // case error.PERMISSION_DENIED:
            //     alert("用户拒绝对获取地理位置的请求");
            //     break;
            //
            // case error.POSITION_UNAVAILABLE:
            //     alert("位置信息是不可用的");
            //     break;
            //
            // case error.TIMEOUT:
            //     alert("请求用户地理位置超时");
            //     break;
            //
            // case error.UNKNOWN_ERROR:
            //     alert("未知错误");
            //     break;
        }
    }
    
    render() {
        return (
            <div id="home">
                <div className={"map-wrap"}>
                    <Map style={{height: '100%'}} center={this.state.myLocation} zoom={11}>
                        {this.state.locations.map((location, index) => {
                            return (
                                <Marker position={{lng: location.location.lng, lat: location.location.lat}}
                                        key={location.phone}/>
                            );
                        })}
                        <NavigationControl/>
                        <Marker position={this.state.myLocation} icon={"loc_blue"}/>
                        <InfoWindow position={this.state.myLocation} text="你的位置"/>
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
                <NavPages pos={this.state.navpos}/>
                <NavBottom pos={-1}/>
            </div>
        );
    }
}

export default Home;
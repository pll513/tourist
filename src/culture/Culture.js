import React from 'react';
import NavHeader from '../components/nav-header/NavHeader';
import NavBar from '../components/nav-bar/NavBar';
import NavBottom from '../components/nav-bottom/NavBottom';
import {Link} from 'react-router-dom';
import {BASE_URL} from '../config/network';
import './culture.css';

import slide1 from '../imgs/slider1.jpg';
import slide2 from '../imgs/slider2.jpg';


class Culture extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            pos: 0,
            dataList1: [],
            dataList2: [],
            dataList3: [],
            dataLoaded: false,
        };
    }
    
    componentDidMount() {
        fetch(BASE_URL + '/folkways', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                console.log(data);
                this.setState({
                    dataLoaded: true,
                    dataList1: data,
                });
            })
        }).catch((err) => {
            console.log(err);
            this.setState({
                dataLoaded: true,
                dataList1: [],
            });
        });
    }
    
    _updatePosition(newPos) {
        if (newPos === this.state.pos) return;
        this.setState({
            pos: newPos,
            dataLoaded: false,
            dataList1: [],
            dataList2: [],
            dataList3: [],
        });
        if (newPos === 0) {
            fetch(BASE_URL + '/folkways', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }).then((res) => {
                return res.json().then((data) => {
                    console.log(data);
                    this.setState({
                        dataLoaded: true,
                        dataList1: data,
                    });
                })
            }).catch((err) => {
                console.log(err);
                this.setState({
                    dataLoaded: true,
                    dataList1: [],
                });
            });
        } else if (newPos === 1) {
            fetch(BASE_URL + '/tibet', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }).then((res) => {
                return res.json().then((data) => {
                    console.log(data);
                    this.setState({
                        dataLoaded: true,
                        dataList2: data,
                    });
                })
            }).catch((err) => {
                console.log(err);
                this.setState({
                    dataLoaded: true,
                    dataList2: [],
                });
            });
        } else if (newPos === 2) {
            fetch(BASE_URL + '/red_classics', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }).then((res) => {
                return res.json().then((data) => {
                    console.log(data);
                    this.setState({
                        dataLoaded: true,
                        dataList3: data,
                    });
                })
            }).catch((err) => {
                console.log(err);
                this.setState({
                    dataLoaded: true,
                    dataList3: [],
                });
            });
        }
        
    }
    
    render() {
        let {pos, dataLoaded, dataList1, dataList2, dataList3} = this.state;
        let dataHtml = [];
        if (dataLoaded) {
            let dataList;
            if (pos === 0) {
                dataList = dataList1;
            } else if (pos === 1) {
                dataList = dataList2;
            } else {
                dataList = dataList3;
            }
            dataHtml = dataList.map((data) => {
                return (
                    <Link className="culture-item" to={{pathname: '/culture/detail', query: {culture_id: data._id}}}>
                        <div className="culture-item__img-list">
                            {data.photos.map((img, index) => {
                                return (
                                    <div key={index} className="culture-item__img-wrap">
                                        <img className="culture-item__img" src={img} alt=""/>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="culture-item__title">{data.name}</div>
                        <div className="culture-item__info">
                            <span className="culture-item__type">{data.type}</span>
                            <span className="culture-item__time">{data.date}</span>
                            <span className="culture-item__read">{data.readtimes}人看过</span>
                        </div>
                    </Link>
                );
            })
            
        } else {
            dataHtml = null;
        }
        return (
            <div id="culture">
                <NavHeader backurl={"/"} title={"文化"}/>
                <div className="main">
                    <NavBar txts={['特色民俗', '特色藏风', '红色经典']} pos={pos}
                            updatePosition={(newPos) => this._updatePosition(newPos)}/>
                    <div className="culture-list clearfix">
                        {dataHtml}
                    </div>
                </div>
                <NavBottom pos={1}/>
            </div>
        );
    }
}

export default Culture;
import React from 'react';
import NavBottom from '../components/nav-bottom/NavBottom';
import NavPages from '../components/nav-pages/NavPages';
import {Link} from 'react-router-dom';
import slider1 from '../imgs/slider1.jpg';
import slider2 from '../imgs/slider2.jpg';
import slider3 from '../imgs/slider3.jpg';
import slider4 from '../imgs/slider4.jpg';
import slider5 from '../imgs/slider5.png';
import Slider from 'react-slider-light';
import './home.css';


class Home extends React.Component {
    constructor(props) {
        super(props);
        let pos;
        let {query} = this.props.location;
        if (query) pos = query.pos;
        if (pos !== 1 && pos !== 2) pos = 0;
        this.state = {
            navpos: pos
        };
        
    }
    
    componentDidMount() {

    }
    
    render() {
        return (
            <div id="home">
                <Link className="home-link problem" to={"#"}>常见问题</Link>
                <Link className="home-link contact" to={"#"}>联系我们</Link>
                <div className={"slider-wrap"}>
                    <Slider speed={1000} delay={3000}>
                        <div className="slider-item">
                            <img className="slider-item__img" src={slider1} alt=""/>
                        </div>
                        <div className="slider-item">
                            <img className="slider-item__img" src={slider2} alt=""/>
                        </div>
                        <div className="slider-item">
                            <img className="slider-item__img" src={slider3} alt=""/>
                        </div>
                        <div className="slider-item">
                            <img className="slider-item__img" src={slider4} alt=""/>
                        </div>
                        <div className="slider-item">
                            <img className="slider-item__img" src={slider5} alt=""/>
                        </div>
                    </Slider>
                </div>
                <NavPages pos={this.state.navpos}/>
                <NavBottom pos={-1}/>
            </div>
        );
    }
}

export default Home;
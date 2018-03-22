import React from 'react';
import './nav-bottom.css';
import { Redirect, Link } from 'react-router-dom';
// import calendar from '../../imgs/calendar.png';
// import map from '../../imgs/map.png';
// import me from '../../imgs/me.png';

class NavBottom extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        let {props} = this;
        let {pos} = props;
        return (
            <div className="nav-bottom">
                <Link to="/blog" className={pos === 0 ? "nav-bottom__nav-item active" : "nav-bottom__nav-item"}>
                    <i className="nav-bottom__nav-item_img iconfont icon-viewgallery"/>
                    <div className="nav-bottom__nav-item_txt">发现</div>
                </Link>
                <Link to="/culture" className={pos === 1 ? "nav-bottom__nav-item active" : "nav-bottom__nav-item"}>
                    <i className="nav-bottom__nav-item_img iconfont icon-pic"/>
                    <div className="nav-bottom__nav-item_txt">文化</div>
                </Link>
                <Link to="/me" className={pos === 2 ? "nav-bottom__nav-item active" : "nav-bottom__nav-item"}>
                    <i className="nav-bottom__nav-item_img iconfont icon-account"/>
                    <div className="nav-bottom__nav-item_txt">我的</div>
                </Link>
            </div>
        );
    }
}

export default NavBottom;
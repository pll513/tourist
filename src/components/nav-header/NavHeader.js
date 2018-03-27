import React from 'react';
import './nav-header.css';
import {Link} from 'react-router-dom';

class NavHeader extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        let {props} = this;
        let {backurl, backquery, title} = props;
        
        return (
            <div className="nav-header">
                <Link className="nav-header__back" to={{pathname: backurl, query: backquery}}>
                    <i className="iconfont icon-back"/>
                </Link>
                <div className="nav-header__title">
                    {title}
                </div>
                {this.props.children}
            </div>
        );
    }
    
}

export default NavHeader;
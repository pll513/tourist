import React from 'react';
import './nav-bar.css';

class NavBar extends React.Component {
    
    constructor(props) {
        super(props);
        // this.state = {
        //     pos: 0,
        // };
    }
    
    render() {
        let {props, state} = this;
        let {txts, pos} = props;
        return (
            <div className="nav-bar">
                {
                    txts.map((txt, index) => {
                        return (
                            <div className={pos === index ? "nav-bar__nav-item active" : "nav-bar__nav-item"}
                                 key={index}
                                 onClick={() => {
                                     // this.setState({
                                     //     pos: index
                                     // });
                                     props.updatePosition(index)
                                 }}>
                                <span className="nav-bar__nav-item_txt">{txt}</span>
                            </div>
                        );
                    })
                }
            
            </div>
        );
    }
}

export default NavBar;
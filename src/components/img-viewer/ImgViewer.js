import React from 'react';
import './img-viewer.css';
import slider1 from '../../imgs/slider1.jpg';

class ImgViewer extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className={this.props.show ? "img-viewer" : "img-viewer none"} onClick={() => {
                this.props.hideImgViewer();
            }}>
                <img className="img-viewer__img" src={this.props.imgUrl || slider1} alt=""/>
            </div>
        );
    }
}

export default ImgViewer;
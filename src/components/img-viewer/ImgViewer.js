import React from 'react';
import './img-viewer.css';

class ImgViewer extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className={this.props.show ? "img-viewer" : "img-viewer none"} onClick={() => {
                this.props.hideImgViewer();
            }}>
                <img className="img-viewer__img" src={this.props.imgUrl} alt=""/>
            </div>
        );
    }
}

export default ImgViewer;
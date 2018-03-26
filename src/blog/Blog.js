import React from 'react';
import NavHeader from '../components/nav-header/NavHeader';
import ImgViewer from '../components/img-viewer/ImgViewer';
import NavBottom from '../components/nav-bottom/NavBottom';
import 'whatwg-fetch';
import {BASE_URL} from '../config/network';
import "./blog.css";
import {Link, Redirect} from 'react-router-dom';
import {loadToken, isValidPassword} from '../utils/utils';
import img1 from "../imgs/slider1.jpg";
import img2 from "../imgs/slider2.jpg";


class Blog extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            postsLoaded: false,
            posts: [],
            showImgViewer: false,
            imgUrl: '',
            showPhotoForm: false,
            formImgs: [],
            address: '',
        };
    }
    
    componentDidMount() {
        fetch(BASE_URL + '/find', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                console.log(data);
                this.setState({
                    postsLoaded: true,
                    posts: data
                });
            })
        });
    }

    _getLocation() {
        let options={
            enableHighAccuracy:true, //boolean 是否要求高精度的地理信息，默认为false
            maximumAge:1000 //应用程序的缓存时间
        };

        if(navigator.geolocation){
            //浏览器支持geolocation
            navigator.geolocation.getCurrentPosition(this._onSuccess,this._onError,options);

        }else{
            //浏览器不支持geolocation
            console.log("浏览器不支持!");
        }
    }

    _onSuccess(position){
        let BMap = window.BMap;
        //返回用户位置
        //经度
        let longitude =position.coords.longitude;
        //纬度
        let latitude = position.coords.latitude;

        alert(longitude + ' ' + latitude);
        console.log(longitude + ' ' + latitude);

        let geoc = new BMap.Geocoder();
        geoc.getLocation(new BMap.Point(longitude, latitude), function (rs) {
            console.log(rs);
            console.log(rs.address);
        });
    }

    _onError(error){
        switch(error.code){
            case error.PERMISSION_DENIED:
                alert("用户拒绝对获取地理位置的请求");
                break;

            case error.POSITION_UNAVAILABLE:
                alert("位置信息是不可用的");
                break;

            case error.TIMEOUT:
                alert("请求用户地理位置超时");
                break;

            case error.UNKNOWN_ERROR:
                alert("未知错误");
                break;
        }
    }
    
    _handleCameraClick() {
        let BMap = window.BMap;
        if (!this.state.showPhotoForm) {
            // 如果刚刚展开
            let geoc = new BMap.Geocoder();
            geoc.getLocation(new BMap.Point(116.322987, 39.983424), (rs) => {
                console.log(rs.address);
                this.setState({
                    address: rs.address
                });
            });
        }
        this.setState({
            showPhotoForm: !this.state.showPhotoForm
        });

    }
    
    _hideImgViewer() {
        this.setState({
            showImgViewer: false
        });
    }
    
    _handleLike(blogId) {
        fetch(BASE_URL + '/sight', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                console.log(data);
                this.setState({
                    sightLoaded: true,
                    sight: data
                });
            })
        });
    }
    
    _handlePhotoFormSubmit() {
    
    }
    
    _handlePhoneFormCancel() {
        this.setState({
            showPhotoForm: false
        });
    }
    
    render() {
        // if (!loadToken()) {
        //     return <Redirect push to={{
        //         pathname: '/login',
        //         query: {from: '/blog'}
        //     }}/>;
        // }
        let {showImgViewer, imgUrl, showPhotoForm, postsLoaded, posts, formImgs} = this.state;
        return (
            <div id="blog">
                <NavHeader backurl={"/"} title={"发现"}/>
                <i className="iconfont icon-camera"
                   style={{zIndex: 9, position: 'fixed', right: '20px', top: '28px', color: '#444'}} onClick={() => {
                       this._handleCameraClick();
                }}/>
                <div className={showPhotoForm ? "photo-form" : "none photo-form"}>
                    <textarea type="text" className="photo-form-input" placeholder="请输入..."/>
                    <div className="phone-form__img-list clearfix">
                        {formImgs.map((img)=> {
                            return (
                                <div className="phone-form__img-wrap">
                                    <img className="phone-form__img" src={img} alt=""/>
                                </div>
                            );
                        })}
                        <label className="btn-add-img" htmlFor={"img-upload"}>
                            <i className="iconfont icon-add"/>
                        </label>
                        <input style={{display: 'none'}} id="img-upload" type="file" multiple="multiple" accept="image/*" onChange={(event)=> {
                            // upload photos
                            let files = event.target.files;
                            if (!files || files.length === 0) {
                                return;
                            }
                            let formData = new FormData();
                            formData.append('photos', files);
                            console.log(formData);
                            fetch(BASE_URL + '/uploads', {
                                method: 'POST',
                                headers: {
                                    'Authorization': 'Basic ' + window.btoa('18428359569:224930')
                                },
                                body: formData
                            }).then((data) => {
                                console.log(data);
                                let formImgs = JSON.parse(data);
                                this.setState({
                                    formImgs: formImgs
                                });
        
                            })
                            
                        }}/>
                    </div>
                    <div className={"photo-form__location"}>
                        <span className={"photo-form__location-title"}>地理位置</span>
                        <span className={"photo-form__location-value"}>{this.state.address}</span>
                    </div>
                    <div className="btn-wrap clearfix">
                        <input type="button" value="发表" className="btn-submit"/>
                        <input type="button" value="取消" className="btn-cancel" onClick={()=> {
                            this._handlePhoneFormCancel();
                        }}/>
                    </div>
                </div>
                <div className="main">
                    <div className={showPhotoForm ? "photo-form-bg" : "none photo-form-bg"}></div>
                    <div className="blog-list">
                        {posts.map((post, index) => {
                            return (
                                <div className="blog-item" key={index}>
                                    <div className="blog-item__user">啦啦啦</div>
                                    <div className="blog-item__content">{post.content}</div>
                                    <div className="blog-item__imgs">
                                        {post.photos.map((photo, index) => {
                                            return (
                                                <div className="blog-item__img-wrap" key={index} onClick={() => {
                                                    this.setState({
                                                        showImgViewer: true,
                                                        imgUrl: photo
                                                    });
                                                }}>
                                                    <img className="blog-item__img" src={photo}/>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="blog-item__info">
                                        <div className="blog-item__time">{post.time}</div>
                                        <div className="blog-item__like" onClick={(event) => {
                                            console.log(event.target);
                                        }}>
                                            <i className="iconfont icon-favorites"/>
                                            <span className="blog-item__like-count">{post.likes}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <ImgViewer imgUrl={imgUrl} show={showImgViewer} hideImgViewer={() => {
                    this._hideImgViewer()
                }}/>
                <NavBottom pos={0}/>
            </div>
        );
    }
}

export default Blog;